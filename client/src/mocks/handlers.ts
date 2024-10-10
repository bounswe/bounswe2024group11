import { http, HttpResponse } from "msw";
import { BASE_URL } from "../utils";

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
];
