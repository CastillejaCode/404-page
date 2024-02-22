import { animate } from 'motion';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	border-radius: 1rem;
	font-size: clamp(3rem, 10vw, 6rem);
`;

type Props = {
	arr: number[];
	duration: number;
};

export default function Slot({ arr, duration }: Props) {
	const slotRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		animate(
			(progress) =>
				// Progress goes from 0 to 1, multiplying by length - 1 to get indices
				(slotRef.current.innerHTML = String(
					arr.at(Math.round(progress * arr.length - 1))
				)),
			{
				duration: duration / 1000,
				easing: 'ease-out',
			}
		);
	}, [arr]);
	return <Container ref={slotRef}></Container>;
}
