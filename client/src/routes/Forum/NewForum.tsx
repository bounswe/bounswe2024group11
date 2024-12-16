import { Button } from "@ariakit/react";
import { RiCloseFill, RiImage2Line } from "@remixicon/react";
import { cva } from "cva";
import { useEffect, useRef, useState } from "react";
import { useFetcher, useSearchParams } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { inputClass, labelClass } from "../../components/input";
import { debounce } from "../../utils";
import { forumCreateLoader } from "./Forum.data";
import { Tag } from "./Forum.schema";
import { NewForumHead } from "./NewForumHead";
import { RelevantQuiz } from "./RelevantQuizQuestion";

export const tagOptionClass = cva(
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
    const [isPostDisabled, setIsPostDisabled] = useState(false);
    const postFetcher = useFetcher();

    useEffect(() => {
        if (postFetcher.state === "idle") {
            setIsPostDisabled(false);
        }
    }, [postFetcher.state]);

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

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
    const [imagePreview, setimagePreview] = useState<string | null>(null);
    const imageContainerStyles = cva(
        "flex h-48 w-full items-center justify-center overflow-hidden rounded-1 transition-all duration-200 hover:opacity-90",
        {
            variants: {
                hasPreview: {
                    true: "",
                    false: "border-2 border-dashed border-slate-300 bg-slate-100",
                },
            },
            defaultVariants: {
                hasPreview: false,
            },
        },
    );
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setimagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
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
                <NewForumHead />
                <postFetcher.Form
                    aria-labelledby="page-title"
                    aria-describedby="page-description"
                    className="flex w-full max-w-screen-sm flex-col gap-4"
                    method="POST"
                    role="form"
                    encType="multipart/form-data"
                    onSubmit={() => setIsPostDisabled(true)}
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
                        <div className="flex w-full flex-col items-center gap-2">
                            <div
                                onClick={handleImageClick}
                                className="group relative w-full cursor-pointer"
                            >
                                <div
                                    className={imageContainerStyles({
                                        hasPreview: !!imagePreview,
                                    })}
                                >
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Image preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <RiImage2Line className="h-8 w-8 text-slate-400" />
                                    )}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                                    <div className="rounded rounded-1 bg-slate-950/50 p-1 py-1 text-xs font-medium text-white">
                                        Select A Photo
                                    </div>
                                </div>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/png, image/jpeg"
                                name="image_file"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
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
                                                <Button
                                                    key={tag.linked_data_id}
                                                    onClick={() => {
                                                        setTagQuery("");
                                                        handleTagClick(tag);
                                                    }}
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
                                                    <span className="text-start text-xs opacity-80">
                                                        {tag.description}
                                                    </span>
                                                </Button>
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
                            disabled={isPostDisabled}
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
                </postFetcher.Form>
            </main>
        </div>
    );
};
