export const confusedWordsData = [
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
    {
        title: "Then vs. Than",
        content: [
            {
                label: "Then:",
                description: "At that time or next in order",
                partOfSpeech: "adverb",
            },
            {
                label: "Than:",
                description:
                    "Used to introduce the second element in a comparison",
                partOfSpeech: "conjunction",
            },
            {
                example: "I'll see you then. I'd rather have tea than coffee.",
            },
        ],
    },
    {
        title: "Accept vs. Except vs. Expect",
        content: [
            {
                label: "Accept:",
                description: "To receive or agree to",
                partOfSpeech: "verb",
            },
            {
                label: "Except:",
                description: "Not including or other than",
                partOfSpeech: "preposition",
            },
            {
                label: "Expect:",
                description: "To regard something as likely to happen",
                partOfSpeech: "verb",
            },
            {
                example: "She accepted the award graciously.",
            },
            {
                example: "Everyone except John is coming to the party.",
            },
            {
                example: "I expect the package to arrive tomorrow.",
            },
        ],
    },
];

export const dailyWordSuggestionsData = [
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
    {
        title: "Sonder",
        definition:
            "The realization that each passerby has a life as vivid and complex as your own",
        turkish: "Başkalarının da hayatları olduğunu fark etme",
        example:
            "The feeling of sonder struck him as he walked through the crowded streets.",
    },
    {
        title: "Slumber",
        definition: "To sleep lightly or peacefully",
        turkish: "Uyuklamak",
        example: "The baby slumbered in her mother's arms.",
    },
];

export const technicalDefinitionsData = [
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
    {
        title: "Midcourse Intervention",
        fullForm: "Midcourse Intervention",
        definition:
            "A corrective action or adjustment made during the execution of a project or process to address issues, ensuring the final outcome meets the desired goals.",
        example:
            "During the implementation phase, the backend team fell behind the schedule, and a midcourse intervention to transfer new members to the team was done to meet the project deadline.",
        categories: ["Project Management", "Project Development"],
        relatedTerms: ["Course Correction", "Intervention"],
    },
    {
        title: "Definition of Done",
        fullForm: "Definition of Done",
        definition:
            "The definiton of the criteria that must be met for an artifact to be considered complete and ready",
        example:
            "We need to define the Definition of Done to avoid the sentence 'almost complete' which hinders the progress of the project.",
        categories: ["Agile Development", "Software Development"],
        relatedTerms: ["Acceptance Criteria", "Sprint Goal"],
    },
];
