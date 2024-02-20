export function convertToNumberArray(numbers: number) {
	return [...numbers.toString()].map(Number);
}

export function createRandomDurations({ min = 1, max = 3, length = 3 } = {}) {
	return Array.from({ length }, () =>
		Math.round((Math.random() * (max - min) + min) * 1000)
	);
}
