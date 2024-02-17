import { createRandomDurations } from '.';
import Coin from './Coin';

export default function Coins() {
	const randomDurations = createRandomDurations({ min: 1, max: 3, length: 5 });
	return randomDurations.map((duration, i) => {
		return <Coin key={i} duration={duration / 1000} />;
	});
}
