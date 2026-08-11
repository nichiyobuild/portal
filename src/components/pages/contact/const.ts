/**
 * お問い合わせの種類。
 *
 * フォームの選択肢・受信時のバリデーション・通知メールの件名で共有する。
 * 値を足すとラベル側が型エラーになるので、対応漏れが起きない。
 */
export const CONTACT_CATEGORY_VALUES = [
	"bug",
	"feedback",
	"payment",
	"account",
	"disclosure",
	"complaint",
	"business",
	"other",
] as const;

export type ContactCategory = (typeof CONTACT_CATEGORY_VALUES)[number];

export const CONTACT_CATEGORY_LABELS: Record<ContactCategory, string> = {
	bug: "ゲームの不具合について",
	feedback: "ゲームへのご意見・ご要望",
	payment: "有料コンテンツ・お支払いについて",
	account: "アカウントについて",
	disclosure: "個人情報の開示等のご請求",
	complaint: "個人情報の取り扱いに関する苦情",
	business: "取材・お仕事のご依頼",
	other: "その他",
};

/** 送信に失敗したときにフォームへ戻す入力値。 */
export type ContactFormValues = {
	category: string;
	name: string;
	email: string;
	message: string;
	agree: boolean;
};

/**
 * 項目ごとのエラーメッセージ。
 * form はどの項目にも紐づかないエラー（認証失敗・送信障害など）に使う。
 */
export type ContactFormErrors = {
	[K in keyof ContactFormValues]?: string;
} & { form?: string };
