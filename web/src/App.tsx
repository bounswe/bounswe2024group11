import { Container, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import { theme } from "./theme";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Container>
        <img src="./zenith-logo.svg" alt="Zenith Logo" />
        <div
          className="h-10 w-10 opacity-50"
          style={{
            background: theme.colors.cyan[5],
          }}
        />
      </Container>
    </MantineProvider>
  );
}
