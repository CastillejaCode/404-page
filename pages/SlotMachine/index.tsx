import { animate } from 'motion';
import { useRef } from 'react';

export default function SlotMachine() {
	const ref = useRef<HTMLDivElement>();

	function getRandomIntInclusive(min, max) {
		const minCeiled = Math.ceil(min);
		const maxFloored = Math.floor(max);
		return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
	}

	function createRandomArray(start, end, length: number) {
		return Array.from({ length }, () => getRandomIntInclusive(start, end));
	}

	function randomize() {
		const array = createRandomArray(1, 9, 10);
		animate(
			(progress) =>
				(ref.current.innerHTML = String(
					array.at(Math.round(progress * array.length - 1))
				)),
			{
				duration: 2,
				easing: 'ease-out',
			}
		);
	}

	return (
		<div>
			<div ref={ref} className='container'></div>
			<button onClick={randomize}>Reset</button>
		</div>
	);
}
