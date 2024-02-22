import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SecretAnchor = styled.a<{ $visible: boolean }>`
	visibility: ${(props) => (props.$visible ? 'visible' : 'hidden')};
`;

export default function SecretLink() {
	const [visible, setVisible] = useState(false);
	const code =
		'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';
	const link = 'https://www.youtube.com/watch?v=oHg5SJYRHA0';

	function checkCode(callback, code: string) {
		let pressedKeys = '';
		document.addEventListener('keydown', (e: KeyboardEvent) => {
			pressedKeys += e.key;
			if (pressedKeys === code) callback();
			if (!code.includes(pressedKeys)) pressedKeys = '';
		});
	}

	useEffect(() => {
		checkCode(() => setVisible(true), code);
	}, []);

	return (
		<SecretAnchor href={link} $visible={visible}>
			Secret Youtube Link
		</SecretAnchor>
	);
}
