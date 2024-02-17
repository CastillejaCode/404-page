import { FormEvent, useEffect, useRef, useState } from 'react';
import Slots from './Slots';
import styled from 'styled-components';

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem;
`;

const H1 = styled.h1<{ $hidden: boolean }>`
	display: flex;
	align-self: start;
	font-size: 2.25rem;
	opacity: ${({ $hidden }) => ($hidden ? '0' : '1')};
	transition: opacity 0.3s;
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 3rem;
`;
const H2 = styled.h2<{ $hidden: boolean }>`
	font-size: 1.5rem;
	text-align: center;
	line-height: 2.25rem;
	opacity: ${({ $hidden }) => ($hidden ? '0' : '1')};
	transition: opacity 0.3s;
`;

const Button = styled.button<{ $hidden: boolean }>`
	font-size: 2rem;
	opacity: ${({ $hidden }) => ($hidden ? '0' : '1')};
	transition: opacity 0.3s;
`;

export default function SlotMachine() {
	const [randomArrays, setRandomArrays] = useState(
		createRandomArrays({ riggedNumber: 404 })
	);
	const [spinFinished, setSpinFinished] = useState(false);

	const spinCount = useRef(0);
	const randomDurations = useRef(createRandomDurations());

	useEffect(() => {
		handleFinish();
	}, []);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		randomDurations.current = createRandomDurations();
		handleSpin();
		handleFinish();
	}

	function handleSpin() {
		const limitReached = spinCount.current >= 3;
		setRandomArrays(
			createRandomArrays(limitReached ? { riggedNumber: 200 } : {})
		);
		spinCount.current++;
	}

	function handleFinish() {
		setSpinFinished(false);
		const duration = Math.max(...randomDurations.current);
		const timeout = setTimeout(() => {
			setSpinFinished(true);
			clearTimeout(timeout);
		}, duration);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Container>
				<H1 $hidden={!spinFinished}>Sorry</H1>
				<Slots arrays={randomArrays} durations={randomDurations.current} />
				<H2 $hidden={!spinFinished}>We couldnt find that one...</H2>
			</Container>
			<Button $hidden={!spinFinished}>Spin Again</Button>
		</Form>
	);
}

function createRandomDurations({ min = 1, max = 3, length = 3 } = {}) {
	return Array.from({ length }, () =>
		Math.round((Math.random() * (max - min) + min) * 1000)
	);
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
