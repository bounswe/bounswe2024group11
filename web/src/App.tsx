import { Container, MantineProvider, Button, Flex, Input } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import * as ReactDOM from "react-dom/client";
import { Link, Form, useSubmit } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import img from "../public/zenith-logo.svg";
import { href } from "./router";

export const App = () => {
  return (
    <Container>
      <Link to={href({ path: "/login" })}> Log In </Link>
    </Container>
  );
};
