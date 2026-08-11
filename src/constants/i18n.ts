/**
 * サポートする言語。増やすときはここに追記するだけで、
 * languageDetector の設定とルーティングの :lang{...} 制約の両方に反映される。
 *
 * 対応言語を増やす際は #12（言語）の設計どおり日本語・英語の2つに留める。
 */
export const SUPPORTED_LANGUAGES = ["ja"] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = "ja";

/**
 * ルーティングの `:lang{...}` 制約に使う正規表現の中身。
 * これがないと `:lang` は任意の文字列にマッチし、`/en/privacy` や
 * `/wp-admin/privacy` のような未対応の言語プレフィックスも
 * 日本語ページをそのまま 200 で返してしまう。
 */
export const LANG_PATH_PATTERN = SUPPORTED_LANGUAGES.join("|");
