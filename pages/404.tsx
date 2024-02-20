import SlotMachine from './components/SlotMachine';
import { getRandomIntInclusive } from './utils';

const config = {
	// A "winning" spin will be within the range
	spinLimit: getRandomIntInclusive(3, 5),
};

export default function Custom404() {
	return <SlotMachine spinLimit={config.spinLimit} />;
}
