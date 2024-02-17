import styled from 'styled-components';
import Slot from './Slot';

const SlotsContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	gap: 1.5rem;
	border: 4px solid #244c73;
	padding: 2.5rem 3rem;
`;

const Span = styled.span`
	position: absolute;
	top: -0.5rem;
	left: 1rem;
	background-color: #0f1524;
	padding: 0 1rem;
`;

type Props = {
	arrays: number[][];
	durations: number[];
};

export default function Slots({ arrays, durations }: Props) {
	return (
		<>
			<SlotsContainer>
				{arrays.map((e, i) => {
					return <Slot key={i} arr={e} duration={durations[i]} />;
				})}
				<Span>Spin to Win</Span>
			</SlotsContainer>
		</>
	);
}
