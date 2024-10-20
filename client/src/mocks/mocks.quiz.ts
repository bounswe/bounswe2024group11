import { Term } from "../types/mockTerm";
import { QuizOverview } from "../types/quiz";
import { Options } from "../types/quizQuestion";

export const quizOverviews: QuizOverview[] = [
    {
        id: "1",
        type: 1,
        title: "Fruits",
        description:
            "In this quiz you match descriptions of the fruits with the name of the fruits. I hope you like it.",
        author: {
            full_name: "Hasan Kerem Şeker",
            username: "kerem_s54",
            avatar: "https://randomuser.me/api/portraits/men/46.jpg",
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
                name: "food",
            },
            {
                id: "3",
                name: "fruits",
            },
            {
                id: "4",
                name: "apple",
            },
        ],
    },
    {
        id: "2",
        type: 2,
        title: "Cars!",
        description:
            "Let's translate car terms to Turkish. Excellent for intermediate learners.",
        author: {
            full_name: "Ümit Can Evleksiz",
            username: "umitev_07",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        created_at: "2024-10-20T13:23:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 125,
        question_count: 10,
        rating: {
            score: 2,
            count: 1200,
        },
        tags: [
            {
                id: "31",
                name: "car",
            },
            {
                id: "4",
                name: "vehicle",
            },
        ],
    },
    {
        id: "3",
        type: 3,
        title: "I love Dogs",
        description:
            "I like all animals but I love dogs most. If you also like animals, I believe you will enjoy this quiz.",
        author: {
            full_name: "Kemal Kaya",
            username: "kemal_k_2023",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        created_at: "2021-10-01T00:00:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 313,
        question_count: 10,
        rating: {
            score: 3.7,
            count: 10,
        },
        tags: [
            {
                id: "2",
                name: "dog",
            },
            {
                id: "3",
                name: "animals",
            },
            {
                id: "4",
                name: "cats",
            },
        ],
    },
    {
        id: "4",
        type: 1,
        title: "Party Time",
        description:
            "This quiz is for party animals. Let's see how well you know your words.",
        author: {
            full_name: "Ayşe Kabakçı",
            username: "kabakci_a24",
            avatar: "https://randomuser.me/api/portraits/women/31.jpg",
        },
        created_at: "2024-10-20T13:23:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 392,
        question_count: 14,
        rating: {
            score: 4.2,
            count: 12000,
        },
        tags: [
            {
                id: "31",
                name: "party",
            },
        ],
    },
    {
        id: "5",
        type: 1,
        title: "Literary Landscapes",
        description:
            "Explore the world of literature with terms related to genres, literary devices, and famous works.",
        author: {
            full_name: "Emre Kaya",
            username: "emrek_lit",
            avatar: "https://randomuser.me/api/portraits/men/16.jpg",
        },
        created_at: "2024-11-19T13:15:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 765,
        question_count: 20,
        rating: {
            score: 4.6,
            count: 687,
        },
        tags: [
            { id: "95", name: "literature" },
            { id: "96", name: "books" },
            { id: "97", name: "writing" },
        ],
    },
    {
        id: "6",
        type: 2,
        title: "Social Media Savvy",
        description:
            "Get fluent in the language of likes, shares, and hashtags with this social media terminology quiz.",
        author: {
            full_name: "Selin Demir",
            username: "demir_sel2021",
            avatar: "https://randomuser.me/api/portraits/women/16.jpg",
        },
        created_at: "2024-11-20T09:30:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 2109,
        question_count: 15,
        rating: {
            score: 3.9,
            count: 1876,
        },
        tags: [
            { id: "98", name: "social media" },
            { id: "99", name: "internet" },
            { id: "100", name: "technology" },
        ],
    },
    {
        id: "7",
        type: 3,
        title: "Sports Fanatic",
        description:
            "Score big with this comprehensive quiz on sports terminology from various athletic disciplines.",
        author: {
            full_name: "Ali Yıldız",
            username: "yildiz_ali15",
            avatar: "https://randomuser.me/api/portraits/men/17.jpg",
        },
        created_at: "2024-11-21T11:45:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1543,
        question_count: 18,
        rating: {
            score: 4.2,
            count: 1398,
        },
        tags: [
            { id: "101", name: "sports" },
            { id: "102", name: "athletics" },
            { id: "103", name: "games" },
        ],
    },
    {
        id: "8",
        type: 1,
        title: "Architectural Wonders",
        description:
            "Build your vocabulary with terms related to architecture, design, and famous structures.",
        author: {
            full_name: "Zeynep Aksoy",
            username: "aksoy_z14",
            avatar: "https://randomuser.me/api/portraits/women/17.jpg",
        },
        created_at: "2024-11-22T14:00:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 876,
        question_count: 20,
        rating: {
            score: 4.7,
            count: 765,
        },
        tags: [
            { id: "104", name: "architecture" },
            { id: "105", name: "design" },
            { id: "106", name: "buildings" },
            { id: "107", name: "art" },
        ],
    },
    {
        id: "9",
        type: 2,
        title: "Philosophy 101",
        description:
            "Think deeply about the meanings of philosophical terms and concepts in this thought-provoking quiz.",
        author: {
            full_name: "Mehmet Öztürk",
            username: "mehmet_philos27",
            avatar: "https://randomuser.me/api/portraits/men/18.jpg",
        },
        created_at: "2024-11-23T10:30:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 654,
        question_count: 15,
        rating: {
            score: 4.5,
            count: 587,
        },
        tags: [
            { id: "108", name: "philosophy" },
            { id: "109", name: "thinking" },
            { id: "110", name: "concepts" },
        ],
    },
    {
        id: "10",
        type: 3,
        title: "Body Talk",
        description:
            "Get to know the human body inside and out with this quiz on anatomy and physiology terms.",
        author: {
            full_name: "Ayşe Yılmaz",
            username: "aysey_90",
            avatar: "https://randomuser.me/api/portraits/women/18.jpg",
        },
        created_at: "2024-11-24T13:15:00Z",
        difficulty: "medium",
        is_taken: true,
        num_taken: 1234,
        question_count: 20,
        rating: {
            score: 4.3,
            count: 1098,
        },
        tags: [
            { id: "111", name: "anatomy" },
            { id: "112", name: "health" },
            { id: "113", name: "science" },
        ],
    },
    {
        id: "11",
        type: 1,
        title: "Green Energy",
        description:
            "Power up your vocabulary with terms related to renewable energy and sustainable technologies.",
        author: {
            full_name: "Cem Kaya",
            username: "cemk",
            avatar: "https://randomuser.me/api/portraits/men/19.jpg",
        },
        created_at: "2024-11-25T09:45:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 987,
        question_count: 18,
        rating: {
            score: 4.1,
            count: 876,
        },
        tags: [
            { id: "114", name: "energy" },
            { id: "115", name: "environment" },
            { id: "116", name: "technology" },
        ],
    },
    {
        id: "12",
        type: 2,
        title: "Legal Lingo",
        description:
            "Order in the court! Learn essential legal terminology in this justice-themed quiz.",
        author: {
            full_name: "Elif Demir",
            username: "elifd",
            avatar: "https://randomuser.me/api/portraits/women/19.jpg",
        },
        created_at: "2024-11-26T11:30:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 765,
        question_count: 15,
        rating: {
            score: 4.4,
            count: 698,
        },
        tags: [
            { id: "117", name: "law" },
            { id: "118", name: "justice" },
            { id: "119", name: "government" },
        ],
    },
    {
        id: "13",
        type: 3,
        title: "Wanderlust",
        description:
            "Embark on a linguistic journey with travel-related terms and phrases from around the world.",
        author: {
            full_name: "Ahmet Yıldırım",
            username: "ahmety",
            avatar: "https://randomuser.me/api/portraits/men/20.jpg",
        },
        created_at: "2024-11-27T14:00:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 1876,
        question_count: 20,
        rating: {
            score: 4.0,
            count: 1654,
        },
        tags: [
            { id: "120", name: "travel" },
            { id: "121", name: "culture" },
            { id: "122", name: "geography" },
        ],
    },
    {
        id: "14",
        type: 1,
        title: "Digital Revolution",
        description:
            "Navigate the world of emerging technologies with this quiz on cutting-edge digital innovations.",
        author: {
            full_name: "Zehra Çelik",
            username: "zehrac",
            avatar: "https://randomuser.me/api/portraits/women/20.jpg",
        },
        created_at: "2024-11-28T10:15:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1098,
        question_count: 18,
        rating: {
            score: 4.2,
            count: 987,
        },
        tags: [
            { id: "123", name: "technology" },
            { id: "124", name: "innovation" },
            { id: "125", name: "digital" },
        ],
    },
    {
        id: "15",
        type: 2,
        title: "Mythical Beasts",
        description:
            "Explore the fantastical world of mythology with this quiz on legendary creatures and deities.",
        author: {
            full_name: "Mustafa Aydın",
            username: "mustafaa",
            avatar: "https://randomuser.me/api/portraits/men/21.jpg",
        },
        created_at: "2024-11-29T13:30:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 876,
        question_count: 15,
        rating: {
            score: 4.6,
            count: 765,
        },
        tags: [
            { id: "126", name: "mythology" },
            { id: "127", name: "legends" },
            { id: "128", name: "folklore" },
        ],
    },
    {
        id: "16",
        type: 3,
        title: "Cosmic Voyager",
        description:
            "Blast off into the universe of astronomy and space exploration terminology.",
        author: {
            full_name: "Aylin Kaya",
            username: "aylink",
            avatar: "https://randomuser.me/api/portraits/women/21.jpg",
        },
        created_at: "2024-11-30T09:45:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 654,
        question_count: 20,
        rating: {
            score: 4.8,
            count: 587,
        },
        tags: [
            { id: "129", name: "space" },
            { id: "130", name: "astronomy" },
            { id: "131", name: "science" },
        ],
    },
    {
        id: "17",
        type: 1,
        title: "Culinary Chronicles",
        description:
            "Spice up your vocabulary with cooking techniques, ingredients, and global cuisine terms.",
        author: {
            full_name: "Emre Arslan",
            username: "emrea",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        },
        created_at: "2024-12-01T11:00:00Z",
        difficulty: "medium",
        is_taken: true,
        num_taken: 1543,
        question_count: 18,
        rating: {
            score: 4.3,
            count: 1398,
        },
        tags: [
            { id: "132", name: "cooking" },
            { id: "133", name: "food" },
            { id: "134", name: "cuisine" },
        ],
    },
    {
        id: "18",
        type: 2,
        title: "Economic Essentials",
        description:
            "Invest in your vocabulary with this quiz on financial and economic terminology.",
        author: {
            full_name: "Selin Yıldız",
            username: "seliny",
            avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        },
        created_at: "2024-12-02T14:15:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 765,
        question_count: 15,
        rating: {
            score: 4.5,
            count: 698,
        },
        tags: [
            { id: "135", name: "economics" },
            { id: "136", name: "finance" },
            { id: "137", name: "business" },
        ],
    },
    {
        id: "19",
        type: 3,
        title: "Artisan's Lexicon",
        description:
            "Craft your knowledge of traditional and modern artisanal techniques and materials.",
        author: {
            full_name: "Can Demir",
            username: "cand",
            avatar: "https://randomuser.me/api/portraits/men/23.jpg",
        },
        created_at: "2024-12-03T10:30:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 987,
        question_count: 20,
        rating: {
            score: 4.1,
            count: 876,
        },
        tags: [
            { id: "138", name: "crafts" },
            { id: "139", name: "art" },
            { id: "140", name: "skills" },
        ],
    },
    {
        id: "20",
        type: 1,
        title: "Wellness Journey",
        description:
            "Nurture your health vocabulary with terms related to fitness, nutrition, and mental well-being.",
        author: {
            full_name: "Zeynep Öztürk",
            username: "zeynepo",
            avatar: "https://randomuser.me/api/portraits/women/23.jpg",
        },
        created_at: "2024-12-04T13:45:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 2109,
        question_count: 18,
        rating: {
            score: 4.0,
            count: 1987,
        },
        tags: [
            { id: "141", name: "health" },
            { id: "142", name: "wellness" },
            { id: "143", name: "lifestyle" },
        ],
    },
    {
        id: "21",
        type: 1,
        title: "First Impressions",
        description:
            "Master the art of introductions with essential greetings and conversation starters.",
        author: {
            full_name: "Mehmet Yılmaz",
            username: "mehmetylmz",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        created_at: "2024-10-20T09:00:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 1827,
        question_count: 12,
        rating: {
            score: 4.2,
            count: 1453,
        },
        tags: [
            { id: "1", name: "greetings" },
            { id: "2", name: "beginner" },
        ],
    },
    {
        id: "22",
        type: 2,
        title: "Market Mayhem",
        description:
            "Navigate a bustling bazaar like a local! Learn names of produce and common market phrases.",
        author: {
            full_name: "Ayşe Kaya",
            username: "aysekaya",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        created_at: "2024-10-21T14:30:00Z",
        difficulty: "medium",
        is_taken: true,
        num_taken: 956,
        question_count: 15,
        rating: {
            score: 3.8,
            count: 782,
        },
        tags: [
            { id: "4", name: "shopping" },
            { id: "5", name: "food" },
            { id: "6", name: "daily life" },
            { id: "7", name: "vocabulary" },
        ],
    },
    {
        id: "23",
        type: 3,
        title: "Colorful Expressions",
        description:
            "Dive into the vivid world of adjectives and their unexpected uses in everyday speech.",
        author: {
            full_name: "Ali Öztürk",
            username: "aliozturk",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        created_at: "2024-10-22T11:15:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1103,
        question_count: 18,
        rating: {
            score: 4.9,
            count: 967,
        },
        tags: [
            { id: "8", name: "adjectives" },
            { id: "9", name: "colloquial" },
        ],
    },
    {
        id: "24",
        type: 1,
        title: "Body Language",
        description:
            "A fun, musical journey through the names for body parts. Great for kinesthetic learners!",
        author: {
            full_name: "Zeynep Demir",
            username: "zeynepd",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        created_at: "2024-10-23T16:45:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 2145,
        question_count: 20,
        rating: {
            score: 4.6,
            count: 1876,
        },
        tags: [
            { id: "10", name: "body" },
            { id: "11", name: "songs" },
            { id: "12", name: "interactive" },
            { id: "13", name: "beginner" },
            { id: "14", name: "vocabulary" },
        ],
    },
    {
        id: "25",
        type: 2,
        title: "Action Packed",
        description:
            "From daily routines to weekend adventures, learn vital verbs to narrate your day.",
        author: {
            full_name: "Mustafa Şahin",
            username: "mustafas",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        created_at: "2024-10-24T10:00:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1578,
        question_count: 25,
        rating: {
            score: 3.4,
            count: 1309,
        },
        tags: [
            { id: "15", name: "verbs" },
            { id: "16", name: "daily activities" },
        ],
    },
    {
        id: "26",
        type: 3,
        title: "Words of Wisdom",
        description:
            "Unpack the meanings behind popular proverbs and their cultural significance.",
        author: {
            full_name: "Elif Yıldız",
            username: "elifyildiz",
            avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        },
        created_at: "2024-10-25T13:20:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 789,
        question_count: 15,
        rating: {
            score: 4.7,
            count: 652,
        },
        tags: [
            { id: "17", name: "proverbs" },
            { id: "18", name: "culture" },
            { id: "19", name: "advanced" },
        ],
    },
    {
        id: "27",
        type: 1,
        title: "By the Numbers",
        description:
            "From bargaining to banking, master the art of using numbers in everyday situations.",
        author: {
            full_name: "Emre Kaya",
            username: "emrekaya",
            avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        },
        created_at: "2024-10-26T09:15:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 2367,
        question_count: 20,
        rating: {
            score: 4.1,
            count: 2098,
        },
        tags: [
            { id: "20", name: "numbers" },
            { id: "21", name: "practical" },
            { id: "22", name: "money" },
            { id: "23", name: "beginner" },
        ],
    },
    {
        id: "28",
        type: 2,
        title: "Seasonal Splendor",
        description:
            "Experience the year through seasonal vocabulary, festivities, and weather expressions.",
        author: {
            full_name: "Selin Arslan",
            username: "selinarslan",
            avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        },
        created_at: "2024-10-27T11:30:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1234,
        question_count: 18,
        rating: {
            score: 3.6,
            count: 1087,
        },
        tags: [
            { id: "24", name: "seasons" },
            { id: "25", name: "cultural events" },
        ],
    },
    {
        id: "29",
        type: 3,
        title: "Street Smarts",
        description:
            "Get savvy with popular idioms and their sometimes surprising meanings.",
        author: {
            full_name: "Can Yılmaz",
            username: "canyilmaz",
            avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        },
        created_at: "2024-10-28T14:45:00Z",
        difficulty: "hard",
        is_taken: true,
        num_taken: 876,
        question_count: 15,
        rating: {
            score: 4.8,
            count: 743,
        },
        tags: [
            { id: "26", name: "slang" },
            { id: "27", name: "youth culture" },
            { id: "28", name: "informal speech" },
            { id: "29", name: "advanced" },
        ],
    },
    {
        id: "30",
        type: 1,
        title: "Family Ties",
        description:
            "Navigate the complex web of family terms and etiquette for addressing relatives.",
        author: {
            full_name: "Zehra Çelik",
            username: "zehracelik",
            avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        },
        created_at: "2024-10-29T10:00:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 1987,
        question_count: 15,
        rating: {
            score: 2.9,
            count: 1765,
        },
        tags: [
            { id: "30", name: "family" },
            { id: "31", name: "relationships" },
        ],
    },
    {
        id: "31",
        type: 2,
        title: "Culinary Adventures",
        description:
            "Explore a world of flavors through traditional dishes and cooking terminology.",
        author: {
            full_name: "Ahmet Demir",
            username: "ahmetd",
            avatar: "https://randomuser.me/api/portraits/men/6.jpg",
        },
        created_at: "2024-10-30T08:20:00Z",
        difficulty: "medium",
        is_taken: true,
        num_taken: 1456,
        question_count: 20,
        rating: {
            score: 4.3,
            count: 1287,
        },
        tags: [
            { id: "32", name: "food" },
            { id: "33", name: "cuisine" },
            { id: "34", name: "cooking" },
        ],
    },
    {
        id: "32",
        type: 3,
        title: "Tech Talk",
        description:
            "Decode the jargon of the digital age with this technology-focused vocabulary quiz.",
        author: {
            full_name: "Selin Yılmaz",
            username: "seliny",
            avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        },
        created_at: "2024-10-31T11:45:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 789,
        question_count: 15,
        rating: {
            score: 3.9,
            count: 645,
        },
        tags: [
            { id: "35", name: "technology" },
            { id: "36", name: "modern" },
            { id: "37", name: "computers" },
            { id: "38", name: "internet" },
        ],
    },
    {
        id: "33",
        type: 1,
        title: "Animal Kingdom",
        description:
            "From pets to wildlife, expand your animal vocabulary with this fun and informative quiz.",
        author: {
            full_name: "Mustafa Öztürk",
            username: "mustafao",
            avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        },
        created_at: "2024-11-01T09:30:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 2134,
        question_count: 18,
        rating: {
            score: 4.7,
            count: 1876,
        },
        tags: [
            { id: "39", name: "animals" },
            { id: "40", name: "nature" },
        ],
    },
    {
        id: "34",
        type: 2,
        title: "Office Lingo",
        description:
            "Navigate the corporate world with essential business and office-related vocabulary.",
        author: {
            full_name: "Ayşe Kara",
            username: "aysek",
            avatar: "https://randomuser.me/api/portraits/women/7.jpg",
        },
        created_at: "2024-11-02T14:15:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1023,
        question_count: 20,
        rating: {
            score: 3.8,
            count: 897,
        },
        tags: [
            { id: "41", name: "business" },
            { id: "42", name: "office" },
            { id: "43", name: "professional" },
        ],
    },
    {
        id: "35",
        type: 3,
        title: "Poetic License",
        description:
            "Unravel the beauty of figurative language and poetic devices in this literary quiz.",
        author: {
            full_name: "Emre Aydın",
            username: "emrea",
            avatar: "https://randomuser.me/api/portraits/men/8.jpg",
        },
        created_at: "2024-11-03T10:00:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 567,
        question_count: 15,
        rating: {
            score: 4.6,
            count: 489,
        },
        tags: [
            { id: "44", name: "poetry" },
            { id: "45", name: "literature" },
            { id: "46", name: "advanced" },
            { id: "47", name: "figurative language" },
        ],
    },
    {
        id: "36",
        type: 1,
        title: "Globe Trotter",
        description:
            "Embark on a linguistic journey around the world with geography and travel-related terms.",
        author: {
            full_name: "Zeynep Aksoy",
            username: "zeynepa",
            avatar: "https://randomuser.me/api/portraits/women/8.jpg",
        },
        created_at: "2024-11-04T13:30:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1345,
        question_count: 20,
        rating: {
            score: 4.2,
            count: 1198,
        },
        tags: [
            { id: "48", name: "travel" },
            { id: "49", name: "geography" },
            { id: "50", name: "culture" },
        ],
    },
    {
        id: "37",
        type: 2,
        title: "Sporty Spice",
        description:
            "Get in the game with sports terminology covering various athletic activities.",
        author: {
            full_name: "Ali Yıldırım",
            username: "aliy",
            avatar: "https://randomuser.me/api/portraits/men/9.jpg",
        },
        created_at: "2024-11-05T09:45:00Z",
        difficulty: "easy",
        is_taken: true,
        num_taken: 1876,
        question_count: 15,
        rating: {
            score: 3.9,
            count: 1654,
        },
        tags: [
            { id: "51", name: "sports" },
            { id: "52", name: "athletics" },
            { id: "53", name: "fitness" },
        ],
    },
    {
        id: "38",
        type: 3,
        title: "Legal Eagle",
        description:
            "Demystify legal jargon and understand common law-related terms and concepts.",
        author: {
            full_name: "Sema Erkut",
            username: "semae",
            avatar: "https://randomuser.me/api/portraits/women/9.jpg",
        },
        created_at: "2024-11-06T11:20:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 678,
        question_count: 20,
        rating: {
            score: 4.5,
            count: 542,
        },
        tags: [
            { id: "54", name: "law" },
            { id: "55", name: "legal" },
            { id: "56", name: "professional" },
            { id: "57", name: "advanced" },
        ],
    },
    {
        id: "39",
        type: 1,
        title: "Emotional Intelligence",
        description:
            "Expand your emotional vocabulary and learn to express feelings with nuance.",
        author: {
            full_name: "Cem Yılmaz",
            username: "cemy",
            avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        },
        created_at: "2024-11-07T14:00:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1234,
        question_count: 18,
        rating: {
            score: 4.4,
            count: 1087,
        },
        tags: [
            { id: "58", name: "emotions" },
            { id: "59", name: "psychology" },
            { id: "60", name: "self-improvement" },
        ],
    },
    {
        id: "40",
        type: 2,
        title: "Artistic Expressions",
        description:
            "Brush up on your art vocabulary with terms from various artistic movements and techniques.",
        author: {
            full_name: "Elif Demir",
            username: "elifd",
            avatar: "https://randomuser.me/api/portraits/women/10.jpg",
        },
        created_at: "2024-11-08T10:30:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 987,
        question_count: 15,
        rating: {
            score: 4.1,
            count: 876,
        },
        tags: [
            { id: "61", name: "art" },
            { id: "62", name: "culture" },
        ],
    },
    {
        id: "41",
        type: 3,
        title: "Melodies and Rhythms",
        description:
            "Tune into the world of music with this comprehensive quiz on musical terms and instruments.",
        author: {
            full_name: "Kerem Adalı",
            username: "kerema",
            avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        },
        created_at: "2024-11-09T12:15:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1543,
        question_count: 20,
        rating: {
            score: 4.6,
            count: 1298,
        },
        tags: [
            { id: "63", name: "music" },
            { id: "64", name: "instruments" },
            { id: "65", name: "arts" },
        ],
    },
    {
        id: "42",
        type: 1,
        title: "Celestial Bodies",
        description:
            "Explore the cosmos with this quiz on astronomical terms and space phenomena.",
        author: {
            full_name: "Aylin Yıldız",
            username: "ayliny",
            avatar: "https://randomuser.me/api/portraits/women/11.jpg",
        },
        created_at: "2024-11-10T09:30:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 876,
        question_count: 15,
        rating: {
            score: 4.3,
            count: 723,
        },
        tags: [
            { id: "66", name: "astronomy" },
            { id: "67", name: "science" },
            { id: "68", name: "space" },
        ],
    },
    {
        id: "43",
        type: 2,
        title: "Green Thumb",
        description:
            "Cultivate your gardening vocabulary with terms related to plants, flowers, and landscaping.",
        author: {
            full_name: "Mehmet Kaya",
            username: "mehmetk",
            avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        },
        created_at: "2024-11-11T14:45:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 2109,
        question_count: 18,
        rating: {
            score: 4.1,
            count: 1876,
        },
        tags: [
            { id: "69", name: "gardening" },
            { id: "70", name: "nature" },
            { id: "71", name: "plants" },
        ],
    },
    {
        id: "44",
        type: 3,
        title: "Silver Screen",
        description:
            "Lights, camera, action! Test your knowledge of cinema and film industry terminology.",
        author: {
            full_name: "Zehra Aksoy",
            username: "zehraa",
            avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        },
        created_at: "2024-11-12T11:00:00Z",
        difficulty: "medium",
        is_taken: true,
        num_taken: 1234,
        question_count: 20,
        rating: {
            score: 3.9,
            count: 1087,
        },
        tags: [
            { id: "72", name: "movies" },
            { id: "73", name: "entertainment" },
            { id: "74", name: "cinema" },
            { id: "75", name: "film" },
        ],
    },
    {
        id: "45",
        type: 1,
        title: "Digital Nomad",
        description:
            "Master the lingo of remote work and digital entrepreneurship in this modern workplace quiz.",
        author: {
            full_name: "Can Yılmaz",
            username: "cany",
            avatar: "https://randomuser.me/api/portraits/men/13.jpg",
        },
        created_at: "2024-11-13T13:30:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 987,
        question_count: 15,
        rating: {
            score: 4.4,
            count: 865,
        },
        tags: [
            { id: "76", name: "work" },
            { id: "77", name: "technology" },
            { id: "78", name: "business" },
        ],
    },
    {
        id: "46",
        type: 2,
        title: "Fashion Forward",
        description:
            "Strut your stuff with this quiz on fashion terminology, from haute couture to street style.",
        author: {
            full_name: "Elif Demir",
            username: "elifd",
            avatar: "https://randomuser.me/api/portraits/women/13.jpg",
        },
        created_at: "2024-11-14T10:15:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 1654,
        question_count: 18,
        rating: {
            score: 3.8,
            count: 1432,
        },
        tags: [
            { id: "79", name: "fashion" },
            { id: "80", name: "style" },
            { id: "81", name: "clothing" },
        ],
    },
    {
        id: "47",
        type: 3,
        title: "Mind Matters",
        description:
            "Delve into the world of psychology with terms related to mental health and human behavior.",
        author: {
            full_name: "Ahmet Yıldırım",
            username: "ahmety",
            avatar: "https://randomuser.me/api/portraits/men/14.jpg",
        },
        created_at: "2024-11-15T09:45:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 765,
        question_count: 20,
        rating: {
            score: 4.7,
            count: 654,
        },
        tags: [
            { id: "82", name: "psychology" },
            { id: "83", name: "mental health" },
            { id: "84", name: "behavior" },
            { id: "85", name: "science" },
        ],
    },
    {
        id: "48",
        type: 1,
        title: "Eco Warrior",
        description:
            "Save the planet one word at a time with this quiz on environmental terms and sustainability.",
        author: {
            full_name: "Ayşe Çelik",
            username: "aysec",
            avatar: "https://randomuser.me/api/portraits/women/14.jpg",
        },
        created_at: "2024-11-16T14:00:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1098,
        question_count: 15,
        rating: {
            score: 4.2,
            count: 976,
        },
        tags: [
            { id: "86", name: "environment" },
            { id: "87", name: "sustainability" },
            { id: "88", name: "nature" },
        ],
    },
    {
        id: "49",
        type: 2,
        title: "Time Traveler",
        description:
            "Journey through the ages with this quiz on historical events, figures, and eras.",
        author: {
            full_name: "Mustafa Kara",
            username: "mustafak",
            avatar: "https://randomuser.me/api/portraits/men/15.jpg",
        },
        created_at: "2024-11-17T11:30:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 876,
        question_count: 20,
        rating: {
            score: 4.5,
            count: 765,
        },
        tags: [
            { id: "89", name: "history" },
            { id: "90", name: "events" },
            { id: "91", name: "people" },
        ],
    },
    {
        id: "50",
        type: 3,
        title: "Foodie's Delight",
        description:
            "Savor the flavors of culinary terms, cooking techniques, and global cuisines.",
        author: {
            full_name: "Zeynep Yılmaz",
            username: "zeynepy",
            avatar: "https://randomuser.me/api/portraits/women/15.jpg",
        },
        created_at: "2024-11-18T10:00:00Z",
        difficulty: "medium",
        is_taken: true,
        num_taken: 1432,
        question_count: 18,
        rating: {
            score: 4.0,
            count: 1298,
        },
        tags: [
            { id: "92", name: "food" },
            { id: "93", name: "cooking" },
            { id: "94", name: "cuisine" },
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
