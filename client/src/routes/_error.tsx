import { useRouteError } from "react-router";
import { logger } from "../utils";

export const ErrorPage = () => {
    const error = useRouteError();
    logger.error(error);
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
        </div>
    );
};
