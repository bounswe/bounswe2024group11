import { Separator } from "@ariakit/react";
import { RiBookReadLine, RiCodeLine, RiTranslate2 } from "@remixicon/react";
import { Collapsible } from "../../components/collapsible";
import {
    confusedWordsData,
    dailyWordSuggestionsData,
    technicalDefinitionsData,
} from "./HomeStatic.Data";

export const HomeStaticContent = () => {
    return (
        <>
            <div className="flex flex-1 flex-col items-center gap-2 rounded-4 bg-slate-50 py-6">
                <figure className="relative h-16 w-16">
                    <img
                        src="/turquiz_logomark.svg"
                        alt="Turquiz App Logo"
                        className="rotating-logo h-16 w-16"
                    />
                    <div className="absolute bg-slate-200"></div>
                </figure>
                <div className="flex flex-1 flex-col items-center gap-1">
                    <h2 className="font-display text-2xl font-medium">
                        From the Turquiz Editors
                    </h2>
                    <p className="max-w-xl text-balance text-center text-lg text-slate-500">
                        Do you even call it a platform? We're just a bunch of
                        people who like to talk about English.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <section className="rounded-lg rounded-2 p-6 ring-1 ring-slate-200">
                    <h2 className="mb-4 flex items-center text-lg font-medium text-cyan-800">
                        <RiBookReadLine size={20} className="mr-2" />
                        Frequently Confused Words
                    </h2>
                    <Separator className="pb-4" />
                    {confusedWordsData.map((item, index) => (
                        <Collapsible key={index} title={item.title}>
                            {item.content.map((contentItem, contentIndex) => (
                                <p
                                    key={contentIndex}
                                    className={
                                        contentItem.example
                                            ? "mt-3 text-slate-600"
                                            : ""
                                    }
                                >
                                    {contentItem.label && (
                                        <strong>{contentItem.label}</strong>
                                    )}{" "}
                                    {contentItem.description}
                                    {contentItem.example && (
                                        <>{contentItem.example}</>
                                    )}
                                </p>
                            ))}
                        </Collapsible>
                    ))}
                </section>
                <section className="rounded-lg rounded-2 p-6 ring-1 ring-slate-200">
                    <h2 className="mb-4 flex items-center text-xl font-medium text-cyan-800">
                        <RiTranslate2 size={20} className="mr-2" />
                        Daily Word Suggestions
                    </h2>
                    <Separator className="pb-4" />
                    {dailyWordSuggestionsData.map((item, index) => (
                        <Collapsible key={index} title={item.title}>
                            <p>
                                <strong>Definition:</strong> {item.definition}
                            </p>
                            <p>
                                <strong>Turkish:</strong> {item.turkish}
                            </p>
                            <p className="mt-3 text-slate-600">
                                {item.example}
                            </p>
                        </Collapsible>
                    ))}
                </section>
                <section className="rounded-lg rounded-2 p-6 ring-1 ring-slate-200">
                    <h2 className="mb-4 flex items-center text-xl font-medium text-cyan-800">
                        <RiCodeLine size={20} className="mr-2" />
                        Technical Definitions
                    </h2>
                    <Separator className="pb-4" />
                    {technicalDefinitionsData.map((item, index) => (
                        <Collapsible key={index} title={item.title}>
                            <p>
                                <strong>Full form:</strong> {item.fullForm}
                            </p>
                            <p>
                                <strong>Definition:</strong> {item.definition}
                            </p>
                            <p className="mt-3 text-slate-600">
                                {item.example}
                            </p>
                        </Collapsible>
                    ))}
                </section>
            </div>
        </>
    );
};
