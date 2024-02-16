import { animate } from 'motion';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: grid;
	place-content: center;
	padding: 1rem;
	border: 1px solid white;
`;

type Props = {
	arr: number[];
	duration: number;
};

export default function Slot({ arr, duration }: Props) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		animate(
			(progress) =>
				// Progress goes from 0 to 1, multiplying by length - 1 to get indices
				(ref.current.innerHTML = String(
					arr.at(Math.round(progress * arr.length - 1))
				)),
			{
				duration,
				easing: 'ease-out',
			}
		);
	}, [arr]);
	return <Container ref={ref}></Container>;
}
