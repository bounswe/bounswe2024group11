import { safeParse } from "valibot";
import { USER } from "../../constants";
import { userSchema } from "../../schemas";
import { useToastStore } from "../../store";

export const homeLoader = () => {
    const user = sessionStorage.getObject(USER) || localStorage.getObject(USER);
    const { output, success } = safeParse(userSchema, user);
    if (!success) {
        useToastStore.getState().add({
            id: "not-logged-in",
            type: "info",
            data: {
                message: "You are not logged in",
                description:
                    "You can still browse Turquiz, but you need to login to engage with the platform.",
            },
        });
        return { logged_in: false } as const;
    }

    return { logged_in: true, user: output } as const;
};
