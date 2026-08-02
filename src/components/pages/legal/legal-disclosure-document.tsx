import { SITE_NAME } from "#/constants/site";
import { LegalTable } from "./legal-table";

type DisclosureDocumentProps = {
	representativeName: string;
	phoneNumber: string;
	/** 提供日。受領時点を記録として残すために本文へ入れる。 */
	providedAt: string;
};

/**
 * 請求に応じて提供する電磁的記録の中身。
 *
 * 法11条ただし書の「これらの事項」は同条各号の全体を指すため、
 * 省略した事項だけでなく広告表示事項の一式を載せる。
 *
 * 規則25条4項1号が「顧客がファイルへの記録を出力することによる書面を
 * 作成することができるものであること」を求めるので、印刷できる形にする。
 * 外部リソースに依存すると保存後に体裁が崩れるため、CSSはインラインで持つ。
 */
export function LegalDisclosureDocument({
	representativeName,
	phoneNumber,
	providedAt,
}: DisclosureDocumentProps) {
	return (
		<html lang="ja">
			<head>
				<meta charset="utf-8" />
				<title>特定商取引法に基づく表記（全文） | {SITE_NAME}</title>
				{/* 保存後も体裁を保つため、外部CSSに依存せずインラインで持つ */}
				<style
					dangerouslySetInnerHTML={{
						__html: `
body { font-family: system-ui, sans-serif; line-height: 1.8; max-width: 48rem; margin: 2rem auto; padding: 0 1rem; color: #111; }
table { border-collapse: collapse; width: 100%; margin: 1.5rem 0; }
th, td { border: 1px solid #999; padding: 0.6rem 0.8rem; text-align: left; vertical-align: top; }
th { width: 12rem; background: #f2f2f2; font-weight: 600; }
footer { margin-top: 2rem; font-size: 0.875rem; color: #555; }
@media print { body { margin: 0; } }
`,
					}}
				/>
			</head>
			<body>
				<h1>特定商取引法に基づく表記（全文）</h1>
				<p>
					{SITE_NAME}
					のウェブサイト上では一部の事項の表示を省略しています。
					ご請求をいただいたため、特定商取引法第11条各号に掲げる事項の全文を提供します。
				</p>
				<LegalTable disclosed={{ representativeName, phoneNumber }} />
				<footer>提供日: {providedAt}</footer>
			</body>
		</html>
	);
}
