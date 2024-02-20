import { useRouter } from 'next/router';

import { Button } from './components/SlotMachine';

export default function Home() {
	const router = useRouter();

	function navigateToError() {
		router.push('doesnt-exist');
	}
	return <Button onClick={navigateToError}>Error</Button>;
}
