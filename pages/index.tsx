import { useRouter } from 'next/router';
import styled from 'styled-components';

export const Button = styled.button`
	font-family: 'Press Start 2P';
	font-size: 1.25rem;
	color: inherit;
	background-color: #209cee;
	border: 4px solid #244c73;
	box-shadow: inset -4px -4px #006bb3;
	padding: 1rem;
	transition: filter 0.3s;
	cursor: pointer;
	:hover {
		background-color: #0c83d1;
	}
	:disabled {
		filter: grayscale(1);
		pointer-events: none;
	}
`;

export default function Home() {
	const router = useRouter();

	function navigateToError() {
		router.push('doesnt-exist');
	}
	return <Button onClick={navigateToError}>Not Found</Button>;
}
