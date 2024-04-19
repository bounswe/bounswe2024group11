import { Container, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import { theme } from "./theme";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Container>
        <img src="./zenith-logo.svg" alt="Zenith Logo" />
      </Container>
    </MantineProvider>
  );
}
