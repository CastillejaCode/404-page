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
	const height = Math.random() * 48 + 48;

	useEffect(() => {
		animate(
			coinRef.current,
			{
				y: window.innerHeight + height,
				x: ((Math.random() * 2 - 1) * window.innerWidth) / 2,
			},
			{ duration, easing: 'ease-in' }
		);
	}, []);

	return (
		<FallingCoin
			$top={height}
			$left={xOffset.current}
			ref={coinRef}
			src='/coin-cropped.png'
			alt='coin'
		/>
	);
}
