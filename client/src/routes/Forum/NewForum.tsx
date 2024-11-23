import { cva } from "cva";
import { useEffect, useState } from "react";
import { Form, useSearchParams } from "react-router-dom";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { inputClass, labelClass, optionClass } from "../../components/input";
import { debounce } from "../../utils";
import { QuizQuestion } from "../Quiz/Quiz.schema";

const uniqueTags = [
    {
        name: "animals",
        description: "Animals",
        linked_data_id: "bn:00012710n",
    },
    {
        name: "food",
        description: "Food",
        linked_data_id: "bn:00010360n",
    },
];

const relevantOptionClass = cva(
    [
        "flex",
        "items-center",
        "justify-center",
        "gap-2",
        "rounded-2",
        "p-2",
        "text-center",
        "text-xs",
        "ring-1",
        "ring-slate-200",
        "font-medium",
    ],
    {
        variants: {
            selected: {
                true: "bg-green-700 text-white",
                false: "bg-slate-100 text-slate-900",
            },
            disabled: {
                true: "cursor-not-allowed opacity-50",
                false: "",
            },
        },
    },
);

const RelevantQuiz = ({ quizQuestion }: { quizQuestion: QuizQuestion }) => {
    return (
        <div className="flex flex-col gap-4 rounded-4 bg-slate-100 p-4 text-sm ring-1 ring-slate-100">
            <span className={labelClass()}>{quizQuestion.question_text}</span>
            <div className="grid grid-cols-2 gap-2">
                {quizQuestion.choices.map((choice) => (
                    <div
                        key={choice.id}
                        className={relevantOptionClass({
                            selected: choice.is_correct,
                        })}
                    >
                        {choice.choice_text}
                        {choice.is_correct && (
                            <svg
                                className="text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width={16}
                                height={16}
                                fill="currentColor"
                            >
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path>
                            </svg>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const NewForum = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const relevant_quiz_id = searchParams.get("quiz_id");
    const [tagQuery, setTagQuery] = useState(
        searchParams.get("tag_query") || "",
    );
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
                    prev.set("tag_query", query);
                } else {
                    prev.delete("tag_query");
                }
                return prev;
            });
        }, 300);

        debouncedSearch(tagQuery);
        return () => debouncedSearch.cancel();
    }, [tagQuery, setSearchParams]);

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <main className="flex flex-col items-center">
                <Form
                    aria-labelledby="add-new-post"
                    className="flex w-full max-w-screen-sm flex-col gap-4"
                    method="POST"
                >
                    <h1 className="mb-4 text-2xl font-semibold">
                        Create a new forum question
                    </h1>
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
                        <div className="flex flex-col gap-2">
                            <label className={labelClass()} htmlFor="tags">
                                Select Tags
                                <select
                                    id="tags"
                                    name="tags"
                                    multiple
                                    className="flex flex-col gap-2 border-none p-0 ring-0 focus:border-none active:border-none"
                                    required
                                >
                                    {uniqueTags.map((tag) => (
                                        <option
                                            className={optionClass({
                                                className: "mb-2",
                                            })}
                                            key={tag.linked_data_id}
                                            value={tag.linked_data_id}
                                            data-linked-id={tag.linked_data_id}
                                            data-description={tag.description}
                                        >
                                            {tag.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
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
