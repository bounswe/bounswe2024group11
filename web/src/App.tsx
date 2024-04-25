import { Container, MantineProvider, Button, Flex, Input } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import * as ReactDOM from "react-dom/client";
import { Link, Form, useSubmit } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import img from "../public/zenith-logo.svg";
import { href } from "./router";

// https://pokeapi.co/api/v2/
// pokemon/ditto
export const App = () => {
  const submit = useSubmit();
  return (
    <Container>
      <Link to={href({ path: "/login" })}> Log In </Link>
    </Container>
  );
};
