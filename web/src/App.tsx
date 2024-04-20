import { Container, MantineProvider, Button, Flex } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import { theme } from "./theme";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import img from "../public/zenith-logo.svg";

type NumberButtonProps = {
  digit: number,
}

const Buttons = ({ digit }: NumberButtonProps) => {
  return (
    <Flex
      mih={50}
      gap="md"
      justify="center"
      align="flex-start"
      direction="column"
      wrap="wrap">
      {(digit != -1 && <Button
        component="a"
        href="/"
      >
        Home
      </Button>)}
      {(digit != 0 && <Button
        component="a"
        href="/userprofile/1"
      >
        User Profile for User 1
      </Button>)}
      {(digit != 1 && <Button
        component="a"
        href="/register"
      >
        Register
      </Button>)}
      {(digit != 2 && <Button
        component="a"
        href="/login"
      >
        Login
      </Button>)}
      {(digit != 3 && <Button
        component="a"
        href="/feed"
      >
        Feed
      </Button>)}
    </Flex>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element:
      <Container>
        <Outlet />
        <Buttons digit={-2}></Buttons>
      </Container>,
    children: [
      {
        path: "userprofile/:profileId",
        element:
          <Container>
            <h1>User Profile</h1>
          </Container>,
      },
      {
        path: "login",
        element:
          <Container>
            <h1>Login</h1>
          </Container>,
      },
      {
        path: "register",
        element:
          <Container>
            <h1>Register</h1>
          </Container>,
      },
      {
        path: "feed",
        element:
          <Container>
            <h1>Feed</h1>
          </Container>,
      },
    ],
  },
]);
export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Container>
        <img src={img} alt="Zenith Logo" />
      </Container>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
