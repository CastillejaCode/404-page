import { FormEvent, useEffect, useState } from 'react';
import Slots from './Slots';

export default function SlotMachine() {
	const [randomArrays, setRandomArrays] = useState(
		createRandomArrays({ riggedNumber: 404 })
	);
	const [spinCount, setSpinCount] = useState(0);
	const [spinFinished, setSpinFinished] = useState(false);

	const randomDurations = createRandomDurations();

	useEffect(() => {
		handleFinish();
	}, []);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		handleFinish();
		handleSpin();
	}

	function handleFinish() {
		setSpinFinished(false);
		const maxTimeout = Math.max(...randomDurations) * 1000;
		setTimeout(() => {
			setSpinFinished(true);
		}, maxTimeout);
	}

	function handleSpin() {
		if (spinCount > 1)
			setRandomArrays(createRandomArrays({ riggedNumber: 200 }));
		else setRandomArrays(createRandomArrays());
		setSpinCount(spinCount + 1);
	}

	return (
		<div className='container'>
			<h1 className={`${!spinFinished && 'hidden'}`}>Sorry</h1>
			<form onSubmit={handleSubmit}>
				<Slots arrays={randomArrays} durations={randomDurations} />
				<button>Spin Again</button>
			</form>
			<h2 className={`${!spinFinished && 'hidden'}`}>
				We couldnt find that one...
			</h2>
		</div>
	);
}

function createRandomDurations({ min = 1, max = 3, length = 3 } = {}) {
	return Array.from({ length }, () => Math.random() * (max - min) + min);
}

// Shamelessly stolen from MDN
function getRandomIntInclusive(min: number, max: number) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function createRandomArray({ min = 0, max = 9, length = 9 } = {}) {
	return Array.from({ length }, () => getRandomIntInclusive(min, max));
}

function createRandomArrays({ riggedNumber = 0, length = 3 } = {}) {
	let arr = Array.from({ length }, createRandomArray);

	if (riggedNumber) {
		const numberArray = convertToNumberArray(riggedNumber);
		arr.forEach((e, i) => {
			e.pop();
			e.push(numberArray[i]);
		});
	}

	return arr;
}

function convertToNumberArray(numbers: number) {
	return [...numbers.toString()].map(Number);
}
