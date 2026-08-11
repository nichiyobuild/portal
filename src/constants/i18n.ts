/**
 * サポートする言語。増やすときはここに追記するだけで、
 * languageDetector の設定とルーティングの :lang{...} 制約の両方に反映される。
 *
 * 対応言語は日本語・英語の2つに留める。
 * 値は LANG_PATH_PATTERN で正規表現に埋め込まれるため、
 * 言語コードは英小文字とハイフンのみとする（例: ja, en, zh-hans）。
 */
export const SUPPORTED_LANGUAGES = ["ja"] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = "ja";

/**
 * ルーティングの `:lang{...}` 制約に埋め込む選択肢。Hono がこれを
 * 正規表現としてコンパイルするため、SUPPORTED_LANGUAGES の値には
 * 正規表現のメタ文字を含めないこと（上のコメント参照）。
 *
 * これがないと `:lang` は任意の文字列にマッチし、`/en/privacy` や
 * `/wp-admin/privacy` のような未対応の言語プレフィックスも
 * 日本語ページをそのまま 200 で返してしまう。
 */
export const LANG_PATH_PATTERN = SUPPORTED_LANGUAGES.join("|");
