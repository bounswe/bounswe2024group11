import { Button } from "@ariakit/react";
import { RiArrowLeftSLine, RiCloseFill } from "@remixicon/react";
import { cva } from "cva";
import { useEffect, useState } from "react";
import { Form, Link, useSearchParams } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { inputClass, labelClass } from "../../components/input";
import { debounce } from "../../utils";
import { QuizQuestion } from "../Quiz/Quiz.schema";
import { forumCreateLoader } from "./Forum.data";
import { Tag } from "./Forum.schema";
import { RelevantQuiz } from "./RelevantQuizQuestion";

const tagOptionClass = cva(
    [
        "flex",
        "flex-col",
        "items-start",
        "rounded-2",
        "px-4",
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
                false: "bg-cyan-50 text-cyan-900 hover:bg-cyan-100",
            },
            disabled: {
                true: "cursor-not-allowed opacity-50",
                false: "",
            },
        },
        defaultVariants: {
            selected: false,
            disabled: false,
        },
    },
);

export const NewForum = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const relevant_quiz_id = searchParams.get("quiz_id");
    const [tagQuery, setTagQuery] = useState(searchParams.get("word") || "");
    const data = useLoaderData<typeof forumCreateLoader>() ?? {
        dictionary: undefined,
    };

    const nounOptions: Tag[] =
        data.dictionary?.NOUN?.map((word) => {
            return {
                name: tagQuery,
                linked_data_id: word.id,
                description: word.description,
            };
        }) || [];
    const verbOptions: Tag[] =
        data.dictionary?.VERB?.map((word) => {
            return {
                name: tagQuery,
                linked_data_id: word.id,
                description: word.description,
            };
        }) || [];
    const adjectiveOptions: Tag[] =
        data.dictionary?.ADJ?.map((word) => {
            return {
                name: tagQuery,
                linked_data_id: word.id,
                description: word.description,
            };
        }) || [];
    const adverbOptions: Tag[] =
        data.dictionary?.ADV?.map((word) => {
            return {
                name: tagQuery,
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

    const relevant_quiz: QuizQuestion = {
        id: Number(relevant_quiz_id),
        question_text: "What is the Turkish translation of 'turquiz'?",
        choices: [
            {
                id: 1,
                is_correct: true,
                choice_text: "turkuaz",
            },
            {
                id: 2,
                is_correct: false,
                choice_text: "türkü",
            },
            {
                id: 3,
                is_correct: false,
                choice_text: "kalem",
            },
            {
                id: 4,
                is_correct: false,
                choice_text: "araba",
            },
        ],
        hints: [],
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
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
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
                            />
                            <span>Back to forum</span>
                        </Link>
                    </div>
                    <div className="col-span-8 flex flex-1 flex-col items-center gap-4">
                        <figure className="flex flex-col items-center gap-2">
                            <svg
                                width="128"
                                height="128"
                                viewBox="0 0 94 120"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                strokeWidth="1px"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <title>Create a new forum question</title>
                                <g
                                    strokeWidth="1px"
                                    stroke="currentColor"
                                    className="text-cyan-600"
                                >
                                    <path d="M91.2799 42V72.3099C91.2799 84.8899 88.0199 94.46 81.4799 101C79.3999 103.08 77.1499 104.68 74.7199 105.8L74.6299 105.84L55.9199 115.21C57.8999 114.14 59.7499 112.73 61.4799 111C62.4799 110 63.4099 108.92 64.2399 107.78C68.9399 101.46 71.2799 92.9599 71.2799 82.3099V52L91.2799 42Z" />
                                    <path d="M68.96 49.66L49.63 30.1799L36.64 17.09L22 14.9399L2 12V42.3099C2 54.8899 5.26 68.2299 11.8 82.3099C18.33 96.3899 26.61 107.78 36.64 116.47C43.59 118.47 49.7 118.21 54.97 115.69L55.92 115.21C57.9 114.14 59.75 112.73 61.48 111C62.48 110 63.41 108.92 64.24 107.78C68.94 101.46 71.28 92.9599 71.28 82.3099V52L68.96 49.66ZM41.19 89.03C41.19 90.44 40.74 91.4 39.83 91.91C38.93 92.43 37.87 92.33 36.64 91.62C35.41 90.91 34.35 89.78 33.45 88.23C32.54 86.67 32.09 85.19 32.09 83.78C32.09 82.37 32.54 81.41 33.45 80.9C34.25 80.44 35.18 80.47 36.24 80.98C36.37 81.04 36.5 81.1099 36.64 81.1899C37.87 81.8999 38.93 83.03 39.83 84.59C40.72 86.11 41.17 87.56 41.19 88.95V89.03ZM47.74 66.73C47.74 66.73 47.69 66.8 47.66 66.83C46.77 67.99 45.74 68.92 44.54 69.6C43.75 69.97 42.99 70.34 42.27 70.71C41.55 71.08 40.97 71.72 40.54 72.63C40.18 73.25 40 74.0199 40 74.9299V77.66L33.5 73.91V70C33.5 68.71 33.75 67.64 34.26 66.77C34.76 65.82 35.45 65.12 36.32 64.67C37.18 64.21 38.05 63.78 38.91 63.37C39.85 62.92 40.7 62.31 41.46 61.55C42.22 60.78 42.59 59.7 42.59 58.29C42.59 56.64 42 54.93 40.81 53.16C39.62 51.4 38.23 50.06 36.64 49.14C35.12 48.26 33.77 48.06 32.58 48.54C31.39 49.01 30.58 49.95 30.14 51.35L24.3 45.24C25.09 42.56 26.63 40.9199 28.9 40.3199C30.35 39.9399 31.93 40.0299 33.63 40.5699H33.64C34.6 40.8799 35.59 41.3399 36.64 41.9399C37.95 42.6999 39.19 43.6 40.37 44.64C42.18 46.25 43.84 48.21 45.35 50.51C47.1 53.17 48.23 55.82 48.75 58.45C48.98 59.57 49.09 60.68 49.09 61.79C49.09 63.86 48.64 65.51 47.74 66.73Z" />
                                    <path d="M41.1898 88.9499V89.03C41.1898 90.44 40.7398 91.4 39.8298 91.91C38.9298 92.43 37.8698 92.33 36.6398 91.62C35.4098 90.91 34.3498 89.78 33.4498 88.23C32.5398 86.67 32.0898 85.19 32.0898 83.78C32.0898 82.37 32.5398 81.41 33.4498 80.9C34.2498 80.44 35.1798 80.47 36.2398 80.98C36.3698 81.04 36.4998 81.1099 36.6398 81.1899C37.8698 81.8999 38.9298 83.03 39.8298 84.59C40.7198 86.11 41.1698 87.5599 41.1898 88.9499Z" />
                                    <path d="M47.66 66.83C46.77 67.99 45.74 68.92 44.54 69.6C43.75 69.97 42.99 70.34 42.27 70.71C41.55 71.08 40.97 71.72 40.54 72.63C40.18 73.25 40 74.0199 40 74.9299V77.66L33.5 73.91L47.66 66.83Z" />
                                    <path d="M49.0802 61.79C49.0802 63.86 48.6302 65.51 47.7302 66.73C47.7002 66.76 47.6802 66.8 47.6502 66.83L33.4902 73.91V70C33.4902 68.71 33.7402 67.64 34.2502 66.77C34.7502 65.82 35.4402 65.12 36.3102 64.67C37.1702 64.21 38.0402 63.78 38.9002 63.37L48.7402 58.45C48.9702 59.57 49.0802 60.68 49.0802 61.79Z" />
                                    <path d="M33.62 40.5699L24.29 45.2399C25.08 42.5599 26.62 40.9199 28.89 40.3199C30.34 39.9399 31.92 40.0299 33.62 40.5699Z" />
                                    <path d="M40.3698 44.64L32.5798 48.54C31.3898 49.01 30.5798 49.95 30.1398 51.35L24.2998 45.24L33.6298 40.5699H33.6398C34.5998 40.8799 35.5898 41.3399 36.6398 41.9399C37.9498 42.6999 39.1898 43.6 40.3698 44.64Z" />
                                    <path d="M41.4601 61.55C42.2201 60.78 42.5901 59.7 42.5901 58.29C42.5901 56.64 42.0001 54.93 40.8101 53.16C39.6201 51.4 38.2301 50.06 36.6401 49.14C35.1201 48.26 33.7701 48.06 32.5801 48.54L40.3701 44.64C42.1801 46.25 43.8401 48.21 45.3501 50.51C47.1001 53.17 48.2301 55.82 48.7501 58.45L38.9101 63.37C39.8501 62.92 40.7001 62.31 41.4601 61.55Z" />
                                    <path d="M56.64 7.08997L36.64 17.09L22 14.9399L2 12L22 2L56.64 7.08997Z" />
                                    <path d="M91.2801 42L71.2801 52L68.9601 49.66L49.6201 30.1799L36.6401 17.09L56.6401 7.08997L91.2801 42Z" />
                                    <path d="M75.4902 105.41L74.7202 105.8" />
                                </g>
                            </svg>
                        </figure>
                        <div className="flex flex-col items-center gap-2">
                            <h1 className="text-center text-2xl font-semibold">
                                Create a new forum question
                            </h1>
                            <p className="text-slate-500">
                                Create a new forum question to discuss topics
                                and engage with the community.
                            </p>
                        </div>
                    </div>
                </header>
                <Form
                    aria-labelledby="add-new-post"
                    className="flex w-full max-w-screen-sm flex-col gap-4"
                    method="POST"
                >
                    <input
                        hidden
                        name="tags"
                        value={JSON.stringify(selectedTags)}
                        readOnly
                    />
                    <div className="flex w-full flex-col gap-6">
                        <label className={labelClass()}>
                            <span>Title</span>
                            <input
                                aria-label="Title"
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
                            <span>Question Details</span>
                            <textarea
                                name="question"
                                aria-label="Question"
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
                        {relevant_quiz_id && (
                            <div className="flex flex-col gap-2">
                                <input
                                    hidden
                                    name="quiz_question_id"
                                    value={relevant_quiz_id}
                                />
                                <span className={labelClass()}>
                                    Relevant Quiz Question
                                </span>
                                <RelevantQuiz quizQuestion={relevant_quiz} />
                            </div>
                        )}
                        <label className={labelClass()}>
                            <span>Search Tags</span>
                            <input
                                type="text"
                                value={tagQuery}
                                onChange={(e) => setTagQuery(e.target.value)}
                                placeholder="Search for tags..."
                                className={inputClass()}
                                maxLength={100}
                                minLength={1}
                            />
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {selectedTags.map((tag) => (
                                <div
                                    key={tag.linked_data_id}
                                    className="flex items-center gap-2 rounded-2 bg-cyan-700 px-3 py-1.5 text-white"
                                >
                                    <span>{tag.name}</span>
                                    <Button
                                        className="text-white hover:text-cyan-100"
                                        onClick={() => handleTagRemove(tag)}
                                    >
                                        <RiCloseFill />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className={labelClass()}>Nouns</span>
                            <div className="flex max-h-48 flex-col gap-2 overflow-auto">
                                {nounOptions.map((tag) => (
                                    <div
                                        key={tag.linked_data_id}
                                        onClick={() => handleTagClick(tag)}
                                        className={tagOptionClass({
                                            selected: selectedTags.some(
                                                (t) =>
                                                    t.linked_data_id ===
                                                    tag.linked_data_id,
                                            ),
                                        })}
                                    >
                                        <span className="text-sm font-medium">
                                            {tag.name}
                                        </span>
                                        <span className="text-xs opacity-80">
                                            {tag.description}
                                        </span>
                                    </div>
                                ))}
                                {nounOptions.length === 0 && (
                                    <span className="text-xs text-slate-500">
                                        No nouns found.
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className={labelClass()}>Adjectives</span>
                            <div className="flex max-h-48 flex-col gap-2 overflow-auto">
                                {adjectiveOptions.map((tag) => (
                                    <div
                                        key={tag.linked_data_id}
                                        onClick={() => handleTagClick(tag)}
                                        className={tagOptionClass({
                                            selected: selectedTags.some(
                                                (t) =>
                                                    t.linked_data_id ===
                                                    tag.linked_data_id,
                                            ),
                                        })}
                                    >
                                        <span className="text-sm font-medium">
                                            {tag.name}
                                        </span>
                                        <span className="text-xs opacity-80">
                                            {tag.description}
                                        </span>
                                    </div>
                                ))}
                                {adjectiveOptions.length === 0 && (
                                    <span className="text-xs text-slate-500">
                                        No adjectives found.
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className={labelClass()}>Adverbs</span>
                            <div className="flex max-h-48 flex-col gap-2 overflow-auto">
                                {adverbOptions.map((tag) => (
                                    <div
                                        key={tag.linked_data_id}
                                        onClick={() => handleTagClick(tag)}
                                        className={tagOptionClass({
                                            selected: selectedTags.some(
                                                (t) =>
                                                    t.linked_data_id ===
                                                    tag.linked_data_id,
                                            ),
                                        })}
                                    >
                                        <span className="text-sm font-medium">
                                            {tag.name}
                                        </span>
                                        <span className="text-xs opacity-80">
                                            {tag.description}
                                        </span>
                                    </div>
                                ))}
                                {adverbOptions.length === 0 && (
                                    <span className="text-xs text-slate-500">
                                        No adverbs found.
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className={labelClass()}>Verbs</span>
                            <div className="flex max-h-48 flex-col gap-2 overflow-auto">
                                {verbOptions.map((tag) => (
                                    <div
                                        key={tag.linked_data_id}
                                        onClick={() => handleTagClick(tag)}
                                        className={tagOptionClass({
                                            selected: selectedTags.some(
                                                (t) =>
                                                    t.linked_data_id ===
                                                    tag.linked_data_id,
                                            ),
                                        })}
                                    >
                                        <span className="text-sm font-medium">
                                            {tag.name}
                                        </span>
                                        <span className="text-xs opacity-80">
                                            {tag.description}
                                        </span>
                                    </div>
                                ))}
                                {verbOptions.length === 0 && (
                                    <span className="text-xs text-slate-500">
                                        No verbs found.
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={buttonClass({ intent: "primary" })}
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
