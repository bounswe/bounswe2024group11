import { RiArrowLeftSLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import { buttonClass } from "../../components/button";

export const NewForumHead = () => {
    return (
        <header className="grid grid-cols-12 items-start self-stretch">
            <div className="col-span-2 flex">
                <Link
                    to="/forum"
                    className={buttonClass({
                        intent: "tertiary",
                        icon: "left",
                    })}
                    aria-label="Back to forum"
                >
                    <RiArrowLeftSLine
                        size={18}
                        className="text-slate-700"
                        aria-hidden="true"
                    />
                    <span>Back to forum</span>
                </Link>
            </div>
            <div className="col-span-8 flex flex-1 flex-col items-center gap-4">
                <figure
                    className="flex flex-col items-center gap-2"
                    role="img"
                    aria-label="Create a new forum question illustration"
                >
                    <svg
                        width="128"
                        height="128"
                        viewBox="0 0 94 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        strokeWidth="1px"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <g
                            className="text-cyan-600"
                            stroke="currentColor"
                            strokeWidth="1"
                        >
                            <path d="M31.8799 49.0599L33.2299 48.38C32.7399 48.5 32.2899 48.7199 31.8799 49.0599Z" />
                            <path d="M31.8799 49.0599L33.2299 48.38C32.7399 48.5 32.2899 48.7199 31.8799 49.0599Z" />
                            <path d="M69.1697 49.72L49.8397 30.24L36.8597 17.16L22.2197 15L2.21973 12.0599V42.37C2.21973 54.96 5.47971 68.29 12.0197 82.37C18.5497 96.46 26.8297 107.84 36.8597 116.53C43.5397 118.46 49.4497 118.29 54.5797 116.03L54.7097 115.96C55.2697 115.72 55.8097 115.45 56.3497 115.14C58.2497 114.09 60.0297 112.73 61.6997 111.06C62.6997 110.06 63.6297 108.98 64.4597 107.84C69.1597 101.52 71.4997 93.03 71.4997 82.37V52.0599L69.1697 49.72ZM41.4097 89.09C41.4097 90.5 40.9597 91.46 40.0497 91.98C39.1497 92.49 38.0897 92.3999 36.8597 91.6899C35.6297 90.9799 34.5697 89.85 33.6697 88.29C32.7597 86.73 32.3097 85.25 32.3097 83.84C32.3097 82.43 32.7597 81.48 33.6697 80.96C34.4697 80.51 35.3997 80.53 36.4597 81.04C36.5897 81.1 36.7197 81.17 36.8597 81.25C38.0897 81.96 39.1497 83.09 40.0497 84.65C40.9397 86.18 41.3897 87.63 41.4097 89.01V89.09ZM47.9597 66.79C47.0497 68.01 45.9897 68.97 44.7597 69.67C44.1897 70 43.5897 70.31 42.9797 70.62C42.3597 70.93 41.7997 71.35 41.2997 71.89C41.0097 72.22 40.7897 72.6099 40.6497 73.0699C40.4997 73.5199 40.3997 74.0199 40.3197 74.5599C40.3197 75.5499 39.9797 76.2199 39.2997 76.5699C38.6097 76.9199 37.8297 76.85 36.9697 76.35C36.0297 75.8 35.2497 74.98 34.6397 73.88C34.0297 72.79 33.7197 71.7 33.7197 70.62C33.7197 69.79 33.7897 69.01 33.9397 68.26C34.0797 67.52 34.3297 66.92 34.6997 66.46C35.2697 65.72 35.9597 65.14 36.7497 64.73C37.5497 64.32 38.3397 63.8899 39.1297 63.4399C40.0697 62.9799 40.9197 62.38 41.6797 61.61C42.4397 60.85 42.8097 59.76 42.8097 58.36C42.8097 56.7 42.2197 54.99 41.0297 53.22C39.8397 51.46 38.4497 50.12 36.8597 49.2C35.8497 48.62 34.9297 48.32 34.0997 48.29C33.8097 48.29 33.5097 48.31 33.2497 48.38H33.2297L31.8797 49.0599C31.2997 49.4699 30.6197 49.6799 29.8197 49.6799C29.0297 49.6699 28.2397 49.23 27.4397 48.36C26.5797 47.45 25.9797 46.44 25.6597 45.34C25.3297 44.25 25.3897 43.37 25.8197 42.7C26.9697 41.14 28.5197 40.29 30.4697 40.17C32.4197 40.06 34.5497 40.67 36.8597 42C38.1697 42.76 39.4097 43.66 40.5897 44.7C42.3997 46.31 44.0597 48.2699 45.5697 50.5699C47.3097 53.2299 48.4497 55.85 48.9697 58.47C49.1997 59.61 49.3097 60.73 49.3097 61.86C49.3097 63.93 48.8597 65.57 47.9597 66.79Z" />
                            <path d="M41.4096 89.01V89.09C41.4096 90.5 40.9596 91.46 40.0496 91.98C39.1496 92.49 38.0896 92.4 36.8596 91.69C35.6296 90.98 34.5696 89.8501 33.6696 88.2901C32.7596 86.7301 32.3096 85.25 32.3096 83.84C32.3096 82.43 32.7596 81.48 33.6696 80.96C34.4696 80.51 35.3996 80.5301 36.4596 81.0401C36.5896 81.1001 36.7196 81.17 36.8596 81.25C38.0896 81.96 39.1496 83.09 40.0496 84.65C40.9396 86.18 41.3896 87.63 41.4096 89.01Z" />
                            <path d="M49.3097 61.86C49.3097 63.93 48.8597 65.57 47.9597 66.79C47.0497 68.01 45.9897 68.97 44.7597 69.67C44.1897 70 43.5897 70.31 42.9797 70.62C42.3597 70.93 41.7997 71.35 41.2997 71.89C41.0097 72.22 40.7897 72.6099 40.6497 73.0699C40.4997 73.5199 40.3997 74.0199 40.3197 74.5599C40.3197 75.5499 39.9797 76.2199 39.2997 76.5699C38.6097 76.9199 37.8297 76.85 36.9697 76.35C36.0297 75.8 35.2497 74.98 34.6397 73.88C34.0297 72.79 33.7197 71.7 33.7197 70.62C33.7197 69.79 33.7897 69.01 33.9397 68.26C34.0797 67.52 34.3297 66.92 34.6997 66.46C35.2697 65.72 35.9597 65.14 36.7497 64.73C37.5497 64.32 38.3397 63.8899 39.1297 63.4399L48.9697 58.48C49.1997 59.61 49.3097 60.73 49.3097 61.86Z" />
                            <path d="M40.5897 44.7L33.2497 48.38H33.2297C32.7397 48.5 32.2897 48.72 31.8797 49.06C31.2997 49.47 30.6197 49.68 29.8197 49.68C29.0297 49.67 28.2397 49.23 27.4397 48.36C26.5797 47.45 25.9797 46.44 25.6597 45.34C25.3297 44.25 25.3897 43.37 25.8197 42.7C26.9697 41.14 28.5197 40.2901 30.4697 40.1701C32.4197 40.0601 34.5497 40.67 36.8597 42C38.1697 42.76 39.4097 43.66 40.5897 44.7Z" />
                            <path d="M48.9695 58.47L39.1295 63.4399C40.0695 62.9799 40.9195 62.38 41.6795 61.61C42.4395 60.85 42.8095 59.76 42.8095 58.36C42.8095 56.7 42.2195 54.99 41.0295 53.22C39.8395 51.46 38.4496 50.12 36.8596 49.2C35.8496 48.62 34.9295 48.32 34.0995 48.29C33.8095 48.29 33.5095 48.31 33.2495 48.38L40.5895 44.7C42.3995 46.31 44.0595 48.2699 45.5695 50.5699C47.3095 53.2299 48.4495 55.85 48.9695 58.47Z" />
                            <path d="M91.4998 42.0599L71.4998 52.0599L69.1699 49.72L49.8398 30.24L36.8599 17.16L56.8599 7.16003L91.4998 42.0599Z" />
                            <path d="M56.8597 7.16003L36.8597 17.16L22.2197 15L2.21973 12.0599L22.2197 2.05994L56.8597 7.16003Z" />
                            <path d="M91.4996 42.0599V72.37C91.4996 84.96 88.2396 94.5199 81.6996 101.06C79.8096 102.95 77.7596 104.45 75.5696 105.55L75.2596 105.7L56.3496 115.14C58.2496 114.09 60.0296 112.73 61.6996 111.06C62.6996 110.06 63.6296 108.98 64.4596 107.84C69.1596 101.52 71.4996 93.03 71.4996 82.37V52.0599L91.4996 42.0599Z" />
                            <path d="M54.7096 115.96L54.5796 116.03" />
                        </g>
                    </svg>
                </figure>
                <div className="flex flex-col items-center gap-2">
                    <h1
                        className="text-center text-2xl font-semibold"
                        id="page-title"
                    >
                        Create a new forum question
                    </h1>
                    <p className="text-slate-500" id="page-description">
                        Create a new forum question to discuss topics and engage
                        with the community.
                    </p>
                </div>
            </div>
        </header>
    );
};