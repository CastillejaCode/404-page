import { createRandomDurations } from '.';

import dynamic from 'next/dynamic';

const DynamicCoin = dynamic(() => import('./Coin'), {
	ssr: false,
});

export default function Coins() {
	const randomDurations = createRandomDurations({
		min: 1,
		max: 3,
		length: 20,
	});
	return randomDurations.map((duration, i) => {
		return <DynamicCoin key={i} duration={duration / 1000} />;
	});
}
