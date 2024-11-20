import Cookies from "js-cookie";
import { LoaderFunction, redirect } from "react-router-typesafe";
import { USER } from "../../constants";
import { useToastStore } from "../../store";

export const logoutLoader = (() => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");

    sessionStorage.removeItem(USER);
    localStorage.removeItem(USER);

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
