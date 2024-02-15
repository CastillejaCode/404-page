import { animate } from 'motion';
import { useEffect, useRef } from 'react';

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
	return <div ref={ref} className='slot'></div>;
}
