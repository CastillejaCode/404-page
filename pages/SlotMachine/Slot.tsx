import { animate } from 'motion';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

type Props = {
	array: number[];
	duration: number;
};

export default function Slot({ array, duration }: Props) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		animate(
			(progress) =>
				(ref.current.innerHTML = String(
					array.at(Math.round(progress * array.length - 1))
				)),
			{
				duration,
				easing: 'ease-out',
			}
		);
	}, [array]);
	return <div ref={ref} className='slot'></div>;
}
