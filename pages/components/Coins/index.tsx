import { createRandomDurations } from '../../utils';

import dynamic from 'next/dynamic';

const DynamicCoin = dynamic(() => import('./Coin'), {
	ssr: false,
});

export default function Coins() {
	const randomDurations = createRandomDurations({
		min: 1,
		max: 2.5,
		length: 25,
	});
	return randomDurations.map((duration, i) => {
		return <DynamicCoin key={i} duration={duration / 1000} />;
	});
}
