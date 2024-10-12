import { LoaderFunction, redirect } from "react-router";

export const logoutLoader = (() => {
    localStorage.removeItem("turquiz_app_token");
    localStorage.removeItem("turquiz_app_user");
    sessionStorage.removeItem("turquiz_app_token");
    sessionStorage.removeItem("turquiz_app_user");
    return redirect("/login");
}) satisfies LoaderFunction;
