import { Container, MantineProvider, Button, Flex, Input } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import { PokeLoader, href } from "./router";
import { theme } from "./theme";
import * as ReactDOM from "react-dom/client";
import { Link, Form, useSubmit } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import img from "../public/zenith-logo.svg";

type NumberButtonProps = {
  digit: number;
};

const Buttons = ({ digit }: NumberButtonProps) => {
  return (
    <Flex
      mih={50}
      gap="md"
      justify="center"
      align="flex-start"
      direction="column"
      wrap="wrap"
    >
      {digit != -1 && (
        <Button component="a" href="/">
          Home
        </Button>
      )}
      {digit != 0 && (
        <Button component="a" href="/userprofile/1">
          User Profile for User 1
        </Button>
      )}
      {digit != 1 && (
        <Button component="a" href="/register">
          Register
        </Button>
      )}
      {digit != 2 && (
        <Button component="a" href="/login">
          Login
        </Button>
      )}
      {digit != 3 && (
        <Button component="a" href="/feed">
          Feed
        </Button>
      )}
    </Flex>
  );
};

// https://pokeapi.co/api/v2/
// pokemon/ditto
export const App = () => {
  const a = useLoaderData<PokeLoader>();
  const submit = useSubmit();
  return (
    <MantineProvider theme={theme}>
      <Link to={href({ path: "/type" })}>aaahaha</Link>
      <Container>
        <img src="./zenith-logo.svg" alt="Zenith Logo" />
        <div
          className="h-10 w-10 opacity-50"
          style={{
            background: theme.colors.cyan[5],
          }}
        />
        <Form
          onChange={(e) => {
            submit(e.currentTarget);
          }}
        >
          <input name="search" placeholder="Enter your name" />
          <button>Submit</button>
        </Form>
        <p>{JSON.stringify(a.pokemon)}</p>
      </Container>
    </MantineProvider>
  );
};
