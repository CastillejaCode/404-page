import { FormEvent, useState } from 'react';
import Slot from './Slot';

export default function SlotMachine() {
	const [arr, setArr] = useState(randomize());

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setArr(randomize());
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className='slots'>
				{arr.map((e, i) => {
					return <Slot key={i} array={e} />;
				})}
			</div>
			<button>Reset</button>
		</form>
	);
}
function getRandomIntInclusive(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function createRandomArray(start, end, length: number) {
	return Array.from({ length }, () => getRandomIntInclusive(start, end));
}

function randomize() {
	return Array.from({ length: 3 }, (e) => createRandomArray(1, 9, 10));
}
