import { FormEvent, useEffect, useState } from 'react';
import Slot from './Slot';

export default function SlotMachine() {
	const [arr, setArr] = useState(randomize([4, 0, 4]));
	const [spins, setSpins] = useState(0);
	const [finished, setFinished] = useState(false);
	const randomDurations = Array.from(
		{ length: 3 },
		() => Math.random() * 2 + 1
	);

	useEffect(() => {
		handleFinish();
	}, []);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		handleFinish();
		if (spins > 1) setArr(randomize([2, 0, 0]));
		else setArr(randomize());
		setSpins(spins + 1);
	}

	function handleFinish() {
		setFinished(false);
		const timeout = Math.max(...randomDurations) * 1000;
		setTimeout(() => {
			setFinished(true);
		}, timeout);
	}

	return (
		<div className='container'>
			<h1 className={`${!finished && 'hidden'}`}>Sorry</h1>
			<form onSubmit={handleSubmit}>
				<div className='slots'>
					{arr.map((e, i) => {
						return <Slot key={i} array={e} duration={randomDurations[i]} />;
					})}
				</div>
				<h2 className={`${!finished && 'hidden'}`}>
					We couldnt find that one...
				</h2>
				<button>Spin Again</button>
			</form>
		</div>
	);
}
function getRandomIntInclusive(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

type Args = {
	range: [number, number];
	length: number;
	last?: number;
};

function createRandomArray({ range: [start, end], length }: Args) {
	return Array.from({ length }, () => getRandomIntInclusive(start, end));
}

function randomize(riggedNumbers?: number[]) {
	const range: [number, number] = [1, 9];
	const length = 9;

	let arr = Array.from({ length: 3 }, () =>
		createRandomArray({ range, length })
	);

	if (riggedNumbers)
		arr.forEach((e, i) => {
			arr[i].splice(length - 1, 1, riggedNumbers[i]);
		});
	return arr;
}
