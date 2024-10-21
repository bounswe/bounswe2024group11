import { Separator } from "@ariakit/react";
import {
    RiArrowDownSLine,
    RiArrowUpSLine,
    RiBookReadLine,
    RiCodeLine,
    RiTranslate2,
} from "@remixicon/react";
import { ReactNode, useState } from "react";
import { PageHead } from "../components/page-head";

const ExpandableItem = ({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="py-1">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex w-full items-center justify-between rounded-1 bg-white px-3 py-3 text-left font-medium transition-colors hover:bg-slate-100"
            >
                {title}
                {isExpanded ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
            </button>
            {isExpanded && <div className="py-2 pl-4">{children}</div>}
        </div>
    );
};

const confusedWordsData = [
    {
        title: "Affect vs. Effect",
        content: [
            {
                label: "Affect (verb):",
                description: "To influence or make a difference to.",
                partOfSpeech: "verb",
            },
            {
                label: "Affect (noun):",
                description: "An emotion or desire as influencing behavior.",
                partOfSpeech: "noun",
            },
            {
                label: "Effect (noun):",
                description: "A result or consequence.",
                partOfSpeech: "noun",
            },
            {
                label: "Effect (verb):",
                description: "To bring about or cause to happen.",
                partOfSpeech: "verb",
            },
            {
                example:
                    "The weather affects my mood. / The effect of the weather on my mood is noticeable.",
            },
            {
                example:
                    "The medication may affect your coordination. / The side effects of the medication include drowsiness.",
            },
        ],
    },
    {
        title: "Their vs. There vs. They're",
        content: [
            {
                label: "Their:",
                description: "Possessive pronoun",
                partOfSpeech: "pronoun",
            },
            {
                label: "There:",
                description: "Indicating location or existence",
                partOfSpeech: "adverb",
            },
            {
                label: "They're:",
                description: 'Contraction of "they are"',
                partOfSpeech: "contraction",
            },
            { example: "They're going to their house over there." },
            {
                example:
                    "Their car is parked over there. They're planning to sell it soon.",
            },
        ],
    },
    {
        title: "Its vs. It's",
        content: [
            {
                label: "Its:",
                description: "Possessive pronoun",
                partOfSpeech: "pronoun",
            },
            {
                label: "It's:",
                description: 'Contraction of "it is" or "it has"',
                partOfSpeech: "contraction",
            },
            { example: "It's important to know its meaning." },
            {
                example:
                    "The dog wagged its tail. It's been a long day for the pup.",
            },
        ],
    },
    {
        title: "Your vs. You're",
        content: [
            {
                label: "Your:",
                description: "Possessive pronoun",
                partOfSpeech: "pronoun",
            },
            {
                label: "You're:",
                description: 'Contraction of "you are"',
                partOfSpeech: "contraction",
            },
            {
                example:
                    "Your book is on the table. You're going to need it for class.",
            },
            { example: "You're responsible for your own actions." },
        ],
    },
    {
        title: "To vs. Too vs. Two",
        content: [
            {
                label: "To:",
                description: "Preposition indicating direction or recipient",
                partOfSpeech: "preposition",
            },
            {
                label: "Too:",
                description: "Also or excessively",
                partOfSpeech: "adverb",
            },
            {
                label: "Two:",
                description: "The number 2",
                partOfSpeech: "noun",
            },
            {
                example:
                    "I'm going to the store to buy two apples. Do you want to come too?",
            },
            { example: "The coffee is too hot to drink right now." },
        ],
    },
];

const dailyWordSuggestionsData = [
    {
        title: "Hery",
        definition: "To worship or praise",
        turkish: "Övmek",
        example: "The ancient text heried the deeds of the hero.",
        partOfSpeech: "verb",
        etymology:
            "From Middle English herien, from Old English herian, herġan ('to praise, glorify').",
    },
    {
        title: "Hallow",
        definition: "To make holy or sacred",
        turkish: "Kutsallaştırmak",
        example: "The ground was hallowed by the ceremony.",
        partOfSpeech: "verb",
        etymology:
            "From Middle English halwen, from Old English hālgian ('to make holy').",
    },
    {
        title: "Fiend",
        definition: "An evil spirit or demon",
        turkish: "Şeytan",
        example: "The story depicted a fiend terrorizing the village.",
        partOfSpeech: "noun",
        etymology:
            "From Middle English feend, from Old English fēond ('enemy, devil, demon').",
    },
    {
        title: "Ephemeral",
        definition: "Lasting for a very short time",
        turkish: "Geçici",
        example:
            "The beauty of cherry blossoms is ephemeral, lasting only a few days.",
        partOfSpeech: "adjective",
        etymology:
            "From Greek ephēmeros ('lasting only one day, short-lived').",
    },
    {
        title: "Serendipity",
        definition:
            "The occurrence of events by chance in a happy or beneficial way",
        turkish: "Şans eseri",
        example: "Finding his lost wallet was a moment of serendipity.",
        partOfSpeech: "noun",
        etymology:
            "Coined by Horace Walpole in 1754 based on the Persian fairy tale 'The Three Princes of Serendip'.",
    },
];

const technicalDefinitionsData = [
    {
        title: "API",
        fullForm: "Application Programming Interface",
        definition:
            "A set of protocols and tools for building software applications",
        example:
            "The weather app uses an API to fetch current temperature data.",
        categories: ["Software Development", "Web Development"],
        relatedTerms: ["REST", "SOAP", "GraphQL"],
    },
    {
        title: "ORM",
        fullForm: "Object-Relational Mapping",
        definition:
            "A technique for converting data between incompatible type systems in databases and object-oriented programming languages",
        example:
            "Using an ORM can simplify database operations in your application.",
        categories: ["Database", "Software Development"],
        relatedTerms: ["SQL", "Database Schema", "Hibernate"],
    },
    {
        title: "JWT",
        fullForm: "JSON Web Token",
        definition:
            "A compact, URL-safe means of representing claims to be transferred between two parties",
        example:
            "JWTs are commonly used for authentication in web applications.",
        categories: ["Web Security", "Authentication"],
        relatedTerms: ["OAuth", "Bearer Token", "JSON"],
    },
    {
        title: "DNS",
        fullForm: "Domain Name System",
        definition:
            "A hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet or a private network",
        example: "DNS translates human-readable domain names to IP addresses.",
        categories: ["Networking", "Internet Infrastructure"],
        relatedTerms: ["IP Address", "ICANN", "Domain Registrar"],
    },
    {
        title: "CORS",
        fullForm: "Cross-Origin Resource Sharing",
        definition:
            "A mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served",
        example:
            "CORS policies help prevent unauthorized access to APIs from different domains.",
        categories: ["Web Security", "Web Development"],
        relatedTerms: [
            "Same-Origin Policy",
            "Preflight Request",
            "XMLHttpRequest",
        ],
    },
];
export const Home = () => {
    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead
                title="Welcome to Turquiz"
                description="Turquiz is a platform that helps you to get prolific in
                    English. You can take quizzes and use forums to improve your
                    English."
            />
            <main className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <section className="rounded-lg rounded-2 p-6 ring-1 ring-slate-200">
                    <h2 className="mb-4 flex items-center text-xl font-medium text-cyan-800">
                        <RiBookReadLine size={20} className="mr-2" />
                        Frequently Confused Words
                    </h2>
                    <Separator className="pb-4" />
                    {confusedWordsData.map((item, index) => (
                        <ExpandableItem key={index} title={item.title}>
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
                        </ExpandableItem>
                    ))}
                </section>
                <section className="rounded-lg rounded-2 p-6 ring-1 ring-slate-200">
                    <h2 className="mb-4 flex items-center text-xl font-medium text-cyan-800">
                        <RiTranslate2 size={20} className="mr-2" />
                        Daily Word Suggestions
                    </h2>
                    <Separator className="pb-4" />
                    {dailyWordSuggestionsData.map((item, index) => (
                        <ExpandableItem key={index} title={item.title}>
                            <p>
                                <strong>Definition:</strong> {item.definition}
                            </p>
                            <p>
                                <strong>Turkish:</strong> {item.turkish}
                            </p>
                            <p className="mt-3 text-slate-600">
                                {item.example}
                            </p>
                        </ExpandableItem>
                    ))}
                </section>
                <section className="rounded-lg rounded-2 p-6 ring-1 ring-slate-200">
                    <h2 className="mb-4 flex items-center text-xl font-medium text-cyan-800">
                        <RiCodeLine size={20} className="mr-2" />
                        Technical Definitions
                    </h2>
                    <Separator className="pb-4" />
                    {technicalDefinitionsData.map((item, index) => (
                        <ExpandableItem key={index} title={item.title}>
                            <p>
                                <strong>Full form:</strong> {item.fullForm}
                            </p>
                            <p>
                                <strong>Definition:</strong> {item.definition}
                            </p>
                            <p className="mt-3 text-slate-600">
                                {item.example}
                            </p>
                        </ExpandableItem>
                    ))}
                </section>
            </main>
        </div>
    );
};
