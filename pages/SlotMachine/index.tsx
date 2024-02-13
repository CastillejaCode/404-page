import { FormEvent, useState } from 'react';
import Slot from './Slot';

export default function SlotMachine() {
	const [arr, setArr] = useState(randomize([4, 0, 4]));

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

type Args = {
	range: [start: number, end: number];
	length: number;
	last?: number;
};

function createRandomArray({ range: [start, end], length, last }: Args) {
	let arr = Array.from({ length }, () => getRandomIntInclusive(start, end));
	if (typeof last == 'number') arr.splice(length - 1, 1, last);
	console.log(arr);
	return arr;
}

function randomize(arr?: number[]) {
	const test = Array.from({ length: 3 }, (e, i) =>
		createRandomArray({ range: [1, 9], length: 9, last: arr[i] })
	);
	// console.log(test);
	return test;
}
