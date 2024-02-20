import SlotMachine from './components/SlotMachine';

const config = {
	spinLimit: 3,
};

export default function Custom404() {
	return <SlotMachine spinLimit={config.spinLimit} />;
}
