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
            : "";
    const errorMessage2 =
        typeof error == "object" &&
        error !== null &&
        "error" in error &&
        typeof error.error == "object" &&
        error.error !== null &&
        "message" in error.error &&
        typeof error.error.message == "string"
            ? error.error.message
            : "";
    return (
        <main id="error-page" role="main" aria-labelledby="error-heading">
            <div
                className="flex flex-col items-center gap-4 px-4 py-10"
                role="alert"
                aria-live="polite"
            >
                <div className="flex flex-col items-center gap-2">
                    <figure>
                        <svg
                            width="144"
                            height="144"
                            viewBox="0 0 122 114"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            strokeWidth="1px"
                            strokeLinecap="round"
                            stroke="currentColor"
                        >
                            <title>Error Illustration</title>
                            <g className="text-cyan-600">
                                <path d="M21.4251 23.49V66.36L12.0851 60.97V28.82L2.74512 23.43V12.71L21.4251 23.49Z" />
                                <path d="M41.4251 13.49L31.4751 18.47L21.4251 23.49L2.74512 12.71L22.7451 2.70996L41.4251 13.49Z" />
                                <path d="M33.8753 30.68V41.4L40.5053 45.23L33.8753 48.54V60.14L21.4253 66.36V23.49L31.4753 18.47L41.4253 13.49V26.91L33.8753 30.68Z" />
                                <path d="M43.215 61.0799V68.2199L61.895 79.0099V89.7299L33.875 73.5499V48.5399L41.425 52.8999L52.555 59.3299V52.1799L41.425 45.7599L40.505 45.2299L33.875 41.3999V30.6799L41.425 35.0399L50.455 40.2499L53.875 42.2299L61.895 46.8599V71.8599L49.845 64.9099L43.215 61.0799Z" />
                                <path d="M81.895 36.8599L71.955 41.8299L65.315 45.1499L61.895 46.8599L53.875 42.2299L50.455 40.2499L41.425 35.0399L33.875 30.6799L41.425 26.9099L53.875 20.6799L81.895 36.8599Z" />
                                <path d="M119.255 58.43L109.315 63.4L102.675 66.72L99.2554 68.43L97.4654 67.4L94.0454 65.42L81.8954 58.41L71.2354 52.25L81.8954 46.92L91.2354 42.25L119.255 58.43Z" />
                                <path d="M99.2554 68.43V111.29L71.2354 95.12V84.4L71.8454 84.75L89.9154 95.18V88.04L78.4854 81.44L77.8654 81.08L77.4654 80.85V73.71L81.8954 76.27L84.4954 77.77L89.9154 80.9V73.75L84.0954 70.39L81.8954 69.12L81.7954 69.06L75.1554 65.23L71.2354 62.97V52.25L81.8954 58.41L94.0454 65.42L97.4654 67.4L99.2554 68.43Z" />
                                <path d="M77.465 73.7101V80.8501L77.865 81.0801L71.235 84.4001V85.0601L61.895 89.7301V79.0101L71.945 73.9801L81.795 69.0601L81.895 69.1201V71.5001L77.465 73.7101Z" />
                                <path d="M52.555 52.18V59.33L41.425 52.9L33.875 48.54L40.505 45.23L41.425 45.76L52.555 52.18Z" />
                                <path d="M49.8453 64.9101L43.2153 68.2201V61.0801L49.8453 64.9101Z" />
                                <path d="M81.7953 69.0599L71.9453 73.9799L61.8953 79.0099L43.2153 68.2199L49.8453 64.9099L61.8953 71.8599L65.3053 70.1499L75.1553 65.2299L81.7953 69.0599Z" />
                                <path d="M71.235 52.2499V62.9699L75.155 65.2299L65.305 70.1499L61.895 71.8599V46.8599L65.315 45.1499L71.955 41.8299L81.895 36.8599V46.9199L71.235 52.2499Z" />
                                <path d="M119.255 58.4299V101.29L99.2549 111.29V68.4299L102.675 66.7199L109.315 63.3999L119.255 58.4299Z" />
                                <path d="M89.9154 88.0401V95.1801L71.8454 84.7501L71.2354 84.4001L77.8654 81.0801L78.4854 81.4401L89.9154 88.0401Z" />
                                <path d="M89.9153 73.7499V80.8999L84.4953 77.7699L81.8953 76.2699L77.4653 73.7099L81.8953 71.4999L84.0953 70.3899L89.9153 73.7499Z" />
                            </g>
                        </svg>
                    </figure>
                    <h1 className="text-2xl font-semibold" tabIndex={-1}>
                        An error occurred on our side.
                    </h1>
                    {errorMessage && (
                        <p tabIndex={-1} id="error-heading">
                            {errorMessage}
                        </p>
                    )}
                    {errorMessage2 && (
                        <p tabIndex={-1} id="error-heading">
                            {errorMessage2}
                        </p>
                    )}
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
