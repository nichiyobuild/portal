import { Layout } from "#/components/pages/layout";
import { games } from "#/constants/games";
import {
	ABOUT_PAGE,
	CONTACT_PAGE,
	HOME_PAGE,
	PRIVACY_PAGE,
	TERMS_PAGE,
} from "#/constants/pages";
import {
	COMPANY_ADDRESS,
	COMPANY_NAME,
	COMPANY_POSTAL_CODE,
	SITE_DOMAIN,
	SITE_NAME,
} from "#/constants/site";

export function About() {
	return (
		<Layout metadata={ABOUT_PAGE}>
			<article class="prose prose-slate prose-invert max-w-none py-8 prose-a:text-blue-300 lg:py-12">
				<h1>このサイトについて</h1>
				<p>
					{SITE_DOMAIN}
					は、ブラウザですぐに遊べるゲームを公開しているサイトです。
					アプリのインストールや専用の環境は必要ありません。
				</p>

				<h2>公開しているゲーム</h2>

				<ul>
					{games.slice(0, 3).map((game) => (
						<li>
							<a href={game.url}>{game.title}</a> : {game.description}
						</li>
					))}
				</ul>
				<p>
					新しいゲームは、完成したものから順に追加していきます。
					公開中のゲームは<a href={HOME_PAGE.path}>トップページ</a>
					から一覧できます。
				</p>

				<h2>動作環境</h2>
				<p>
					PC、スマートフォンのどちらでも遊べます。 Google
					Chrome、Safari、Microsoft
					Edge、Firefoxの最新版での動作を想定しています。
				</p>
				<p>
					ゲームによっては画面の広さや端末の性能によって遊びにくい場合があります。
					その場合はゲームごとのページに推奨環境を記載しています。
				</p>

				<h2>料金とアカウント</h2>
				<p>
					公開しているゲームは、すべて無料で遊べます。
					利用料や有料のアイテムはありません。運営費用は広告でまかなっています。
				</p>
				<p>
					アカウントの登録も必要ありません。ページを開けば、そのまま遊べます。
					この場合、プレイ状況はお使いの端末の中に保存されるため、
					ブラウザの設定や端末の変更によって失われることがあります。
				</p>
				<p>
					プレイ状況を別の端末に引き継ぎたい場合は、Googleアカウントでログインできます。
					ログインは任意で、料金はかかりません。
					このときお預かりする情報の取り扱いについては
					<a href={PRIVACY_PAGE.path}>プライバシーポリシー</a>をご覧ください。
				</p>

				<h2>運営の目的</h2>
				<p>
					当サイトは、個人で開発したブラウザゲームを実際に遊べる形で公開する場として運営しています。
				</p>
				<p>
					企画、技術選定、実装でつまずいた点、公開後の改善、そして収益化のための手続きまで——
					ゲームが完成し、運営として成り立つまでの過程は、YouTubeとXで発信しています。
					うまくいったことも失敗も含めて残していく方針です。
				</p>
				<p>
					「作れるようにはなったが、そこから先がわからない」——
					ソフトウェア開発を学ぶ方がぶつかりやすいこの段階に、実例として役立つ情報を提供することを目指しています。
				</p>

				<h2>対象ユーザー・対象年齢</h2>
				<p>
					当サイトは13歳以上の方を対象としています。13歳未満の方はご利用いただけません。
					未成年の方は、保護者の同意を得たうえでご利用ください。
				</p>
				<p>
					暴力的な表現や性的な表現を含むコンテンツは扱いません。
					ゲーム自体を楽しみたい方に加えて、個人開発やWeb技術に関心のある方にも読んでいただける情報を掲載しています。
				</p>

				<h2>更新方針</h2>
				<p>
					新しいゲームは不定期に追加しています。
					公開済みのゲームについても、不具合の修正や遊びやすさの改善を継続的に行っています。
				</p>
				<p>大きな更新があった場合は、YouTubeとXでお知らせします。</p>

				<h2>運営者情報</h2>
				<p>
					{SITE_DOMAIN}は、{COMPANY_NAME}が運営しています。
				</p>
				<ul>
					<li>運営会社: {COMPANY_NAME}</li>
					<li>
						所在地: 〒{COMPANY_POSTAL_CODE} {COMPANY_ADDRESS}
					</li>
					<li>
						連絡先: <a href={CONTACT_PAGE.path}>お問い合わせフォーム</a>
						（日本語または英語で承ります）
					</li>
					<li>サイト名: {SITE_NAME}</li>
				</ul>
				<p>
					代表者の氏名を含む事業者情報は
					<a href={PRIVACY_PAGE.path}>プライバシーポリシー</a>に、
					サービスの利用条件は<a href={TERMS_PAGE.path}>利用規約</a>
					に記載しています。
				</p>
				<p>
					「{SITE_NAME}
					」といいます。当サイトのゲームは、企画から実装まで一人で作っています。
					平日はソフトウェアエンジニアとして働いていて、週末や仕事終わりの時間が開発の時間です。
				</p>
				<p>
					開発の様子は
					<a href="https://youtube.com/@nichiyobuild">YouTube</a>と
					<a href="https://x.com/nichiyobuild">X</a>
					で発信しているので、よければのぞいてみてください。
				</p>
				<p>
					このサイト自体はTypeScript、Hono、Cloudflare
					Workersで作っています。ゲームごとに使っている技術は異なります。
				</p>
				<p>
					ご意見・ご質問・不具合の報告などは
					<a href={CONTACT_PAGE.path}>お問い合わせ</a>からご連絡ください。
				</p>

				<h2>広告について</h2>
				<p>
					当サイトおよび当サイトのゲームには、Google
					が配信する広告が表示されます。
					運営費用はこの広告収入でまかなっており、そのおかげでゲームを無料で公開できています。
				</p>
				<p>
					欧州経済領域・英国・スイスからアクセスされた方、
					および16歳未満の方には、閲覧履歴に基づかない広告のみを配信します。
					広告配信事業者によるCookieの使用などの詳細については
					<a href={PRIVACY_PAGE.path}>プライバシーポリシー</a>をご覧ください。
				</p>
			</article>
		</Layout>
	);
}
