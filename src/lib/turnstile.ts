const SITEVERIFY_URL =
	"https://challenges.cloudflare.com/turnstile/v0/siteverify";

type SiteverifyResponse = {
	success: boolean;
	action?: string;
	"error-codes"?: string[];
	metadata?: {
		/** Cloudflare のテスト用シークレットで検証したときだけ true になる。 */
		result_with_testing_key?: boolean;
	};
};

type VerifyParams = {
	secretKey: string;
	token: string;
	/** クライアント側の data-action と一致することを確認する。 */
	expectedAction: string;
	remoteIp?: string;
};

/**
 * Turnstile のトークンをサーバー側で検証する。
 *
 * action を突き合わせているのは、サイト内の別のフォームで取得したトークンを
 * 使い回されるのを防ぐため。ウィジェットはサイト単位で1つのため、
 * この検証がないとフォーム間でトークンが流用できてしまう。
 *
 * トークンは発行から300秒で失効し、一度検証すると再利用できない
 * （再利用時は timeout-or-duplicate エラーになる）。
 */
export async function verifyTurnstile({
	secretKey,
	token,
	expectedAction,
	remoteIp,
}: VerifyParams): Promise<boolean> {
	if (!token) return false;

	const body = new URLSearchParams({ secret: secretKey, response: token });
	if (remoteIp) body.set("remoteip", remoteIp);

	try {
		const response = await fetch(SITEVERIFY_URL, { method: "POST", body });
		if (!response.ok) return false;

		const result = (await response.json()) as SiteverifyResponse;
		if (!result.success) return false;

		/**
		 * テスト用シークレットで検証した場合、レスポンスに action が含まれないため
		 * 突き合わせを飛ばす。このフラグはテスト用シークレットを使ったときにしか
		 * 立たず、本番のシークレットで true になることはないので、
		 * 本番の action 検証が骨抜きになる心配はない。
		 */
		if (result.metadata?.result_with_testing_key) return true;

		return result.action === expectedAction;
	} catch {
		// 検証できなかった場合は通さない。
		return false;
	}
}
