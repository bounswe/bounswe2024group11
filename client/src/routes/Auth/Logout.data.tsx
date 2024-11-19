import { LoaderFunction, redirect } from "react-router";
import { USER, USER_TOKEN_ACCESS, USER_TOKEN_REFRESH } from "../../constants";
import { useToastStore } from "../../store";

export const logoutLoader = (() => {
    localStorage.removeItem(USER_TOKEN_ACCESS);
    localStorage.removeItem(USER_TOKEN_REFRESH);
    localStorage.removeItem(USER);
    sessionStorage.removeItem(USER_TOKEN_ACCESS);
    sessionStorage.removeItem(USER_TOKEN_REFRESH);
    sessionStorage.removeItem(USER);
    useToastStore.getState().add({
        id: "logout-success",
        type: "info",
        data: {
            message: "Goodbye friend!",
            description:
                "No this is not the end, lift up your head. Somewhere we'll meet again.",
        },
    });
    return redirect("/login");
}) satisfies LoaderFunction;
