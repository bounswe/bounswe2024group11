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

interface NumberButtonProps {
  digit: number,
}

const Buttons = function (props: NumberButtonProps) {
  return (
    <Flex
      mih={50}
      gap="md"
      justify="center"
      align="flex-start"
      direction="column"
      wrap="wrap">
      {(props.digit != -1 && <Button
        component="a"
        href="/"
      >
        Home
      </Button>)}
      {(props.digit != 0 && <Button
        component="a"
        href="/userprofile/1"
      >
        User Profile for User 1
      </Button>)}
      {(props.digit != 1 && <Button
        component="a"
        href="/register"
      >
        Register
      </Button>)}
      {(props.digit != 2 && <Button
        component="a"
        href="/login"
      >
        Login
      </Button>)}
      {(props.digit != 3 && <Button
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
        <img src={img} alt="Zenith Logo" />
        <Outlet />
        <Buttons digit={11}></Buttons>
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
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
