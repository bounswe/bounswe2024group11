import { useRouteError } from "react-router";
import { Link } from "react-router-dom";
import { buttonClass, buttonInnerRing } from "../components/button";

export const ErrorPage = () => {
    const error = useRouteError();
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
                    <h1
                        id="error-heading"
                        className="text-2xl font-semibold"
                        tabIndex={-1}
                    >
                        {errorMessage}
                    </h1>
                    <p>Sorry, it's not you, it's us:</p>
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
