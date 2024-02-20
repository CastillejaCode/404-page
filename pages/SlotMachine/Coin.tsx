import { animate } from 'motion';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const FallingCoin = styled.img<{ $left: number; $top: number }>`
	position: fixed;
	top: ${({ $top }) => -$top + 'px'};
	left: ${({ $left }) => $left + 'px'};
	height: 3rem;
	aspect-ratio: 1;
`;

type Props = {
	duration: number;
};

export default function Coin({ duration }: Props) {
	const coinRef = useRef<HTMLImageElement>(null);
	const xOffset = useRef(Math.round(Math.random() * window.innerWidth));
	const height = Math.random() * 48;

	useEffect(() => {
		animate(
			coinRef.current,
			{
				y: window.innerHeight + height,
				// x: ((Math.random() * 2 - 1) * window.innerWidth) / 2,
			},
			{ duration, easing: [0.33333, 0, 0.66667, 0.33333] }
		);
	}, []);

	return (
		<FallingCoin
			$top={height}
			$left={xOffset.current}
			ref={coinRef}
			src='https://www.codedex.io/images/coin-cropped.png'
			alt='coin'
		/>
	);
}
