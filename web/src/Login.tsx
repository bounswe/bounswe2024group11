import { TextInput, Container, MantineProvider, Button, Flex, Input, Checkbox } from "@mantine/core";
import { Link, Form, useSubmit } from "react-router-dom";
import { useForm } from '@mantine/form';
import { useState } from 'react';
const submit = useSubmit();

export const Login = () => {
    return (
        <Flex
            mih={50}
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap-reverse"
        >
            <Flex>
                <Flex
                    justify="center"
                    align="flex-start"
                    direction="row">
                    <img src="./zenith-logo.svg" alt="Zenith Logo" />
                </Flex>
                <h2 text-align="center"><b>Login to your Zenith account</b></h2>
                <p text-align="center">Ready to continue your comic adventure?<br />Login now!</p>
            </Flex>

            <Form
                onChange={(e) => {
                    submit(e.currentTarget);
                }}
            >
                <input name="login" placeholder="email address" id="Email" required />
                <input name="password" type="password" placeholder="password" required />
                <Container>
                    <input type="checkbox" name="Keep me logged in" />
                    <Link to="/">Forgot Password</Link>
                </Container>
                <Button type="submit" fullWidth>Login</Button>
            </Form>
        </Flex>
    );
}