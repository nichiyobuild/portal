import { Layout } from "#/components/templates/layout";

export function About() {
	return (
		<Layout title={["About"]}>
			<article class="prose-sm prose-invert py-5 lg:py-12">
				<h1>このサイトについて</h1>
				<p>
					nichiyobuild.comはブラウザで遊べるゲームを公開しているサイトです。
				</p>
				<h2>日曜Buildとは？</h2>
				<p>
					このサイトの管理者は日曜Buildという名前で個人開発活動をYouTube、Xで発信しています。
				</p>
				<p>
					平日はソフトウェアエンジニアとして働いており、週末や平日の仕事終わりに個人開発をしています。
				</p>
				<h2>提供しているコンテンツ</h2>
				<p>様々なカテゴリのブラウザゲームを提供しています。</p>
				<p>
					アプリのインストールなどは不要で、お使いのブラウザですぐに遊べます。
				</p>
				<p>
					PC、スマホどちらでも遊べます。一部端末の制限があるゲームがあります。
				</p>
				<p>無料でプレイすることができます。一部有料コンテンツがあります。</p>
				<h2>運営の目的</h2>
				<p>
					当サイトは、個人開発のブラウザゲームを公開するとともに、そのゲームが完成し、運営として成り立つまでの過程を記録した開発ログを公開しています。
				</p>
				<p>
					企画、技術選定、実装でつまずいた点、公開後の改善、そして収益化のための手続きまで、うまくいったことも失敗も含めて残していく方針です。
				</p>
				<p>
					「作れるようにはなったが、そこから先がわからない」——
					ソフトウェア開発を学ぶ方がぶつかりやすいこの段階に、実例として役立つ情報を提供することを目指しています。
				</p>

				<h2>運営者情報</h2>
				<p>
					日曜Buildです。平日はソフトウェアエンジニアとして働いています。
					週末の開発活動を
					<a
						href="https://youtube.com/@nichiyobuild"
						class="text-blue-300 underline"
					>
						YouTube
					</a>
					、
					<a href="https://x.com/nichiyobuild" class="text-blue-300 underline">
						X
					</a>
					で発信しています。
				</p>
			</article>
		</Layout>
	);
}
