import { FormEvent, useEffect, useState } from 'react';
import Slots from './Slots';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const H1 = styled.h1<{ $hidden: boolean }>`
	opacity: ${({ $hidden }) => ($hidden ? '0' : '1')};
	transition: all 0.3s;
`;

const H2 = styled.h2<{ $hidden: boolean }>`
	opacity: ${({ $hidden }) => ($hidden ? '0' : '1')};
	transition: all 0.3s;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
`;

export default function SlotMachine() {
	const [randomArrays, setRandomArrays] = useState(
		createRandomArrays({ riggedNumber: 404 })
	);
	const [spinCount, setSpinCount] = useState(0);
	const [spinFinished, setSpinFinished] = useState(false);

	const [randomDurations, setRandomDurations] = useState(
		createRandomDurations()
	);

	useEffect(() => {
		handleFinish();
	}, []);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setRandomDurations(createRandomDurations());
		handleSpin();
		handleFinish();
	}

	function handleFinish() {
		const maxTimeout = Math.max(...randomDurations) * 1000;
		console.log(maxTimeout);
		setSpinFinished(false);
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
		<Container>
			<H1 $hidden={!spinFinished}>Sorry</H1>
			<Form onSubmit={handleSubmit}>
				<Slots arrays={randomArrays} durations={randomDurations} />
				<button>Spin Again</button>
			</Form>
			<H2 $hidden={!spinFinished}>We couldnt find that one...</H2>
		</Container>
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
