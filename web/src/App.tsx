import {
  Container,
  MantineProvider,
  Button,
  Flex,
  Input,
  useMantineTheme,
} from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import * as ReactDOM from "react-dom/client";
import { Link, Form, useSubmit } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import img from "../public/zenith-logo.svg";

export const App = () => {
  const submit = useSubmit();
  const theme = useMantineTheme();
  return (
    <>
      <Container>
        <img src="./zenith-logo.svg" alt="Zenith Logo" />
        <div
          className="h-10 w-10"
          style={{
            background: theme.colors.gray[2],
          }}
        />
        <Form
          onChange={(e) => {
            submit(e.currentTarget);
          }}
        >
          <input name="search" placeholder="Enter your name" />
        </Form>
      </Container>
    </>
  );
};
