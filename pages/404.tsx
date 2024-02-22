import SlotMachine from './components/SlotMachine';
import { getRandomIntInclusive } from './utils';

const config = {
	// A "winning" spin will be within this range
	spinLimit: getRandomIntInclusive(3, 5),
	messages: {
		lose: [
			"Sorry, we couldn't find that one.",
			"Couldn't find that one.",
			"We'll look harder next time, sorry.",
			'Nope, not here.',
			"It's somewhere here, I know it...",
		],
		win: 'Winner Winner, Chicken Dinner!',
	},
};

export default function Custom404() {
	return (
		<SlotMachine spinLimit={config.spinLimit} messages={config.messages} />
	);
}
