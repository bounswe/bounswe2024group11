import { http, HttpResponse } from "msw";
import { safeParse } from "valibot";
import { loginRequestSchema } from "../routes/Login.data";
import { registerRequestSchema } from "../routes/Register.data";
import { BASE_URL, logger } from "../utils";
import { usersDb } from "./mocks.auth";

export const authHandlers = [
    http.post(`${BASE_URL}/token`, async ({ request }) => {
        const requestBody = await request.json();
        const { output, issues, success } = safeParse(
            loginRequestSchema,
            requestBody,
        );
        if (!success) {
            logger.log("/token/ endpoint issues: ", issues);
            return HttpResponse.json(
                { error: "Invalid request body" },
                { status: 400 },
            );
        }

        if (
            usersDb.users.some(
                (user) =>
                    user.username === output.username &&
                    user.password === output.password,
            )
        ) {
            return HttpResponse.json(
                {
                    access: "access_token",
                    refresh: "refresh_token",
                    user: usersDb.users.find(
                        (user) => user.username === output.username,
                    ),
                },
                { status: 200 },
            );
        } else {
            return HttpResponse.json(
                { error: "Invalid credentials" },
                { status: 401 },
            );
        }
    }),
    http.post(`${BASE_URL}/register/`, async ({ request }) => {
        const requestBody = await request.json();
        const { output, issues, success } = safeParse(
            registerRequestSchema,
            requestBody,
        );
        if (!success) {
            logger.error("/register/ endpoint issues: ", issues);
            return HttpResponse.json(
                { error: "Invalid request body" },
                { status: 400 },
            );
        }
        if (usersDb.users.some((user) => user.username === output.username)) {
            return HttpResponse.json(
                { error: "Username is already taken" },
                { status: 400 },
            );
        }

        if (usersDb.users.some((user) => user.email === output.email)) {
            return HttpResponse.json(
                { error: "Email is already taken" },
                { status: 400 },
            );
        }

        usersDb.users.push(output);

        return HttpResponse.json(
            {
                access: "access_token",
                refresh: "refresh_token",
            },
            { status: 200 },
        );
    }),
];
