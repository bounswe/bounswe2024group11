import { number, object, parse, string } from "valibot";

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
        return { logged_in: false } as const;
    }

    const parsedUser = parse(userSchema, user);

    return { logged_in: true, user: parsedUser } as const;
};
