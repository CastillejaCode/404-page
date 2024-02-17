import { animate, glide } from 'motion';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const FallingCoin = styled.img<{ $left: string }>`
	position: absolute;
	top: 0;
	left: ${({ $left }) => $left};
	width: 5rem;
	aspect-ratio: 1;
`;

type Props = {
	duration: number;
};

export default function Coin({ duration }: Props) {
	const [left, useLeft] = useState(`${Math.round(Math.random() * 300)}px`);
	const coinRef = useRef<HTMLImageElement>();
	useEffect(() => {
		animate(coinRef.current, { y: 1000 }, { duration, easing: 'ease-in' });
	}, []);

	return (
		<FallingCoin
			$left={left}
			ref={coinRef}
			src='https://www.codedex.io/images/coin-cropped.png'
			alt='coin'
		/>
	);
}
