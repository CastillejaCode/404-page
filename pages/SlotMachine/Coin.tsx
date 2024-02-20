import { animate } from 'motion';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const FallingCoin = styled.img<{ $left: string }>`
	position: fixed;
	top: 0;
	left: ${({ $left }) => $left};
	width: 3rem;
	aspect-ratio: 1;
`;

type Props = {
	duration: number;
};

export default function Coin({ duration }: Props) {
	const coinRef = useRef<HTMLImageElement>(null);
	const xOffset = `${Math.round(Math.random() * window.innerWidth)}px`;
	console.log(xOffset);

	useEffect(() => {
		animate(
			coinRef.current,
			{ y: window.innerHeight },
			{ duration, easing: 'ease-in' }
		);
	}, []);

	return (
		<FallingCoin
			$left={xOffset}
			ref={coinRef}
			src='https://www.codedex.io/images/coin-cropped.png'
			alt='coin'
		/>
	);
}
