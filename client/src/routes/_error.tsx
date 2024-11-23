import { useRouteError } from "react-router";
import { Link } from "react-router-dom";
import { buttonClass, buttonInnerRing } from "../components/button";
import { logger } from "../utils";

export const ErrorPage = () => {
    const error = useRouteError();
    logger.error(error);
    const errorMessage =
        typeof error == "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message == "string"
            ? error.message
            : "An unexpected error has occurred.";
    return (
        <main id="error-page" role="main" aria-labelledby="error-heading">
            <div
                className="flex flex-col items-center gap-4 px-4 py-10"
                role="alert"
                aria-live="polite"
            >
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-2xl font-semibold" tabIndex={-1}>
                        An error occurred on our side.
                    </h1>
                    <p tabIndex={-1} id="error-heading">
                        {errorMessage}
                    </p>
                </div>
                <Link
                    className={buttonClass({ intent: "primary" })}
                    to="/"
                    role="button"
                    aria-label="Return to Home Page"
                >
                    <span
                        className={buttonInnerRing({ intent: "primary" })}
                        aria-hidden="true"
                    />
                    Home Page
                </Link>
            </div>
        </main>
    );
};
