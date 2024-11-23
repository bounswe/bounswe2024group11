import { safeParse } from "valibot";
import { USER } from "../../constants";
import { userSchema } from "../../schemas";

export const homeLoader = () => {
    const user = sessionStorage.getObject(USER) || localStorage.getObject(USER);
    const { output, success } = safeParse(userSchema, user);
    if (!success) {
        return { logged_in: false } as const;
    }

    return { logged_in: true, user: output } as const;
};
