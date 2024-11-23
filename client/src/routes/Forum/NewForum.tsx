import { useEffect, useState } from "react";
import { Form, useSearchParams } from "react-router-dom";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { inputClass, labelClass, optionClass } from "../../components/input";
import { debounce } from "../../utils";

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

export const NewForum = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tags = searchParams.get("tags");
    const relevant_quiz_id = searchParams.get("quiz_id");
    const [tagQuery, setTagQuery] = useState(
        searchParams.get("tag_query") || "",
    );

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
            <main className="flex flex-col items-center gap-8">
                <Form
                    aria-labelledby="add-new-post"
                    className="flex w-full max-w-screen-sm flex-col gap-4"
                    method="POST"
                >
                    <h1 className="mb-4 text-2xl font-semibold">
                        Create a new forum question
                    </h1>
                    <div className="flex w-full flex-col gap-4">
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
                            </label>
                            <select
                                id="tags"
                                name="tags"
                                multiple
                                className="flex flex-col gap-2 border-none ring-0 focus:border-none active:border-none"
                                required
                            >
                                {uniqueTags.map((tag) => (
                                    <option
                                        className={optionClass()}
                                        key={tag.linked_data_id}
                                        value={tag.linked_data_id}
                                        data-linked-id={tag.linked_data_id}
                                        data-description={tag.description}
                                    >
                                        {tag.name}
                                    </option>
                                ))}
                            </select>
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
