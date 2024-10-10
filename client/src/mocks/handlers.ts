import { http, HttpResponse } from "msw";
import { joinUrl } from "../utils";

export const handlers = [
    http.get(joinUrl("user/john-maverick"), ({ request }) => {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        return HttpResponse.json({
            id,
            firstName: "John",
            lastName: "Maverick",
        });
    }),
];
