// see: https://developers.cloudflare.com/turnstile/

import z from "zod";
import { cn } from "#/lib/utils";

const verifyResponseSchema = z.object({
	success: z.boolean(),
	challenge_ts: z.iso.datetime().optional(),
	hostname: z.hostname().optional(),
	"error-codes": z.array(z.string()).optional(),
	action: z.string().optional(),
	cdata: z.string().optional(),
	metadata: z
		.object({
			ephemeral_id: z.string().optional(),
			result_with_testing_key: z.boolean().optional(),
		})
		.optional(),
});

type Params = {
	secretKey: string;
	token: string;
	remoteIp?: string;
	expectedAction: string;
	expectedHostname: string;
	idempotencyKey?: string;
};

/**
 * Turnstile のトークンをサーバー側で検証する。
 */
async function validateTurnstile({
	secretKey,
	token,
	remoteIp,
	expectedAction,
	expectedHostname,
	idempotencyKey,
}: Params): Promise<boolean> {
	if (!token) return false;

	try {
		const response = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					secret: secretKey,
					response: token,
					remoteip: remoteIp,
					idempotency_key: idempotencyKey,
				}),
			},
		);
		if (!response.ok) return false;

		const json = await response.json();

		const result = verifyResponseSchema.safeParse(json);
		if (!result.success) {
			console.error({
				error: result.error,
				message: "validateTurnstile response parse error",
			});
			return false;
		}

		// 本番環境以外ではaction,hostnameの検証をスキップ
		if (!import.meta.env.PROD) return true;

		if (result.data.action !== expectedAction) {
			console.warn({ message: "validateTurnstile action not match" });
			return false;
		}
		if (result.data.hostname !== expectedHostname) {
			console.warn({ message: "validateTurnstile hostname not match" });
			return false;
		}

		// Check token age (warn if older than 4 minutes)
		if (result.data.challenge_ts) {
			const challengeTime = new Date(result.data.challenge_ts).getTime();
			const now = Date.now();
			const ageMinutes = (now - challengeTime) / (1000 * 60);

			if (ageMinutes > 4) {
				console.warn({
					message: `Token is ${ageMinutes.toFixed(1)} minutes old`,
				});
			}
		}

		return true;
	} catch (error) {
		console.error({ error, message: "validateTurnstile unknown error" });
		return false;
	}
}

type ParamsWithRetry = Params & {
	maxRetries?: number;
};

export async function validateTurnstileWithRetry({
	maxRetries = 3,
	...params
}: ParamsWithRetry) {
	const idempotencyKey = crypto.randomUUID();

	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		const isValid = await validateTurnstile({ ...params, idempotencyKey });
		if (isValid) return true;

		// If this is the last attempt, return the error
		if (attempt === maxRetries) {
			return isValid;
		}

		// Wait before retrying (exponential backoff)
		await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 1000));
	}
}

type Props = {
	siteKey: string;
	action: string;
	class?: string;
};

export function Turnstile({ siteKey, action, class: className }: Props) {
	return (
		<>
			<div
				data-sitekey={siteKey}
				data-action={action}
				class={cn("cf-turnstile", className)}
				data-theme="dark"
			/>
			{/* 置いたページでしか使わないので、Layout の head ではなくここで読み込む */}
			<script
				async
				defer
				src="https://challenges.cloudflare.com/turnstile/v0/api.js"
			/>
		</>
	);
}
