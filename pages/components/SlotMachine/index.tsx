import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
	convertToNumberArray,
	createRandomDurations,
	getRandomIntInclusive,
} from '../../utils';
import Coins from '../Coins';
import Slots from '../Slots';

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2.5rem;
`;

export const Button = styled.button`
	font-family: 'Press Start 2P';
	font-size: 1.25rem;
	color: inherit;
	background-color: #209cee;
	:hover {
		background-color: #0c83d1;
	}
	:disabled {
		filter: grayscale(1);
		pointer-events: none;
	}
	border: 4px solid #244c73;
	box-shadow: inset -4px -4px #006bb3;
	padding: 1rem;
	transition: filter 0.3s;
	cursor: pointer;
`;

const H2 = styled.h2<{ $shown: boolean }>`
	font-size: 1.5rem;
	text-align: center;
	line-height: 2.25rem;
	opacity: 0;
	opacity: ${({ $shown }) => $shown && '1'};
	transition: opacity 0.3s;
	padding: 0 2rem;
`;

type Props = {
	spinLimit: number;
};

export default function SlotMachine({ spinLimit }: Props) {
	const router = useRouter();
	const [randomArrays, setRandomArrays] = useState(
		createRandomArrays({ riggedNumber: 404 })
	);
	const [spinFinished, setSpinFinished] = useState(false);
	const [spinCount, setSpinCount] = useState(0);
	const limitReached = spinCount === spinLimit;

	const randomDurations = useRef(createRandomDurations());

	useEffect(() => {
		handleFinish();
	}, []);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (limitReached) {
			router.back();
		} else {
			randomDurations.current = createRandomDurations();
			handleSpin();
			handleFinish();
		}
	}

	function handleSpin() {
		const isRigged = spinCount >= spinLimit - 1 ? { riggedNumber: 200 } : {};
		setRandomArrays(createRandomArrays(isRigged));
	}

	function handleFinish() {
		setSpinFinished(false);
		const duration = Math.max(...randomDurations.current);
		const timeout = setTimeout(() => {
			setSpinFinished(true);
			setSpinCount(spinCount + 1);
			clearTimeout(timeout);
		}, duration);
	}

	return (
		<Form onSubmit={handleSubmit}>
			{limitReached && spinFinished && <Coins />}
			<Slots arrays={randomArrays} durations={randomDurations.current} />
			<H2 $shown={spinFinished}>
				{limitReached
					? 'Winner Winner, Chicken Dinner!'
					: "Sorry, we couldn't find that one."}
			</H2>
			<Button disabled={!spinFinished}>
				{limitReached ? 'Go Back' : 'Spin Again'}
			</Button>
		</Form>
	);
}

// Create an array of arrays of random numbers for each slot
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

function createRandomArray({ min = 0, max = 9, length = 9 } = {}) {
	return Array.from({ length }, () => getRandomIntInclusive(min, max));
}