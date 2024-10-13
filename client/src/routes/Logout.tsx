import { LoaderFunction, redirect } from "react-router";
import { USER, USER_TOKEN_ACCESS, USER_TOKEN_REFRESH } from "../constants";

export const logoutLoader = (() => {
    localStorage.removeItem(USER_TOKEN_ACCESS);
    localStorage.removeItem(USER_TOKEN_REFRESH);
    localStorage.removeItem(USER);
    sessionStorage.removeItem(USER_TOKEN_ACCESS);
    sessionStorage.removeItem(USER_TOKEN_REFRESH);
    sessionStorage.removeItem(USER);
    return redirect("/login");
}) satisfies LoaderFunction;
