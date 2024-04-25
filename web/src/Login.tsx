import {
  TextInput,
  Container,
  Button,
  Flex,
  Input,
  Checkbox,
} from "@mantine/core";
import { Link, Form, useSubmit } from "react-router-dom";
import { href } from "./router";

export const Login = () => {
  const submit = useSubmit();
  return (
    <Container className="flex flex-col items-center">
      {/* <div className="flex flex-col items-center justify-center min-h-12 gap-4">
        <div className="flex flex-col">
          <Flex justify="center" align="flex-start" direction="column">
            <img src="./zenith-logo.svg" alt="Zenith Logo" />
          </Flex>
          <h2 text-align="center">
            <b>Login to your Zenith account</b>
          </h2>
          <p text-align="center">Ready to continue your comic adventure?</p>
        </div>
        <Form
          onChange={(e) => {
            submit(e.currentTarget);
          }}
        >
          <input name="login" placeholder="email address" id="Email" required />
          <input
            name="password"
            type="password"
            placeholder="password"
            required
          />

          <label htmlFor="logged in">Keep me logged in</label>
          <input type="checkbox" name="logged in" />

          <Link to="/">Forgot Password</Link>

          <Button
            to={href({ path: "/" })}
            component={Link}
            type="submit"
            fullWidth
          >
            Log Innn
          </Button>
        </Form>
        <Button
          to={href({ path: "/register" })}
          component={Link}
          type="submit"
          fullWidth
        >
          Register
        </Button>
      </div> */}
      <div className="flex flex-col items-center justify-center min-h-12 gap-4 w-80 bg-red-100">
        wip
      </div>
    </Container>
  );
};
