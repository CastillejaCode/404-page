import SlotMachine from './components/SlotMachine';
import { getRandomIntInclusive } from './utils';

const config = {
	// A "winning" spin will be within the range
	spinLimit: getRandomIntInclusive(3, 5),
	messages: {
		lose: "Sorry, we couldn't find that one.",
		win: 'Winner Winner, Chicken Dinner!',
	},
};

export default function Custom404() {
	return (
		<SlotMachine spinLimit={config.spinLimit} messages={config.messages} />
	);
}
