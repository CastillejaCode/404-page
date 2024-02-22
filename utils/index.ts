import { animate } from 'motion';

// Numbers //

export function createRandomDurations({
	minDuration = 1,
	maxDuration = 3,
	length = 3,
} = {}) {
	return Array.from({ length }, () =>
		Math.round(
			(Math.random() * (maxDuration - minDuration) + minDuration) * 1000
		)
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

// Increase heightFactor to increase y-axis variability
// Increase spreadfactor to decrease x-axis variability
export function dropCoins({
	minDuration = 1,
	maxDuration = 2,
	coins = 50,
	heightFactor = 2,
	spreadFactor = 4,
} = {}) {
	const randomDurations = createRandomDurations({
		minDuration,
		maxDuration,
		length: coins,
	});
	randomDurations.forEach((duration) =>
		dropCoin(duration, heightFactor, spreadFactor)
	);
}

function dropCoin(
	duration: number,
	heightFactor: number,
	spreadFactor: number
) {
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
	const yOffset = Math.random() * (heightFactor * height) + height;
	coin.style.height = `${height}px`;
	coin.style.top = `-${yOffset}px`;

	const xOffset = Math.round(Math.random() * window.innerWidth);
	coin.style.left = `${xOffset}px`;

	animate(
		coin,
		{
			y: window.innerHeight + yOffset,
			// Increase last number to decrease spread
			x: ((Math.random() * 2 - 1) * window.innerWidth) / spreadFactor,
		},
		{
			// The seconds / milliseconds divide continues
			duration: duration / 1000,
			easing: 'ease-in',
		}
	).finished.then(() => coin.remove());
}
