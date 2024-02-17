import { animate, glide } from 'motion';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const FallingCoin = styled.img`
	position: absolute;
	top: 0;
	width: 5rem;
	aspect-ratio: 1;
`;

export default function Coin() {
	useEffect(() => {
		animate('.coin', { y: 1000 }, { duration: 4, easing: 'ease-in' });
	}, []);
	return (
		<FallingCoin
			className='coin'
			src='https://www.codedex.io/images/coin-cropped.png'
			alt='coin'
		/>
	);
}
