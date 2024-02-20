import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import Head from 'next/head';

export default class MyDocument extends Document {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(
							<>
								<Head>
									<link rel='preconnect' href='https://fonts.googleapis.com' />
									<link
										rel='preconnect'
										href='https://fonts.gstatic.com'
										crossorigin
									/>
									<link
										href='https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'
										rel='stylesheet'
									/>
								</Head>
								<App {...props} />
							</>
						),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: [initialProps.styles, sheet.getStyleElement()],
			};
		} finally {
			sheet.seal();
		}
	}
}
