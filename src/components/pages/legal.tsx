import { Layout } from "#/components/pages/layout";
import {
	CONTACT_PAGE,
	LEGAL_PAGE,
	PRIVACY_PAGE,
	TERMS_PAGE,
} from "#/constants/pages";
import {
	COMPANY_ADDRESS,
	COMPANY_NAME,
	COMPANY_POSTAL_CODE,
} from "#/constants/site";

/**
 * 電話番号と運営統括責任者名は、特定商取引法11条ただし書により表示を省略している。
 * 消費者庁「特定商取引法ガイド」の省略可否一覧で、いずれも価格の表示状況に
 * かかわらず「省略できる」とされている事項。
 * https://www.no-trouble.caa.go.jp/what/mailorder/
 *
 * 省略が適法になる条件は2つあり、どちらも満たす必要がある。
 *
 * 1. 請求により広告表示事項を遅滞なく提供する旨を、この表記に明示すること
 *    （欄を削除・空欄にするだけでは要件を満たさない）
 * 2. 実際に請求があったとき「遅滞なく」提供できる措置を講じていること
 *
 * 同ガイドは、この「遅滞なく」を「申込みの意思決定に先立って十分な時間的
 * 余裕をもって提供されること」と定義する。即決で購入されるデジタルコンテンツ
 * では、有人対応の「3営業日以内」では足りない。
 *
 * TODO: 有料コンテンツの公開前に、お問い合わせフォームからの自動返信
 * （省略した事項を含む広告表示事項の一式を記載したもの）を実装すること。
 * 自動返信が動くまで 2. を満たさないため、省略は適法にならない。
 *
 * なお同一覧で「省略できない」とされている事項は、この表から外さないこと。
 * 該当するのは 動作環境 / 返品に関する事項 / 販売数量の制限等、および
 * 月額制で必要になる「契約を2回以上継続して締結する場合の販売条件」。
 */

export function Legal() {
	return (
		<Layout
			title={LEGAL_PAGE.title}
			description={LEGAL_PAGE.description}
			path={LEGAL_PAGE.path}
		>
			<article class="prose prose-slate prose-invert max-w-none py-8 prose-a:text-blue-300 lg:py-12">
				<h1>特定商取引法に基づく表記</h1>
				<p>
					当社が提供する有料コンテンツの販売について、
					特定商取引法第11条に基づき、以下のとおり表示します。
				</p>
				<p>
					本表記において表示を省略した事項については、
					<a href={CONTACT_PAGE.path}>お問い合わせフォーム</a>
					よりご請求いただければ、遅滞なく電子メールにて提供します。
				</p>

				<div class="overflow-x-auto">
					<table>
						<tbody>
							<tr>
								<th scope="row">販売事業者名</th>
								<td>{COMPANY_NAME}</td>
							</tr>
							<tr>
								<th scope="row">運営統括責任者</th>
								<td>
									<a href={CONTACT_PAGE.path}>お問い合わせフォーム</a>
									よりご請求いただければ、遅滞なく開示します。
								</td>
							</tr>
							<tr>
								<th scope="row">所在地</th>
								<td>
									〒{COMPANY_POSTAL_CODE}
									<br />
									{COMPANY_ADDRESS}
								</td>
							</tr>
							<tr>
								<th scope="row">電話番号</th>
								<td>
									<a href={CONTACT_PAGE.path}>お問い合わせフォーム</a>
									よりご請求いただければ、遅滞なく開示します。
								</td>
							</tr>
							<tr>
								<th scope="row">お問い合わせ</th>
								<td>
									<a href={CONTACT_PAGE.path}>お問い合わせフォーム</a>
									よりご連絡ください。通常3営業日以内に返信します。
								</td>
							</tr>
							<tr>
								<th scope="row">販売価格</th>
								<td>
									各コンテンツの購入画面に表示します。表示価格はすべて消費税込みです。
									<br />
									有料コンテンツには、一度のお支払いで継続してご利用いただける買い切り型と、
									月額制のものがあります。いずれであるかは購入画面に表示します。
								</td>
							</tr>
							<tr>
								<th scope="row">商品代金以外の必要料金</th>
								<td>
									当サイトの閲覧、コンテンツのダウンロードおよび購入手続きに必要な
									インターネット接続料金、通信料金はお客様のご負担となります。
								</td>
							</tr>
							<tr>
								<th scope="row">支払方法</th>
								<td>
									クレジットカード決済（Stripe, Inc.
									の決済サービスを利用します）
								</td>
							</tr>
							<tr>
								<th scope="row">支払時期</th>
								<td>
									購入手続きの完了時にお支払いが確定します。
									実際の請求時期はご利用のクレジットカード会社の規定によります。
								</td>
							</tr>
							<tr>
								<th scope="row">商品の引渡時期</th>
								<td>決済の完了後、直ちにご利用いただけます。</td>
							</tr>
							<tr>
								<th scope="row">契約期間および自動更新（月額制の場合）</th>
								<td>
									契約期間は1か月単位です。
									解約の手続きをされない限り、期間の満了日に自動的に更新され、
									同額が継続して課金されます。
								</td>
							</tr>
							<tr>
								<th scope="row">解約の方法（月額制の場合）</th>
								<td>
									アカウント設定画面より、いつでも次回以降の更新を停止できます。
									解約の手続きをされた場合も、
									既にお支払いいただいた期間の満了日まではご利用いただけます。
									期間の途中で解約された場合の日割りによる返金は行いません。
								</td>
							</tr>
							<tr>
								<th scope="row">返品・交換・キャンセル</th>
								<td>
									デジタルコンテンツという商品の性質上、
									購入手続きの完了後の返品、交換または返金には応じられません。
									<br />
									ただし、当社の責めに帰すべき事由によりコンテンツが提供されなかった場合、
									および法令によりこれと異なる取り扱いが求められる場合は、この限りではありません。
									この場合は
									<a href={CONTACT_PAGE.path}>お問い合わせフォーム</a>
									よりご連絡ください。
								</td>
							</tr>
							<tr>
								<th scope="row">動作環境</th>
								<td>
									Google Chrome、Safari、Microsoft
									Edge、Firefoxの最新版での動作を想定しています。
									コンテンツごとに個別の動作環境がある場合は、購入画面に表示します。
								</td>
							</tr>
							<tr>
								<th scope="row">販売数量の制限等</th>
								<td>
									コンテンツごとに購入数量や購入条件を定める場合があります。
									その場合は購入画面に表示します。
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<p>
					本表記に定めのない事項については、
					<a href={TERMS_PAGE.path}>利用規約</a>および
					<a href={PRIVACY_PAGE.path}>プライバシーポリシー</a>によります。
				</p>

				<p>最終更新日: 2026年7月30日</p>
			</article>
		</Layout>
	);
}
