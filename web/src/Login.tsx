import {
  TextInput,
  Container,
  Button,
  Flex,
  Input,
  Checkbox,
  useMantineTheme,
} from "@mantine/core";
import { Link, Form, useSubmit } from "react-router-dom";
import { href } from "./router";

export const Login = () => {
  const submit = useSubmit();
  const theme = useMantineTheme();
  return (
    <Container className="flex flex-col items-center py-20">
      <div className="flex flex-col items-stretch justify-center min-h-12 gap-6 w-full max-w-md shadow-card border border-slate-100 rounded-4 p-6">
        <div className="flex flex-col items-center gap-2">
          <img
            src="./img/zenith-login-logo.webp"
            alt="Zenith Logo"
            width={80}
            height={80}
          />
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-2xl font-medium font-display text-slate-950">
              Login to your Zenith account
            </h1>
            <p className="text-center text-slate-500">
              Ready to continue your comic adventure?{" "}
            </p>
          </div>
        </div>
        <hr className="border-slate-100" />
        <Form className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <TextInput
              classNames={{
                label: "text-sm font-medium",
                input: "focus:ring-slate-900",
              }}
              placeholder="johndoe@example.com"
              id="Email"
              required
              label="Email Address"
              name="login"
            />
            <TextInput
              className="placeholder-slate-200"
              placeholder="••••••••"
              type="password"
              required
              label="Password"
              name="password"
            />
          </div>

          <div className="flex items-center justify-between">
            <Link className="underline text-sm" to="/">
              Forgot Password
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              classNames={{
                root: "",
              }}
              to={href({ path: "/" })}
              component={Link}
              type="submit"
              fullWidth
              color="blue"
            >
              Log In
            </Button>
            <Button
              to={href({ path: "/register" })}
              component={Link}
              fullWidth
              color="blue"
            >
              Register
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};
