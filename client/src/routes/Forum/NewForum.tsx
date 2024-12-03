import { Button } from "@ariakit/react";
import { RiArrowLeftSLine, RiCloseFill } from "@remixicon/react";
import { cva } from "cva";
import { useEffect, useState } from "react";
import { Form, Link, useSearchParams } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { inputClass, labelClass } from "../../components/input";
import { debounce } from "../../utils";
import { forumCreateLoader } from "./Forum.data";
import { Tag } from "./Forum.schema";
import { RelevantQuiz } from "./RelevantQuizQuestion";

const tagOptionClass = cva(
    [
        "flex",
        "flex-col",
        "items-start",
        "rounded-2",
        "px-3",
        "py-2",
        "text-xs",
        "font-medium",
        "cursor-pointer",
        "transition-colors",
    ],
    {
        variants: {
            selected: {
                true: "bg-cyan-700 text-white",
                false: "bg-slate-100 text-slate-900 hover:bg-cyan-100",
            },
        },
        defaultVariants: {
            selected: false,
        },
    },
);

export const NewForum = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const relevant_quiz_id = searchParams.get("qid");
    const initialTagQuery = searchParams.get("word") || "";
    const [tagQuery, setTagQuery] = useState(initialTagQuery);
    const language = searchParams.get("lang") || "en";
    const data = useLoaderData<typeof forumCreateLoader>() ?? {
        dictionary: undefined,
        relevantQuiz: null,
    };

    const nounOptions: Tag[] =
        data.dictionary?.NOUN?.map((word) => {
            return {
                name: data.queryWord,
                linked_data_id: word.id,
                description: word.description,
            };
        }) || [];
    const verbOptions: Tag[] =
        data.dictionary?.VERB?.map((word) => {
            return {
                name: data.queryWord,
                linked_data_id: word.id,
                description: word.description,
            };
        }) || [];
    const adjectiveOptions: Tag[] =
        data.dictionary?.ADJ?.map((word) => {
            return {
                name: data.queryWord,
                linked_data_id: word.id,
                description: word.description,
            };
        }) || [];
    const adverbOptions: Tag[] =
        data.dictionary?.ADV?.map((word) => {
            return {
                name: data.queryWord,
                linked_data_id: word.id,
                description: word.description,
            };
        }) || [];

    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const handleTagClick = (tag: Tag) => {
        const isSelected = selectedTags.some(
            (t) => t.linked_data_id === tag.linked_data_id,
        );

        if (isSelected) {
            setSelectedTags(
                selectedTags.filter(
                    (t) => t.linked_data_id !== tag.linked_data_id,
                ),
            );
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleTagRemove = (tagToRemove: Tag) => {
        setSelectedTags(
            selectedTags.filter(
                (tag) => tag.linked_data_id !== tagToRemove.linked_data_id,
            ),
        );
    };

    const handleQuizRemoval = () => {
        setSearchParams((prev) => {
            prev.delete("qid");
            return prev;
        });
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("lang", e.target.value);
        setSearchParams(newParams);
    };

    useEffect(() => {
        const debouncedSearch = debounce((query) => {
            setSearchParams((prev) => {
                if (query) {
                    prev.set("word", query);
                } else {
                    prev.delete("word");
                }
                return prev;
            });
        }, 500);

        debouncedSearch(tagQuery);
        return () => debouncedSearch.cancel();
    }, [tagQuery, setSearchParams]);

    return (
        <div
            className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12"
            role="main"
        >
            <main className="flex flex-col items-center gap-12">
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
                                Create a new forum question to discuss topics
                                and engage with the community.
                            </p>
                        </div>
                    </div>
                </header>
                <Form
                    aria-labelledby="page-title"
                    aria-describedby="page-description"
                    className="flex w-full max-w-screen-sm flex-col gap-4"
                    method="POST"
                    role="form"
                >
                    <input
                        hidden
                        name="tags"
                        value={JSON.stringify(selectedTags)}
                        readOnly
                        aria-hidden="true"
                    />
                    <div className="flex w-full flex-col gap-6">
                        <label className={labelClass()}>
                            <span id="title-label">Title</span>
                            <input
                                aria-labelledby="title-label"
                                type="text"
                                name="title"
                                placeholder="How do you pronounce 'turquiz'?"
                                className={inputClass({ class: "text-sm" })}
                                required
                                maxLength={100}
                                minLength={1}
                                defaultValue={searchParams.get("title") || ""}
                            />
                        </label>
                        <label className={labelClass()}>
                            <span id="question-label">Question Details</span>
                            <textarea
                                name="question"
                                aria-labelledby="question-label"
                                placeholder="I have been wondering how to pronounce 'turquiz' for a while now. Can someone help me out?"
                                className={inputClass()}
                                required
                                maxLength={1000}
                                minLength={1}
                                rows={4}
                                defaultValue={
                                    searchParams.get("question") || ""
                                }
                            />
                        </label>
                        {data.relevantQuiz && (
                            <div
                                className="flex flex-col gap-2"
                                role="region"
                                aria-label="Relevant Quiz"
                            >
                                <input
                                    hidden
                                    name="quiz_question_id"
                                    value={data.relevantQuiz.question.id}
                                    readOnly
                                    aria-hidden="true"
                                />
                                <span className={labelClass()}>
                                    Relevant Quiz Question
                                </span>
                                <RelevantQuiz
                                    quizType={data.relevantQuiz.type}
                                    onQuizRemoval={handleQuizRemoval}
                                    quizQuestion={data.relevantQuiz.question}
                                />
                            </div>
                        )}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-end justify-between gap-4">
                                <label
                                    className={labelClass({
                                        className: "relative flex-1",
                                    })}
                                >
                                    <span id="tag-search-label">
                                        Search Tags
                                    </span>
                                    <input
                                        type="text"
                                        value={tagQuery}
                                        onChange={(e) =>
                                            setTagQuery(e.target.value)
                                        }
                                        placeholder="Search for tags..."
                                        className={inputClass({
                                            className: "pr-20",
                                        })}
                                        maxLength={100}
                                        minLength={1}
                                        aria-labelledby="tag-search-label"
                                    />
                                </label>
                                <div
                                    className="flex gap-1 rounded-full bg-slate-50 p-1 ring ring-slate-200"
                                    role="radiogroup"
                                    aria-label="Select language"
                                >
                                    {(["en", "tr"] as const).map((option) => (
                                        <label
                                            key={option}
                                            className="flex cursor-pointer items-center gap-2"
                                        >
                                            <input
                                                type="radio"
                                                value={option}
                                                checked={language === option}
                                                onChange={handleLanguageChange}
                                                className="sr-only"
                                                aria-label={
                                                    option === "en"
                                                        ? "English"
                                                        : "Turkish"
                                                }
                                            />
                                            <span
                                                className={`min-w-12 rounded-full px-4 py-1.5 text-center text-sm transition-all ${
                                                    language === option
                                                        ? "bg-cyan-900 text-white"
                                                        : "bg-slate-50 text-slate-900 hover:bg-slate-200"
                                                }`}
                                            >
                                                {option === "en" && "EN"}
                                                {option === "tr" && "TR"}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div
                                className="flex flex-wrap gap-2"
                                role="region"
                                aria-label="Selected tags"
                            >
                                {selectedTags.map((tag) => (
                                    <div
                                        key={tag.linked_data_id}
                                        className="flex items-center gap-1 rounded-2 bg-cyan-700 py-0.5 pl-3 pr-1 text-sm font-medium text-white"
                                    >
                                        <span>{tag.name}</span>
                                        <Button
                                            className="rounded-full p-2 text-white transition-all hover:bg-cyan-800 hover:text-cyan-100"
                                            onClick={() => handleTagRemove(tag)}
                                            aria-label={`Remove ${tag.name} tag`}
                                        >
                                            <RiCloseFill
                                                size={16}
                                                aria-hidden="true"
                                            />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            {[
                                { title: "Nouns", options: nounOptions },
                                {
                                    title: "Adjectives",
                                    options: adjectiveOptions,
                                },
                                { title: "Adverbs", options: adverbOptions },
                                { title: "Verbs", options: verbOptions },
                            ].map(({ title, options }) => {
                                if (options.length === 0) return null;
                                return (
                                    <div
                                        key={title}
                                        className="flex flex-col gap-3 rounded-2 p-2 ring-1 ring-slate-200"
                                    >
                                        <span className="text-sm font-medium">
                                            {title}
                                        </span>
                                        <div
                                            className="flex max-h-48 flex-col gap-2 overflow-auto"
                                            role="listbox"
                                            aria-label={`Available ${title.toLowerCase()}`}
                                        >
                                            {options.map((tag) => (
                                                <div
                                                    key={tag.linked_data_id}
                                                    onClick={() =>
                                                        handleTagClick(tag)
                                                    }
                                                    className={tagOptionClass({
                                                        selected:
                                                            selectedTags.some(
                                                                (t) =>
                                                                    t.linked_data_id ===
                                                                    tag.linked_data_id,
                                                            ),
                                                    })}
                                                    role="option"
                                                    aria-selected={selectedTags.some(
                                                        (t) =>
                                                            t.linked_data_id ===
                                                            tag.linked_data_id,
                                                    )}
                                                    tabIndex={0}
                                                >
                                                    <span className="text-base font-medium">
                                                        {tag.name}
                                                    </span>
                                                    <span className="text-xs opacity-80">
                                                        {tag.description}
                                                    </span>
                                                </div>
                                            ))}
                                            {options.length === 0 && (
                                                <span className="text-xs text-slate-500">
                                                    No {title.toLowerCase()}{" "}
                                                    found.
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <button
                            type="submit"
                            className={buttonClass({ intent: "primary" })}
                            aria-label="Create forum post"
                        >
                            <div
                                className={buttonInnerRing({
                                    intent: "primary",
                                })}
                                aria-hidden="true"
                            />
                            <span>Post</span>
                        </button>
                    </div>
                </Form>
            </main>
        </div>
    );
};
