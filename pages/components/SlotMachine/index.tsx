import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
	convertToNumberArray,
	createRandomDurations,
	dropCoins,
	getRandomIntInclusive,
} from '../../utils';
import Slots from '../Slots';
import SecretLink from '../SecretLink';
import { Button } from '../..';

const Section = styled.section`
	display: flex;
	flex-direction: column;
	flex: 1;
	align-items: center;
	gap: 2.5rem;
`;

const H2 = styled.h2<{ $shown: boolean }>`
	font-size: 1.5rem;
	text-align: center;
	line-height: 2.25rem;
	opacity: 0;
	opacity: ${({ $shown }) => $shown && '1'};
	transition: opacity 0.3s;
	padding: 0 2rem 1rem;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
`;

type Props = {
	spinLimit: number;
	messages: {
		win: string;
		lose: string[];
	};
};

export default function SlotMachine({ spinLimit, messages }: Props) {
	const router = useRouter();
	const [randomArrays, setRandomArrays] = useState(
		createRandomArrays({ riggedNumber: 404 })
	);
	const [spinFinished, setSpinFinished] = useState(false);
	const [spinCount, setSpinCount] = useState(0);
	const [loseMessage, setLoseMessage] = useState(messages.lose[0]);
	const limitReached = spinCount >= spinLimit;
	const limitReachedMinusOne = spinCount === spinLimit - 1;

	const randomDurations = useRef(createRandomDurations());

	useEffect(() => {
		handleFinish();
	}, []);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (limitReached) {
			dropCoins({ length: 1 });
		} else {
			randomDurations.current = createRandomDurations();
			handleSpin();
			handleFinish();
		}
	}

	function handleSpin() {
		const isRigged = limitReachedMinusOne ? { riggedNumber: 200 } : {};
		setRandomArrays(createRandomArrays(isRigged));
	}

	function handleFinish() {
		setSpinFinished(false);
		const duration = Math.max(...randomDurations.current);
		const timeout = setTimeout(() => {
			if (limitReachedMinusOne) dropCoins();
			setSpinFinished(true);
			setSpinCount(spinCount + 1);
			setLoseMessage(getRandomMessage(messages.lose));
			clearTimeout(timeout);
		}, duration);
	}

	function getRandomMessage(messages: string[]) {
		const randomNum = Math.round(Math.random() * (messages.length - 1));
		return messages[randomNum];
	}

	return (
		<Section>
			<SecretLink />
			<Slots arrays={randomArrays} durations={randomDurations.current} />
			<H2 $shown={spinFinished}>{limitReached ? messages.win : loseMessage}</H2>
			<Form onSubmit={handleSubmit}>
				<Button disabled={!spinFinished}>
					{limitReached ? 'Drop Coin' : 'Spin Again'}
				</Button>
				<p>or</p>
				<Button type='button' onClick={() => router.back()}>
					Go Back
				</Button>
			</Form>
		</Section>
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
