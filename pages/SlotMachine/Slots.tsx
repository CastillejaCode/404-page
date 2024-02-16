import styled from 'styled-components';
import Slot from './Slot';

const SlotsContainer = styled.div`
	display: flex;
	font-size: 2rem;
	justify-content: center;
`;

type Props = {
	arrays: number[][];
	durations: number[];
};

export default function Slots({ arrays, durations }: Props) {
	return (
		<SlotsContainer>
			{arrays.map((e, i) => {
				return <Slot key={i} arr={e} duration={durations[i]} />;
			})}
		</SlotsContainer>
	);
}
