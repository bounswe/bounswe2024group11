import { TextInput, Container, Button, useMantineTheme } from "@mantine/core";
import { Link, Form, useSubmit } from "react-router-dom";
import { href } from "./router";
import { button, buttonInnerRing } from "./components/Button";

export const Register = () => {
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
              Create a new Zenith account
            </h1>
            <p className="text-center text-slate-500 max-w-xs">
              Unlock the world of comics. Register for Zenith today.
            </p>
          </div>
        </div>
        <hr className="border-slate-100" />
        <Form className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <TextInput
              placeholder="John Doe"
              id="fullName"
              required
              label="Full Name"
              name="login"
              aria-label="Full Name"
            />

            <TextInput
              placeholder="johndoe@example.com"
              id="email"
              required
              label="Email Address"
              name="login"
              aria-label="Email Address"
            />

            <TextInput
              placeholder="john_doe"
              id="username"
              required
              label="Username"
              name="login"
              aria-label="User name"
            />

            <TextInput
              className="placeholder-slate-200"
              placeholder="••••••••"
              type="password"
              required
              label="Password"
              name="password"
              aria-label="Password"
            />
          </div>

          <div className="flex flex-col gap-2">
            <button
              className={button({ intent: "secondary" })}
              onSubmit={() => {}}
            >
              <div className={buttonInnerRing({ intent: "secondary" })} />
              <span>Register</span>
            </button>

            <a
              className={button({ intent: "tertiary" })}
              href={href({ path: "/login" })}
            >
              <span className="text-slate-900">Log In</span>
            </a>

            <p className="text-sm text-slate-400 text-center">
              By clicking Register, you agree to accept Zenit's{" "}
              <a
                className="underline underline-offset-2 text-slate-900"
                href={href({ path: "/terms" })}
              >
                Terms and Conditions
              </a>
            </p>
          </div>
        </Form>
      </div>
    </Container>
  );
};
