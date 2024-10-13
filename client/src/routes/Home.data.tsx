import { object, safeParse, string } from "valibot";
import { USER } from "../constants";
import { useToastStore } from "../store";

const userSchema = object({
    full_name: string(),
    username: string(),
    email: string(),
});

export const homeLoader = () => {
    const user = sessionStorage.getObject(USER) || localStorage.getObject(USER);
    const { output, issues, success } = safeParse(userSchema, user);

    if (!success) {
        console.error(issues);

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

    return { logged_in: true, user: output } as const;
};
