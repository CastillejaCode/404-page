import '../styles/globals.css';
import styled from 'styled-components';
// import { Press_Start_2P } from 'next/font';

// const pressStart = Press_Start_2P({ weight: '400', subsets: ['latin'] });

const Main = styled.main`
	display: flex;
	flex-direction: columnddit;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #0f1524;
	color: #ffffff;
`;

function MyApp({ Component, pageProps }) {
	return (
		<Main>
			<Component {...pageProps} />
		</Main>
	);
}

export default MyApp;
