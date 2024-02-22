import { animate } from 'motion';

// Numbers //

export function createRandomDurations({ min = 1, max = 3, length = 3 } = {}) {
	return Array.from({ length }, () =>
		Math.round((Math.random() * (max - min) + min) * 1000)
	);
}

export function convertToNumberArray(numbers: number) {
	return [...numbers.toString()].map(Number);
}

// Shamelessly stolen from MDN
export function getRandomIntInclusive(min: number, max: number) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

// Coins //

export function dropCoins({ min = 1, max = 2, length = 50 } = {}) {
	const randomDurations = createRandomDurations({
		min,
		max,
		length,
	});
	randomDurations.forEach((duration) => dropCoin(duration));
}

function dropCoin(duration: number) {
	const coin = document.createElement('img');
	coin.classList.add('coin');

	// Didn't want to waste requests, change to true
	const url = false
		? 'https://www.codedex.io/images/coin-cropped.png'
		: '/coin-cropped.png';
	coin.setAttribute('src', `${url}`);
	coin.setAttribute('alt', 'coin');

	const form = document.querySelector('form');
	form.insertAdjacentElement('beforeend', coin);

	const height = 48;
	const yOffset = Math.random() * (2 * height) + height;
	coin.style.height = `${height}px`;
	coin.style.top = `-${yOffset}px`;

	const xOffset = Math.round(Math.random() * window.innerWidth);
	coin.style.left = `${xOffset}px`;

	animate(
		coin,
		{
			y: window.innerHeight + yOffset,
			// Increase last number to decrease spread
			x: ((Math.random() * 2 - 1) * window.innerWidth) / 4,
		},
		{
			// The seconds / milliseconds divide continues
			duration: duration / 1000,
			easing: 'ease-in',
		}
	).finished.then(() => coin.remove());
}
