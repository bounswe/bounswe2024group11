import { Term } from "../types/mockTerm";
import { QuizOverview } from "../types/quiz";
import { Options } from "../types/quizQuestion";

export const quizOverviews: QuizOverview[] = [
    {
        id: "1",
        type: 1,
        title: "Fruits",
        description: "Test your knowledge of various fruits.",
        author: {
            full_name: "Author 1",
            username: "author1",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        created_at: "2021-10-01T00:00:00Z",
        difficulty: "easy",
        is_taken: true,
        num_taken: 100,
        question_count: 10,
        rating: {
            score: 4.5,
            count: 100,
        },
        tags: [
            {
                id: "2",
                name: "daily life",
            },
            {
                id: "3",
                name: "food",
            },
        ],
    },
    {
        id: "1",
        type: 2,
        title: "Automative Industry",
        description:
            "Get to know about the language of automative industry. Excellent for intermediate learners.",
        author: {
            full_name: "Author 1",
            username: "author1",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        created_at: "2024-10-20T13:23:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 120,
        question_count: 8,
        rating: {
            score: 2,
            count: 1200,
        },
        tags: [
            {
                id: "31",
                name: "industry",
            },
            {
                id: "4",
                name: "work",
            },
        ],
    },
];

export const quizzes = [
    {
        id: "fruit-quiz-1",
        type: 3,
        title: "Fruit Quiz",
        description: "Test your knowledge of various fruits.",
        author: {
            full_name: "John Doe",
            username: "john_fruit_lover",
            avatar: "https://example.com/avatar1.png",
        },
        created_at: new Date("2024-10-13").toISOString(),
        tags: [
            {
                id: "tag-fruit",
                name: "FRUITS",
            },
        ],
    },
    {
        id: "animal-quiz-1",
        type: 2,
        title: "Animal Quiz",
        description: "How much do you know about different animals?",
        author: {
            full_name: "Jane Smith",
            username: "jane_animal_fan",
            avatar: "https://example.com/avatar2.png",
        },
        created_at: new Date("2024-10-14").toISOString(),
        tags: [
            {
                id: "tag-animal",
                name: "ANIMALS",
            },
        ],
    },
    {
        id: "car-quiz-1",
        type: 1,
        title: "Car Parts Quiz",
        description: "Identify car parts and their functions.",
        author: {
            full_name: "Mike Auto",
            username: "mike_car_enthusiast",
            avatar: "https://example.com/avatar3.png",
        },
        created_at: new Date("2024-10-15").toISOString(),
        tags: [
            {
                id: "tag-car",
                name: "CARS",
            },
        ],
    },
    {
        id: "health-quiz-1",
        title: "Health and Fitness Terms Quiz",
        description: "Test your knowledge of common health and fitness terms.",
        author: {
            full_name: "Zehra Aydin",
            username: "zehra_health",
            avatar: "https://example.com/avatar50.png",
        },
        created_at: new Date("2024-11-21").toISOString(),
        type: 1,
        tags: [
            {
                id: "tag-health",
                name: "HEALTH & FITNESS",
            },
        ],
    },
    {
        id: "food-quiz-1",
        type: 1,
        title: "Food Translation Quiz",
        description: "Test your knowledge of Turkish food names in English.",
        author: {
            full_name: "Ali Yilmaz",
            username: "ali_foodie",
            avatar: "https://example.com/avatar4.png",
        },
        created_at: new Date("2024-10-13").toISOString(),
        tags: [
            {
                id: "tag-food",
                name: "FOOD",
            },
        ],
    },
    {
        id: "technology-quiz-1",
        type: 1,
        title: "Technology Terms Translation Quiz",
        description: "Translate common Turkish technology terms into English.",
        author: {
            full_name: "Mehmet Tekin",
            username: "mehmet_tech",
            avatar: "https://example.com/avatar5.png",
        },
        created_at: new Date("2024-10-14").toISOString(),
        tags: [
            {
                id: "tag-technology",
                name: "TECHNOLOGY",
            },
        ],
    },
    {
        id: "nature-quiz-1",
        type: 1,
        title: "Nature Terms Translation Quiz",
        description: "Identify English translations for Turkish nature terms.",
        author: {
            full_name: "Selin Kaya",
            username: "selin_naturelover",
            avatar: "https://example.com/avatar6.png",
        },
        created_at: new Date("2024-10-15").toISOString(),
        tags: [
            {
                id: "tag-nature",
                name: "NATURE",
            },
        ],
    },

    {
        id: "school-quiz-1",
        type: 1,
        title: "School Terms Translation Quiz",
        description:
            "Translate common school-related English words to Turkish.",
        author: {
            full_name: "Deniz Aydin",
            username: "deniz_teacher",
            avatar: "https://example.com/avatar7.png",
        },
        created_at: new Date("2024-10-13").toISOString(),
        tags: [
            {
                id: "tag-school",
                name: "SCHOOL",
            },
        ],
    },
    {
        id: "sports-quiz-1",
        type: 1,
        title: "Sports Terms Translation Quiz",
        description:
            "Learn Turkish translations of common English sports terms.",
        author: {
            full_name: "Can Yildiz",
            username: "can_sportsfan",
            avatar: "https://example.com/avatar8.png",
        },
        created_at: new Date("2024-10-14").toISOString(),
        tags: [
            {
                id: "tag-sports",
                name: "SPORTS",
            },
        ],
    },
    {
        id: "furniture-quiz-1",
        type: 1,
        title: "Furniture Translation Quiz",
        description:
            "Test your knowledge of Turkish translations for English furniture terms.",
        author: {
            full_name: "Ayla Uzun",
            username: "ayla_home",
            avatar: "https://example.com/avatar9.png",
        },
        created_at: new Date("2024-10-15").toISOString(),
        tags: [
            {
                id: "tag-furniture",
                name: "FURNITURE",
            },
        ],
    },

    {
        id: "medical-quiz-1",
        type: 1,
        title: "Medical Terminology Quiz",
        description: "What is the meaning of common medical terms?",
        author: {
            full_name: "Dr. Ahmet Demir",
            username: "ahmet_medic",
            avatar: "https://example.com/avatar10.png",
        },
        created_at: new Date("2024-10-13").toISOString(),
        tags: [
            {
                id: "tag-medical",
                name: "MEDICAL",
            },
        ],
    },
    {
        id: "law-quiz-1",
        type: 1,
        title: "Legal Terms Quiz",
        description: "Test your knowledge of English legal terminology.",
        author: {
            full_name: "Ezgi Avci",
            username: "ezgi_lawyer",
            avatar: "https://example.com/avatar11.png",
        },
        created_at: new Date("2024-10-14").toISOString(),
        tags: [
            {
                id: "tag-law",
                name: "LAW",
            },
        ],
    },
    {
        id: "science-quiz-1",
        type: 1,
        title: "Science Vocabulary Quiz",
        description:
            "Identify the meaning of common scientific terms in English.",
        author: {
            full_name: "Prof. Emre Arslan",
            username: "emre_science",
            avatar: "https://example.com/avatar12.png",
        },
        created_at: new Date("2024-10-15").toISOString(),
        tags: [
            {
                id: "tag-science",
                name: "SCIENCE",
            },
        ],
    },
    {
        id: "business-quiz-1",
        type: 1,
        title: "Business Vocabulary Quiz",
        description: "What do these common business terms mean?",
        author: {
            full_name: "Merve Kara",
            username: "merve_business",
            avatar: "https://example.com/avatar13.png",
        },
        created_at: new Date("2024-10-13").toISOString(),
        tags: [
            {
                id: "tag-business",
                name: "BUSINESS",
            },
        ],
    },
    {
        id: "kitchen-quiz-1",
        type: 1,
        title: "Kitchen Items Translation Quiz",
        description: "Test your knowledge of Turkish kitchen items in English.",
        author: {
            full_name: "Leyla Korkmaz",
            username: "leyla_cooking",
            avatar: "https://example.com/avatar14.png",
        },
        created_at: new Date("2024-10-16").toISOString(),
        tags: [
            {
                id: "tag-kitchen",
                name: "KITCHEN",
            },
        ],
    },
    {
        id: "clothing-quiz-1",
        type: 1,
        title: "Clothing Terms Translation Quiz",
        description:
            "Learn the English translations for common Turkish clothing terms.",
        author: {
            full_name: "Serdar Erdem",
            username: "serdar_fashion",
            avatar: "https://example.com/avatar15.png",
        },
        created_at: new Date("2024-10-17").toISOString(),
        tags: [
            {
                id: "tag-clothing",
                name: "CLOTHING",
            },
        ],
    },
    {
        id: "tools-quiz-1",
        type: 1,
        title: "Tools Translation Quiz",
        description:
            "Identify the English equivalents of Turkish tools and hardware terms.",
        author: {
            full_name: "Hakan Tunc",
            username: "hakan_diy",
            avatar: "https://example.com/avatar16.png",
        },
        created_at: new Date("2024-10-18").toISOString(),
        tags: [
            {
                id: "tag-tools",
                name: "TOOLS",
            },
        ],
    },
    {
        id: "colors-quiz-1",
        type: 1,
        title: "Colors Translation Quiz",
        description: "Translate Turkish color names into English.",
        author: {
            full_name: "Ebru Yilmaz",
            username: "ebru_artist",
            avatar: "https://example.com/avatar17.png",
        },
        created_at: new Date("2024-10-19").toISOString(),
        tags: [
            {
                id: "tag-colors",
                name: "COLORS",
            },
        ],
    },
    {
        id: "music-quiz-1",
        type: 1,
        title: "Music Instruments Translation Quiz",
        description:
            "Identify the English names of Turkish musical instruments.",
        author: {
            full_name: "Mert Tan",
            username: "mert_music",
            avatar: "https://example.com/avatar18.png",
        },
        created_at: new Date("2024-10-20").toISOString(),
        tags: [
            {
                id: "tag-music",
                name: "MUSIC",
            },
        ],
    },

    {
        id: "weather-quiz-1",
        type: 1,
        title: "Weather Terms Translation Quiz",
        description:
            "Translate common weather-related English terms to Turkish.",
        author: {
            full_name: "Zeynep Demir",
            username: "zeynep_weather",
            avatar: "https://example.com/avatar19.png",
        },
        created_at: new Date("2024-10-21").toISOString(),
        tags: [
            {
                id: "tag-weather",
                name: "WEATHER",
            },
        ],
    },
    {
        id: "movies-quiz-1",
        type: 1,
        title: "Movies Translation Quiz",
        description:
            "Translate movie genres and terms from English to Turkish.",
        author: {
            full_name: "Emir Can",
            username: "emir_moviebuff",
            avatar: "https://example.com/avatar20.png",
        },
        created_at: new Date("2024-10-22").toISOString(),
        tags: [
            {
                id: "tag-movies",
                name: "MOVIES",
            },
        ],
    },
    {
        id: "transportation-quiz-1",
        type: 1,
        title: "Transportation Terms Translation Quiz",
        description:
            "Learn Turkish translations of transportation-related English words.",
        author: {
            full_name: "Burak Kaptan",
            username: "burak_travel",
            avatar: "https://example.com/avatar21.png",
        },
        created_at: new Date("2024-10-23").toISOString(),
        tags: [
            {
                id: "tag-transportation",
                name: "TRANSPORTATION",
            },
        ],
    },
    {
        id: "emotions-quiz-1",
        type: 1,
        title: "Emotions Translation Quiz",
        description: "Translate English emotion-related words into Turkish.",
        author: {
            full_name: "Derya Ilmaz",
            username: "derya_mentalhealth",
            avatar: "https://example.com/avatar22.png",
        },
        created_at: new Date("2024-10-24").toISOString(),
        tags: [
            {
                id: "tag-emotions",
                name: "EMOTIONS",
            },
        ],
    },
    {
        id: "directions-quiz-1",
        type: 1,
        title: "Directions Translation Quiz",
        description:
            "Test your ability to translate directions from English to Turkish.",
        author: {
            full_name: "Okan Acar",
            username: "okan_directions",
            avatar: "https://example.com/avatar23.png",
        },
        created_at: new Date("2024-10-25").toISOString(),
        tags: [
            {
                id: "tag-directions",
                name: "DIRECTIONS",
            },
        ],
    },
    {
        id: "bodyparts-quiz-1",
        type: 1,
        title: "Body Parts Translation Quiz",
        description: "Learn Turkish translations of body parts from English.",
        author: {
            full_name: "Cem Aksoy",
            username: "cem_fitness",
            avatar: "https://example.com/avatar24.png",
        },
        created_at: new Date("2024-10-26").toISOString(),
        tags: [
            {
                id: "tag-bodyparts",
                name: "BODY PARTS",
            },
        ],
    },

    {
        id: "philosophy-quiz-1",
        type: 1,
        title: "Philosophical Terms Quiz",
        description: "What is the meaning of these common philosophical terms?",
        author: {
            full_name: "Elif Kaya",
            username: "elif_thinker",
            avatar: "https://example.com/avatar25.png",
        },
        created_at: new Date("2024-10-27").toISOString(),
        tags: [
            {
                id: "tag-philosophy",
                name: "PHILOSOPHY",
            },
        ],
    },
    {
        id: "history-quiz-1",
        type: 1,
        title: "History Vocabulary Quiz",
        description:
            "Test your knowledge of historical terms and their meanings.",
        author: {
            full_name: "Sibel Topal",
            username: "sibel_historian",
            avatar: "https://example.com/avatar26.png",
        },
        created_at: new Date("2024-10-28").toISOString(),
        tags: [
            {
                id: "tag-history",
                name: "HISTORY",
            },
        ],
    },
    {
        id: "architecture-quiz-1",
        type: 1,
        title: "Architecture Terms Quiz",
        description: "Identify the meanings of architectural terms in English.",
        author: {
            full_name: "Murat Yildiz",
            username: "murat_architect",
            avatar: "https://example.com/avatar27.png",
        },
        created_at: new Date("2024-10-29").toISOString(),
        tags: [
            {
                id: "tag-architecture",
                name: "ARCHITECTURE",
            },
        ],
    },
    {
        id: "finance-quiz-1",
        type: 1,
        title: "Finance Vocabulary Quiz",
        description: "What do these common finance terms mean in English?",
        author: {
            full_name: "Fatih Koc",
            username: "fatih_finance",
            avatar: "https://example.com/avatar28.png",
        },
        created_at: new Date("2024-10-30").toISOString(),
        tags: [
            {
                id: "tag-finance",
                name: "FINANCE",
            },
        ],
    },
    {
        id: "chemistry-quiz-1",
        type: 1,
        title: "Chemistry Terms Quiz",
        description: "Learn the meaning of basic chemistry terms.",
        author: {
            full_name: "Ceyda Polat",
            username: "ceyda_chemistry",
            avatar: "https://example.com/avatar29.png",
        },
        created_at: new Date("2024-10-31").toISOString(),
        tags: [
            {
                id: "tag-chemistry",
                name: "CHEMISTRY",
            },
        ],
    },
    {
        id: "literature-quiz-1",
        type: 1,
        title: "Literature Terms Quiz",
        description: "What do these literature-related terms mean in English?",
        author: {
            full_name: "Esra Yilmaz",
            username: "esra_books",
            avatar: "https://example.com/avatar30.png",
        },
        created_at: new Date("2024-11-01").toISOString(),
        tags: [
            {
                id: "tag-literature",
                name: "LITERATURE",
            },
        ],
    },
    {
        id: "art-quiz-1",
        type: 1,
        title: "Art Vocabulary Quiz",
        description:
            "Identify the meanings of common art-related terms in English.",
        author: {
            full_name: "Melis Demir",
            username: "melis_artist",
            avatar: "https://example.com/avatar31.png",
        },
        created_at: new Date("2024-11-02").toISOString(),
        tags: [
            {
                id: "tag-art",
                name: "ART",
            },
        ],
    },
    {
        id: "psychology-quiz-1",
        type: 1,
        title: "Psychology Terms Quiz",
        description: "What do these psychology-related terms mean?",
        author: {
            full_name: "Orhan Yildirim",
            username: "orhan_psych",
            avatar: "https://example.com/avatar32.png",
        },
        created_at: new Date("2024-11-03").toISOString(),
        tags: [
            {
                id: "tag-psychology",
                name: "PSYCHOLOGY",
            },
        ],
    },
    {
        id: "geography-quiz-1",
        type: 1,
        title: "Geography Vocabulary Quiz",
        description:
            "Test your knowledge of geography-related terms and their meanings.",
        author: {
            full_name: "Gizem Akgul",
            username: "gizem_geo",
            avatar: "https://example.com/avatar33.png",
        },
        created_at: new Date("2024-11-04").toISOString(),
        tags: [
            {
                id: "tag-geography",
                name: "GEOGRAPHY",
            },
        ],
    },
    {
        id: "ecology-quiz-1",
        type: 1,
        title: "Ecology Terms Quiz",
        description:
            "Learn the meaning of terms related to ecology and the environment.",
        author: {
            full_name: "Yasemin Arkan",
            username: "yasemin_green",
            avatar: "https://example.com/avatar34.png",
        },
        created_at: new Date("2024-11-05").toISOString(),
        tags: [
            {
                id: "tag-ecology",
                name: "ECOLOGY",
            },
        ],
    },
    {
        id: "education-quiz-1",
        type: 1,
        title: "Education Terms Translation Quiz",
        description:
            "Learn the English translations for Turkish education-related terms.",
        author: {
            full_name: "Eda Sari",
            username: "eda_teacher",
            avatar: "https://example.com/avatar35.png",
        },
        created_at: new Date("2024-11-06").toISOString(),
        tags: [
            {
                id: "tag-education",
                name: "EDUCATION",
            },
        ],
    },
    {
        id: "medicine-quiz-1",
        type: 1,
        title: "Medical Instruments Translation Quiz",
        description:
            "Test your knowledge of medical instruments by translating from Turkish to English.",
        author: {
            full_name: "Dr. Kerem Yilmaz",
            username: "kerem_medicine",
            avatar: "https://example.com/avatar36.png",
        },
        created_at: new Date("2024-11-07").toISOString(),
        tags: [
            {
                id: "tag-medicine",
                name: "MEDICINE",
            },
        ],
    },
    {
        id: "workplace-quiz-1",
        type: 1,
        title: "Workplace Items Translation Quiz",
        description: "Translate common Turkish workplace items into English.",
        author: {
            full_name: "Burcu Aydin",
            username: "burcu_office",
            avatar: "https://example.com/avatar37.png",
        },
        created_at: new Date("2024-11-08").toISOString(),
        tags: [
            {
                id: "tag-workplace",
                name: "WORKPLACE",
            },
        ],
    },
    {
        id: "holiday-quiz-1",
        type: 1,
        title: "Holiday Terms Translation Quiz",
        description:
            "Learn the English names for common Turkish holiday terms.",
        author: {
            full_name: "Tugba Cetin",
            username: "tugba_traveller",
            avatar: "https://example.com/avatar38.png",
        },
        created_at: new Date("2024-11-09").toISOString(),
        tags: [
            {
                id: "tag-holiday",
                name: "HOLIDAY",
            },
        ],
    },
    {
        id: "grocery-quiz-1",
        type: 1,
        title: "Grocery Items Translation Quiz",
        description: "Translate Turkish grocery items into English.",
        author: {
            full_name: "Cansu Ozkan",
            username: "cansu_shopper",
            avatar: "https://example.com/avatar39.png",
        },
        created_at: new Date("2024-11-10").toISOString(),
        tags: [
            {
                id: "tag-grocery",
                name: "GROCERY",
            },
        ],
    },
    {
        id: "family-quiz-1",
        type: 1,
        title: "Family Terms Translation Quiz",
        description: "Translate common English family terms into Turkish.",
        author: {
            full_name: "Nesrin Yildirim",
            username: "nesrin_family",
            avatar: "https://example.com/avatar40.png",
        },
        created_at: new Date("2024-11-11").toISOString(),
        tags: [
            {
                id: "tag-family",
                name: "FAMILY",
            },
        ],
    },
    {
        id: "plants-quiz-1",
        type: 1,
        title: "Plants Translation Quiz",
        description:
            "Learn the Turkish translations for various plant-related English terms.",
        author: {
            full_name: "Hulya Demir",
            username: "hulya_gardener",
            avatar: "https://example.com/avatar41.png",
        },
        created_at: new Date("2024-11-12").toISOString(),
        tags: [
            {
                id: "tag-plants",
                name: "PLANTS",
            },
        ],
    },
    {
        id: "home-quiz-1",
        type: 1,
        title: "Home Appliances Translation Quiz",
        description: "Translate English home appliances terms into Turkish.",
        author: {
            full_name: "Ozgur Arslan",
            username: "ozgur_home",
            avatar: "https://example.com/avatar42.png",
        },
        created_at: new Date("2024-11-13").toISOString(),
        tags: [
            {
                id: "tag-home",
                name: "HOME",
            },
        ],
    },
    {
        id: "travel-quiz-1",
        type: 1,
        title: "Travel Terms Translation Quiz",
        description:
            "Translate common travel-related English words into Turkish.",
        author: {
            full_name: "Gizem Ertugrul",
            username: "gizem_traveller",
            avatar: "https://example.com/avatar43.png",
        },
        created_at: new Date("2024-11-14").toISOString(),
        tags: [
            {
                id: "tag-travel",
                name: "TRAVEL",
            },
        ],
    },
    {
        id: "beverages-quiz-1",
        type: 1,
        title: "Beverages Translation Quiz",
        description:
            "Learn the Turkish translations for various beverages from English.",
        author: {
            full_name: "Kaan Duran",
            username: "kaan_beverages",
            avatar: "https://example.com/avatar44.png",
        },
        created_at: new Date("2024-11-15").toISOString(),
        tags: [
            {
                id: "tag-beverages",
                name: "BEVERAGES",
            },
        ],
    },
    {
        id: "politics-quiz-1",
        type: 1,
        title: "Political Terms Quiz",
        description: "What is the meaning of these political terms?",
        author: {
            full_name: "Murat Ozkan",
            username: "murat_politics",
            avatar: "https://example.com/avatar45.png",
        },
        created_at: new Date("2024-11-16").toISOString(),
        tags: [
            {
                id: "tag-politics",
                name: "POLITICS",
            },
        ],
    },
    {
        id: "engineering-quiz-1",
        type: 1,
        title: "Engineering Vocabulary Quiz",
        description:
            "Test your knowledge of engineering terms and their meanings.",
        author: {
            full_name: "Fatma Kilic",
            username: "fatma_engineer",
            avatar: "https://example.com/avatar46.png",
        },
        created_at: new Date("2024-11-17").toISOString(),
        tags: [
            {
                id: "tag-engineering",
                name: "ENGINEERING",
            },
        ],
    },
    {
        id: "fashion-quiz-1",
        type: 1,
        title: "Fashion Terms Quiz",
        description: "What do these common fashion-related terms mean?",
        author: {
            full_name: "Ece Cinar",
            username: "ece_fashion",
            avatar: "https://example.com/avatar47.png",
        },
        created_at: new Date("2024-11-18").toISOString(),
        tags: [
            {
                id: "tag-fashion",
                name: "FASHION",
            },
        ],
    },
    {
        id: "marketing-quiz-1",
        type: 1,
        title: "Marketing Vocabulary Quiz",
        description: "Learn the meaning of common marketing terms in English.",
        author: {
            full_name: "Baris Demir",
            username: "baris_marketer",
            avatar: "https://example.com/avatar48.png",
        },
        created_at: new Date("2024-11-19").toISOString(),
        tags: [
            {
                id: "tag-marketing",
                name: "MARKETING",
            },
        ],
    },
    {
        id: "astronomy-quiz-1",
        type: 1,
        title: "Astronomy Vocabulary Quiz",
        description:
            "What is the meaning of these terms related to space and astronomy?",
        author: {
            full_name: "Sena Uzun",
            username: "sena_astronomy",
            avatar: "https://example.com/avatar49.png",
        },
        created_at: new Date("2024-11-20").toISOString(),
        tags: [
            {
                id: "tag-astronomy",
                name: "ASTRONOMY",
            },
        ],
    },
];

export const carTerms = [
    {
        en: "trunk",
        tr: "bagaj",
        sense: "The enclosed space at the back of a car for carrying luggage or other items.",
    },
    {
        en: "hood",
        tr: "kaput",
        sense: "The hinged cover that rests over the engine of a car.",
    },
    {
        en: "steering wheel",
        tr: "direksiyon",
        sense: "The wheel in a vehicle that the driver uses to control the direction.",
    },
    {
        en: "engine",
        tr: "motor",
        sense: "The part of a vehicle that converts fuel into power to make the vehicle move.",
    },
    {
        en: "brakes",
        tr: "frenler",
        sense: "The system used to slow down or stop a vehicle.",
    },
    {
        en: "tire",
        tr: "lastik",
        sense: "A rubber covering around a wheel, typically filled with air.",
    },
    {
        en: "mirror",
        tr: "ayna",
        sense: "A reflective surface on a vehicle to see what’s behind or beside it.",
    },
    {
        en: "headlight",
        tr: "far",
        sense: "A powerful light at the front of a vehicle for visibility in darkness or fog.",
    },
    {
        en: "gearbox",
        tr: "vites kutusu",
        sense: "The system of gears in a vehicle that adjusts speed and power output.",
    },
    {
        en: "windshield",
        tr: "ön cam",
        sense: "The large glass window at the front of a vehicle that protects passengers from the wind.",
    },
    {
        en: "dashboard",
        tr: "gösterge paneli",
        sense: "The panel in front of the driver, containing controls and instruments.",
    },
    {
        en: "seat belt",
        tr: "emniyet kemeri",
        sense: "A safety strap in a vehicle that secures passengers to prevent injury.",
    },
    {
        en: "accelerator",
        tr: "gaz pedalı",
        sense: "The pedal in a car that controls the speed of the engine, making it go faster.",
    },
    {
        en: "brake pedal",
        tr: "fren pedalı",
        sense: "The pedal in a vehicle used to slow down or stop the car.",
    },
    {
        en: "clutch",
        tr: "debriyaj",
        sense: "A mechanism in a car with manual transmission that engages and disengages the power from the engine to the transmission.",
    },
    {
        en: "fuel tank",
        tr: "yakıt tankı",
        sense: "The container in a vehicle that holds the fuel.",
    },
    {
        en: "radiator",
        tr: "radyatör",
        sense: "The part of a vehicle’s cooling system that cools the engine.",
    },
    {
        en: "exhaust",
        tr: "egzoz",
        sense: "The system that removes waste gases from the engine of a vehicle.",
    },
    {
        en: "ignition",
        tr: "ateşleme",
        sense: "The system used to ignite the fuel in a vehicle's engine.",
    },
    {
        en: "gear lever",
        tr: "vites kolu",
        sense: "A lever that the driver uses to change gears in a vehicle.",
    },
];

export const fruitTerms = [
    {
        en: "apple",
        tr: "elma",
        sense: "A round fruit with a sweet-tart flavor, typically red, green, or yellow in color.",
    },
    {
        en: "banana",
        tr: "muz",
        sense: "A long, curved fruit with a soft interior and yellow peel, rich in potassium.",
    },
    {
        en: "orange",
        tr: "portakal",
        sense: "A round, juicy citrus fruit with a thick orange skin, known for its vitamin C content.",
    },
    {
        en: "grape",
        tr: "üzüm",
        sense: "A small, round fruit that grows in bunches, used for eating, making juice, or wine.",
    },
    {
        en: "watermelon",
        tr: "karpuz",
        sense: "A large fruit with a thick green rind and sweet, juicy red or pink flesh.",
    },
    {
        en: "strawberry",
        tr: "çilek",
        sense: "A small, red, juicy fruit with tiny seeds on its surface, known for its sweet taste.",
    },
    {
        en: "pineapple",
        tr: "ananas",
        sense: "A tropical fruit with rough, spiky skin and sweet, juicy yellow flesh.",
    },
    {
        en: "cherry",
        tr: "kiraz",
        sense: "A small, round, red or black fruit with a pit, known for its juicy, sweet taste.",
    },
    {
        en: "pear",
        tr: "armut",
        sense: "A sweet, bell-shaped fruit that is typically green or yellow.",
    },
    {
        en: "peach",
        tr: "şeftali",
        sense: "A soft, round fruit with fuzzy skin and sweet, juicy flesh, usually yellow or pink.",
    },
    {
        en: "lemon",
        tr: "limon",
        sense: "A yellow, sour citrus fruit, often used for its juice or zest.",
    },
    {
        en: "mango",
        tr: "mango",
        sense: "A tropical fruit with sweet, juicy orange flesh and a large pit inside.",
    },
    {
        en: "kiwi",
        tr: "kivi",
        sense: "A small, brown fruit with fuzzy skin and bright green, tangy flesh.",
    },
    {
        en: "blueberry",
        tr: "yaban mersini",
        sense: "A small, round, blue or purple fruit known for its sweet and slightly tart flavor.",
    },
    {
        en: "pomegranate",
        tr: "nar",
        sense: "A round fruit with thick, reddish skin and many small seeds covered in juicy, sweet-tart pulp.",
    },
];

export const animalTerms = [
    {
        en: "cat",
        tr: "kedi",
        sense: "A small domesticated carnivorous mammal with soft fur, a short snout, and retractable claws.",
    },
    {
        en: "dog",
        tr: "köpek",
        sense: "A domesticated carnivorous mammal known for its loyalty and companionship to humans.",
    },
    {
        en: "lion",
        tr: "aslan",
        sense: "A large wild cat with a mane, known as the 'king of the jungle,' native to Africa and India.",
    },
    {
        en: "elephant",
        tr: "fil",
        sense: "A large mammal with a long trunk, tusks, and thick skin, native to Africa and Asia.",
    },
    {
        en: "rabbit",
        tr: "tavşan",
        sense: "A small herbivorous mammal with long ears, a short tail, and strong hind legs for hopping.",
    },
    {
        en: "wolf",
        tr: "kurt",
        sense: "A wild carnivorous mammal, related to dogs, known for living and hunting in packs.",
    },
    {
        en: "bear",
        tr: "ayı",
        sense: "A large omnivorous mammal with thick fur and a short tail, known for hibernating in winter.",
    },
    {
        en: "horse",
        tr: "at",
        sense: "A large domesticated animal known for its speed, strength, and use in transportation or farming.",
    },
    {
        en: "fish",
        tr: "balık",
        sense: "A cold-blooded aquatic vertebrate with gills and fins, living in water.",
    },
    {
        en: "bird",
        tr: "kuş",
        sense: "A warm-blooded egg-laying vertebrate with feathers, wings, and a beak, most species capable of flying.",
    },
    {
        en: "fox",
        tr: "tilki",
        sense: "A small wild carnivore known for its sharp senses and cunning behavior.",
    },
    {
        en: "giraffe",
        tr: "zürafa",
        sense: "The tallest land animal, with a long neck and legs, native to Africa.",
    },
    {
        en: "penguin",
        tr: "penguen",
        sense: "A flightless bird that lives in cold regions, known for its upright posture and ability to swim.",
    },
    {
        en: "tiger",
        tr: "kaplan",
        sense: "A large wild cat with distinctive black stripes, native to Asia.",
    },
    {
        en: "kangaroo",
        tr: "kanguru",
        sense: "A large marsupial native to Australia, known for its strong hind legs and long tail used for jumping.",
    },
];
type TermKey = keyof Term;

const generateQuiz = (type: number) => {
    const shuffleArray = <T>(array: T[]): T[] =>
        [...array].sort(() => Math.random() - 0.5);

    const createOptions = (
        term: Term,
        termsArray: Term[],
        correctAnswerKey: TermKey,
        optionKey: TermKey,
    ): Options[] => {
        const shuffledTerms = shuffleArray([...termsArray]);
        const wrongOptions = shuffledTerms
            .filter((t) => t[correctAnswerKey] !== term[correctAnswerKey])
            .slice(0, 3);

        return shuffleArray([
            ...wrongOptions.map((t) => ({
                id: `${t[correctAnswerKey]}-${Math.random()}`,
                text: t[optionKey],
                is_correct: "false",
            })),
            {
                id: `${term[correctAnswerKey]}-${Math.random()}`,
                text: term[optionKey],
                is_correct: "true",
            },
        ]);
    };

    const createQuestion = (term: Term, text: string, options: Options[]) => ({
        id: `${term.en}-${Math.random()}`,
        text,
        options,
        selected_option_id: "",
    });

    const getQuestions = (
        termsArray: Term[],
        textGenerator: (term: Term) => string,
        correctAnswerKey: TermKey,
        optionKey: TermKey,
    ) =>
        termsArray.map((term) =>
            createQuestion(
                term,
                textGenerator(term),
                createOptions(term, termsArray, correctAnswerKey, optionKey),
            ),
        );

    if (type === 1) {
        // Type 1: Asking for English translations of Turkish car terms
        return shuffleArray(
            getQuestions(
                carTerms,
                (term) => `What is the English translation of "${term.tr}"?`,
                "tr",
                "en",
            ),
        ).slice(0, 10);
    } else if (type === 2) {
        // Type 2: Asking for Turkish translations of English animal terms
        return shuffleArray(
            getQuestions(
                animalTerms,
                (term) => `What is the Turkish translation of "${term.en}"?`,
                "en",
                "tr",
            ),
        ).slice(0, 10);
    } else if (type === 3) {
        // Type 3: Asking for the English meaning of fruits
        return shuffleArray(
            getQuestions(
                fruitTerms,
                (term) => `What is the meaning of the word "${term.en}"?`,
                "en",
                "sense",
            ),
        ).slice(0, 10);
    }

    return [];
};

export const quizDataType1 = generateQuiz(1);
export const quizDataType2 = generateQuiz(2);
export const quizDataType3 = generateQuiz(3);
