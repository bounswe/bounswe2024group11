import { http, HttpResponse } from "msw";
import { BASE_URL } from "../utils";

interface LoginRequestBody {
    username: string;
    password: string;
}
const isLoginRequestBody = (body: unknown): body is LoginRequestBody =>
    typeof body === "object" &&
    body !== null &&
    "username" in body &&
    "password" in body &&
    typeof (body as LoginRequestBody).username === "string" &&
    typeof (body as LoginRequestBody).password === "string";

export const handlers = [
    http.get(`${BASE_URL}/user/john-maverick`, ({ request }) => {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        return HttpResponse.json({
            id,
            firstName: "John",
            lastName: "Maverick",
        });
    }),

    http.post(`${BASE_URL}/api/v2/login`, async ({ request }) => {
        try {
            const requestBody = await request.json();
            if (!isLoginRequestBody(requestBody)) {
                return HttpResponse.json(
                    { error: "Invalid request body structure" },
                    { status: 400 },
                );
            }

            if (
                requestBody.username === "hasan" &&
                requestBody.password === "umitcan"
            ) {
                return HttpResponse.json(
                    {
                        token: "mocked-jwt-token",
                        user: {
                            id: 1,
                            username: "hasan",
                            email: "hasan@example.com",
                        },
                    },
                    { status: 200 },
                );
            } else {
                return HttpResponse.json(
                    { error: "Invalid credentials" },
                    { status: 401 },
                );
            }
        } catch (error) {
            return HttpResponse.json(
                { error: "Invalid JSON in request body" },
                { status: 400 },
            );
        }
    }),
];
