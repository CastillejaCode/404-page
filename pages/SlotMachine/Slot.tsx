import { animate } from 'motion';
import { useEffect, useRef } from 'react';

type Props = {
	array: number[];
};

export default function Slot({ array }: Props) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		animate(
			(progress) =>
				(ref.current.innerHTML = String(
					array.at(Math.round(progress * array.length - 1))
				)),
			{
				duration: Math.random() * 2 + 1,
				easing: 'ease-out',
			}
		);
	}, [array]);
	return <div ref={ref} className='slot'></div>;
}
