import { useRouteError } from "react-router";

export const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
        </div>
    );
};
