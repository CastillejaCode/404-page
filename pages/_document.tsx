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
									<meta
										name='viewport'
										content='width=device-width, initial-scale=1.0'
									/>
									<title>Not Found</title>
									<link
										rel='apple-touch-icon'
										sizes='180x180'
										href='/apple-touch-icon.png'
									/>
									<link
										rel='icon'
										type='image/png'
										sizes='32x32'
										href='/favicon-32x32.png'
									/>
									<link
										rel='icon'
										type='image/png'
										sizes='16x16'
										href='/favicon-16x16.png'
									/>
									<link rel='manifest' href='/site.webmanifest' />
									<link rel='preconnect' href='https://fonts.googleapis.com' />
									<link
										rel='preconnect'
										href='https://fonts.gstatic.com'
										crossOrigin='anonymous'
									/>
									<link
										href='https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'
										rel='stylesheet'
									/>
								</Head>
								<App {...props}></App>
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
