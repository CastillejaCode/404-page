import styled from 'styled-components';
import { useRouter } from 'next/router';

const Button = styled.button``;

export default function Home() {
	const router = useRouter();

	function navigateToError() {
		router.push('doesnt-exist');
	}
	return <Button onClick={navigateToError}>Error</Button>;
}
