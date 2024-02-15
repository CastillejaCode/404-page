import Slot from './Slot';

type Props = {
	arrays: number[][];
	durations: number[];
};

export default function Slots({ arrays, durations }: Props) {
	return (
		<div className='slots'>
			{arrays.map((e, i) => {
				return <Slot key={i} arr={e} duration={durations[i]} />;
			})}
		</div>
	);
}
