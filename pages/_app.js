import '../styles/globals.css';
import { Press_Start_2P } from 'next/font/google';

const pressStart = Press_Start_2P({ weight: '400', subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
	return (
		<main className={pressStart.className}>
			<Component {...pageProps} />
		</main>
	);
}

export default MyApp;
