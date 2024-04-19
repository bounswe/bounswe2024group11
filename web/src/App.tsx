import '@mantine/core/styles.css';
import { Container, MantineProvider } from '@mantine/core';
import { theme } from './theme';
import React from 'react';

export default function App() {
	return (
		<MantineProvider theme={theme}>
			<Container>
				<img src="./zenith-logo.svg" alt="Zenith Logo" />
			</Container>
		</MantineProvider>
	);
}
