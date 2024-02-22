import { animate } from 'motion';

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

export function dropCoins({ min = 1, max = 2, length = 25 } = {}) {
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
	coin.setAttribute('src', '/coin-cropped.png');
	coin.setAttribute('alt', 'coin');

	const form = document.querySelector('form');
	form.insertAdjacentElement('afterbegin', coin);

	const height = 48;
	const yOffset = Math.random() * height + height;
	coin.style.height = `${height}px`;
	coin.style.top = `-${yOffset}px`;

	const xOffset = Math.round(Math.random() * window.innerWidth);
	coin.style.left = `${xOffset}px`;

	animate(
		coin,
		{
			y: window.innerHeight + yOffset,
			x: ((Math.random() * 2 - 1) * window.innerWidth) / 3,
		},
		{
			duration: duration / 1000,
			easing: 'ease-in',
		}
	);
}
