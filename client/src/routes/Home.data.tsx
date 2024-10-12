import { number, object, parse, string } from "valibot";
import { useToastStore } from "../store";

const userSchema = object({
    id: number(),
    username: string(),
    email: string(),
});

export const homeLoader = () => {
    const user =
        localStorage.getObject("turquiz_app_user") ||
        sessionStorage.getObject("turquiz_app_user");

    if (!user) {
        useToastStore.getState().add(
            {
                id: Math.random().toString(),
                type: "info",
                data: {
                    message: "You are not logged in",
                    description:
                        "You can still browse Turquiz, but you need to login to engage with the platform",
                },
            },
            10000,
        );
        return { logged_in: false } as const;
    }

    const parsedUser = parse(userSchema, user);

    return { logged_in: true, user: parsedUser } as const;
};
