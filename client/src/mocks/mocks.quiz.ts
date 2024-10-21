import { Term } from "../types/mockTerm";
import { QuizOverview } from "../types/quiz";
import { Options } from "../types/quizQuestion";

export const quizOverviews: QuizOverview[] = [
    {
        id: "13",
        type: 1,
        title: "Emotions",
        description:
            "What is your proficiency on human emotions? Let us find out!",
        author: {
            full_name: "Arnold Jones",
            username: "cute_mittens",
            avatar: "https://randomuser.me/api/portraits/men/13.jpg",
        },
        created_at: "2024-06-19T19:56:17Z",
        difficulty: "medium",
        is_taken: true,
        num_taken: 271,
        question_count: 10,
        rating: {
            score: 4.7,
            count: 200,
        },
        tags: [
            {
                id: "471",
                name: "human",
            },
            {
                id: "8766",
                name: "feeling",
            },
        ],
    },
    {
        id: "14",
        type: 2,
        title: "Board Games",
        description:
            "If you like chess or checkers, you should take this quiz now. It is good ngl.",
        author: {
            full_name: "Boby Carlsen",
            username: "board_walker",
            avatar: "https://randomuser.me/api/portraits/men/57.jpg",
        },
        created_at: "2024-06-18T07:31:54Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 37,
        question_count: 8,
        rating: {
            score: 1.7,
            count: 14,
        },
        tags: [
            {
                id: "31",
                name: "chess",
            },
            {
                id: "9879",
                name: "fun",
            },
            {
                id: "41",
                name: "games",
            },
            {
                id: "464",
                name: "chess player",
            },
        ],
    },
    {
        id: "5",
        type: 3,
        title: "Seasons",
        description:
            "The Earth has four seasons. Do you know them? If you think you do, time to prove it!",
        author: {
            full_name: "Winston Jobs",
            username: "whether_dweller",
            avatar: "https://randomuser.me/api/portraits/women/13.jpg",
        },
        created_at: "2024-06-21T12:54:18Z",
        difficulty: "easy",
        is_taken: true,
        num_taken: 111,
        question_count: 12,
        rating: {
            score: 3.5,
            count: 99,
        },
        tags: [
            {
                id: "545",
                name: "seasons",
            },
            {
                id: "9879",
                name: "fun",
            },
            {
                id: "144",
                name: "earth",
            },
        ],
    },
    {
        id: "9",
        type: 1,
        title: "Computer Organization",
        description:
            "Memory, processor, hard disk, mouse, keyboard, and other parts of a computer.",
        author: {
            full_name: "Tuana Ümraniyeli",
            username: "tt_world",
            avatar: "https://randomuser.me/api/portraits/women/7.jpg",
        },
        created_at: "2024-06-22T07:17:17Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 357,
        question_count: 10,
        rating: {
            score: 4.8,
            count: 342,
        },
        tags: [
            {
                id: "1",
                name: "computer",
            },
        ],
    },
    {
        id: "2",
        type: 2,
        title: "World's Famous Foods",
        description: "Try to find the meaning of these delicious foods.",
        author: {
            full_name: "Heisenberg Cook",
            username: "the_cook06",
            avatar: "https://randomuser.me/api/portraits/men/44.jpg",
        },
        created_at: "2024-09-30T22:51:26Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 15,
        question_count: 5,
        rating: {
            score: 5.0,
            count: 8,
        },
        tags: [
            {
                id: "91",
                name: "food",
            },
            {
                id: "14",
                name: "world",
            },
            {
                id: "471",
                name: "human",
            },
        ],
    },
    {
        id: "551",
        type: 3,
        title: "Fruits",
        description:
            "In this quiz you match descriptions of the fruits with the name of the fruits. I hope you like it.",
        author: {
            full_name: "Hasan Kerem Şeker",
            username: "kerem_s54",
            avatar: "https://randomuser.me/api/portraits/men/46.jpg",
        },
        created_at: "2024-11-01T00:00:00Z",
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
                id: "552",
                name: "food",
            },
            {
                id: "553",
                name: "fruits",
            },
            {
                id: "554",
                name: "apple",
            },
        ],
    },
    {
        id: "552",
        type: 1,
        title: "Cars!",
        description:
            "Let's translate car terms to Turkish. Excellent for intermediate learners.",
        author: {
            full_name: "Ümit Can Evleksiz",
            username: "umitev_07",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        created_at: "2024-11-20T13:23:00Z",
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
                id: "5531",
                name: "car",
            },
            {
                id: "554",
                name: "vehicle",
            },
        ],
    },
    {
        id: "553",
        type: 2,
        title: "I love Dogs",
        description:
            "I like all animals but I love dogs most. If you also like animals, I believe you will enjoy this quiz.",
        author: {
            full_name: "Kemal Kaya",
            username: "kemal_k_2023",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        created_at: "2024-11-01T00:00:00Z",
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
                id: "552",
                name: "dog",
            },
            {
                id: "553",
                name: "animals",
            },
            {
                id: "554",
                name: "cats",
            },
        ],
    },
    {
        id: "554",
        type: 1,
        title: "Party Time",
        description:
            "This quiz is for party animals. Let's see how well you know your words.",
        author: {
            full_name: "Ayşe Kabakçı",
            username: "kabakci_a24",
            avatar: "https://randomuser.me/api/portraits/women/31.jpg",
        },
        created_at: "2024-06-20T13:23:00Z",
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
                id: "5531",
                name: "party",
            },
        ],
    },
    {
        id: "555",
        type: 1,
        title: "Literary Landscapes",
        description:
            "Explore the world of literature with terms related to genres, literary devices, and famous works.",
        author: {
            full_name: "Emre Kaya",
            username: "emrek_lit",
            avatar: "https://randomuser.me/api/portraits/men/16.jpg",
        },
        created_at: "2024-09-19T13:15:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 765,
        question_count: 20,
        rating: {
            score: 4.6,
            count: 687,
        },
        tags: [
            { id: "5595", name: "literature" },
            { id: "5596", name: "books" },
            { id: "5597", name: "writing" },
        ],
    },
    {
        id: "556",
        type: 2,
        title: "Social Media Savvy",
        description:
            "Get fluent in the language of likes, shares, and hashtags with this social media terminology quiz.",
        author: {
            full_name: "Selin Demir",
            username: "demir_sel2021",
            avatar: "https://randomuser.me/api/portraits/women/16.jpg",
        },
        created_at: "2024-09-20T09:30:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 2109,
        question_count: 15,
        rating: {
            score: 3.9,
            count: 1876,
        },
        tags: [
            { id: "5598", name: "social media" },
            { id: "5599", name: "internet" },
            { id: "55100", name: "technology" },
        ],
    },
    {
        id: "557",
        type: 3,
        title: "Sports Fanatic",
        description:
            "Score big with this comprehensive quiz on sports terminology from various athletic disciplines.",
        author: {
            full_name: "Ali Yıldız",
            username: "yildiz_ali15",
            avatar: "https://randomuser.me/api/portraits/men/17.jpg",
        },
        created_at: "2024-09-21T11:45:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1543,
        question_count: 18,
        rating: {
            score: 4.2,
            count: 1398,
        },
        tags: [
            { id: "55101", name: "sports" },
            { id: "55102", name: "athletics" },
            { id: "55103", name: "games" },
        ],
    },
    {
        id: "558",
        type: 1,
        title: "Architectural Wonders",
        description:
            "Build your vocabulary with terms related to architecture, design, and famous structures.",
        author: {
            full_name: "Zeynep Aksoy",
            username: "aksoy_z14",
            avatar: "https://randomuser.me/api/portraits/women/17.jpg",
        },
        created_at: "2024-09-22T14:00:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 876,
        question_count: 20,
        rating: {
            score: 4.7,
            count: 765,
        },
        tags: [
            { id: "55104", name: "architecture" },
            { id: "55105", name: "design" },
            { id: "55106", name: "buildings" },
            { id: "55107", name: "art" },
        ],
    },
    {
        id: "559",
        type: 2,
        title: "Philosophy 101",
        description:
            "Think deeply about the meanings of philosophical terms and concepts in this thought-provoking quiz.",
        author: {
            full_name: "Mehmet Öztürk",
            username: "mehmet_philos27",
            avatar: "https://randomuser.me/api/portraits/men/18.jpg",
        },
        created_at: "2024-09-23T10:30:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 654,
        question_count: 15,
        rating: {
            score: 4.5,
            count: 587,
        },
        tags: [
            { id: "55108", name: "philosophy" },
            { id: "55109", name: "thinking" },
            { id: "55110", name: "concepts" },
        ],
    },
    {
        id: "5510",
        type: 3,
        title: "Body Talk",
        description:
            "Get to know the human body inside and out with this quiz on anatomy and physiology terms.",
        author: {
            full_name: "Ayşe Yılmaz",
            username: "aysey_90",
            avatar: "https://randomuser.me/api/portraits/women/18.jpg",
        },
        created_at: "2024-09-24T13:15:00Z",
        difficulty: "medium",
        is_taken: true,
        num_taken: 1234,
        question_count: 20,
        rating: {
            score: 4.3,
            count: 1098,
        },
        tags: [
            { id: "55111", name: "anatomy" },
            { id: "55112", name: "health" },
            { id: "55113", name: "science" },
        ],
    },
    {
        id: "5511",
        type: 1,
        title: "Green Energy",
        description:
            "Power up your vocabulary with terms related to renewable energy and sustainable technologies.",
        author: {
            full_name: "Cem Kaya",
            username: "cemk",
            avatar: "https://randomuser.me/api/portraits/men/19.jpg",
        },
        created_at: "2024-09-25T09:45:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 987,
        question_count: 18,
        rating: {
            score: 4.1,
            count: 876,
        },
        tags: [
            { id: "55114", name: "energy" },
            { id: "55115", name: "environment" },
            { id: "55116", name: "technology" },
        ],
    },
    {
        id: "5512",
        type: 2,
        title: "Legal Lingo",
        description:
            "Order in the court! Learn essential legal terminology in this justice-themed quiz.",
        author: {
            full_name: "Elif Demir",
            username: "elifd",
            avatar: "https://randomuser.me/api/portraits/women/19.jpg",
        },
        created_at: "2024-09-26T11:30:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 765,
        question_count: 15,
        rating: {
            score: 4.4,
            count: 698,
        },
        tags: [
            { id: "55117", name: "law" },
            { id: "55118", name: "justice" },
            { id: "55119", name: "government" },
        ],
    },
    {
        id: "5513",
        type: 3,
        title: "Wanderlust",
        description:
            "Embark on a linguistic journey with travel-related terms and phrases from around the world.",
        author: {
            full_name: "Ahmet Yıldırım",
            username: "ahmety",
            avatar: "https://randomuser.me/api/portraits/men/20.jpg",
        },
        created_at: "2024-09-27T14:00:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 1876,
        question_count: 20,
        rating: {
            score: 4.0,
            count: 1654,
        },
        tags: [
            { id: "55120", name: "travel" },
            { id: "55121", name: "culture" },
            { id: "55122", name: "geography" },
        ],
    },
    {
        id: "5514",
        type: 1,
        title: "Digital Revolution",
        description:
            "Navigate the world of emerging technologies with this quiz on cutting-edge digital innovations.",
        author: {
            full_name: "Zehra Çelik",
            username: "zehrac",
            avatar: "https://randomuser.me/api/portraits/women/20.jpg",
        },
        created_at: "2024-09-28T10:15:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1098,
        question_count: 18,
        rating: {
            score: 4.2,
            count: 987,
        },
        tags: [
            { id: "55123", name: "technology" },
            { id: "55124", name: "innovation" },
            { id: "55125", name: "digital" },
        ],
    },
    {
        id: "5515",
        type: 2,
        title: "Mythical Beasts",
        description:
            "Explore the fantastical world of mythology with this quiz on legendary creatures and deities.",
        author: {
            full_name: "Mustafa Aydın",
            username: "mustafaa",
            avatar: "https://randomuser.me/api/portraits/men/21.jpg",
        },
        created_at: "2024-09-29T13:30:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 876,
        question_count: 15,
        rating: {
            score: 4.6,
            count: 765,
        },
        tags: [
            { id: "55126", name: "mythology" },
            { id: "55127", name: "legends" },
            { id: "55128", name: "folklore" },
        ],
    },
    {
        id: "5516",
        type: 3,
        title: "Cosmic Voyager",
        description:
            "Blast off into the universe of astronomy and space exploration terminology.",
        author: {
            full_name: "Aylin Kaya",
            username: "aylink",
            avatar: "https://randomuser.me/api/portraits/women/21.jpg",
        },
        created_at: "2024-09-30T09:45:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 654,
        question_count: 20,
        rating: {
            score: 4.8,
            count: 587,
        },
        tags: [
            { id: "55129", name: "space" },
            { id: "55130", name: "astronomy" },
            { id: "55131", name: "science" },
        ],
    },
    {
        id: "5517",
        type: 1,
        title: "Culinary Chronicles",
        description:
            "Spice up your vocabulary with cooking techniques, ingredients, and global cuisine terms.",
        author: {
            full_name: "Emre Arslan",
            username: "emrea",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        },
        created_at: "2024-09-01T11:00:00Z",
        difficulty: "medium",
        is_taken: true,
        num_taken: 1543,
        question_count: 18,
        rating: {
            score: 4.3,
            count: 1398,
        },
        tags: [
            { id: "55132", name: "cooking" },
            { id: "55133", name: "food" },
            { id: "55134", name: "cuisine" },
        ],
    },
    {
        id: "5518",
        type: 2,
        title: "Economic Essentials",
        description:
            "Invest in your vocabulary with this quiz on financial and economic terminology.",
        author: {
            full_name: "Selin Yıldız",
            username: "seliny",
            avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        },
        created_at: "2024-09-02T14:15:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 765,
        question_count: 15,
        rating: {
            score: 4.5,
            count: 698,
        },
        tags: [
            { id: "55135", name: "economics" },
            { id: "55136", name: "finance" },
            { id: "55137", name: "business" },
        ],
    },
    {
        id: "5519",
        type: 3,
        title: "Artisan's Lexicon",
        description:
            "Craft your knowledge of traditional and modern artisanal techniques and materials.",
        author: {
            full_name: "Can Demir",
            username: "cand",
            avatar: "https://randomuser.me/api/portraits/men/23.jpg",
        },
        created_at: "2024-09-03T10:30:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 987,
        question_count: 20,
        rating: {
            score: 4.1,
            count: 876,
        },
        tags: [
            { id: "55138", name: "crafts" },
            { id: "55139", name: "art" },
            { id: "55140", name: "skills" },
        ],
    },
    {
        id: "5520",
        type: 1,
        title: "Wellness Journey",
        description:
            "Nurture your health vocabulary with terms related to fitness, nutrition, and mental well-being.",
        author: {
            full_name: "Zeynep Öztürk",
            username: "zeynepo",
            avatar: "https://randomuser.me/api/portraits/women/23.jpg",
        },
        created_at: "2024-09-04T13:45:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 2109,
        question_count: 18,
        rating: {
            score: 4.0,
            count: 1987,
        },
        tags: [
            { id: "55141", name: "health" },
            { id: "55142", name: "wellness" },
            { id: "55143", name: "lifestyle" },
        ],
    },
    {
        id: "5521",
        type: 1,
        title: "First Impressions",
        description:
            "Master the art of introductions with essential greetings and conversation starters.",
        author: {
            full_name: "Mehmet Yılmaz",
            username: "mehmetylmz",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        created_at: "2024-06-20T09:00:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 1827,
        question_count: 12,
        rating: {
            score: 4.2,
            count: 1453,
        },
        tags: [
            { id: "551", name: "greetings" },
            { id: "552", name: "beginner" },
        ],
    },
    {
        id: "5522",
        type: 2,
        title: "Market Mayhem",
        description:
            "Navigate a bustling bazaar like a local! Learn names of produce and common market phrases.",
        author: {
            full_name: "Ayşe Kaya",
            username: "aysekaya",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        created_at: "2024-06-21T14:30:00Z",
        difficulty: "medium",
        is_taken: true,
        num_taken: 956,
        question_count: 15,
        rating: {
            score: 3.8,
            count: 782,
        },
        tags: [
            { id: "554", name: "shopping" },
            { id: "555", name: "food" },
            { id: "556", name: "daily life" },
            { id: "557", name: "vocabulary" },
        ],
    },
    {
        id: "5523",
        type: 3,
        title: "Colorful Expressions",
        description:
            "Dive into the vivid world of adjectives and their unexpected uses in everyday speech.",
        author: {
            full_name: "Ali Öztürk",
            username: "aliozturk",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        created_at: "2024-06-22T11:15:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1103,
        question_count: 18,
        rating: {
            score: 4.9,
            count: 967,
        },
        tags: [
            { id: "558", name: "adjectives" },
            { id: "559", name: "colloquial" },
        ],
    },
    {
        id: "5524",
        type: 1,
        title: "Body Language",
        description:
            "A fun, musical journey through the names for body parts. Great for kinesthetic learners!",
        author: {
            full_name: "Zeynep Demir",
            username: "zeynepd",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        created_at: "2024-06-23T16:45:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 2145,
        question_count: 20,
        rating: {
            score: 4.6,
            count: 1876,
        },
        tags: [
            { id: "5510", name: "body" },
            { id: "5511", name: "songs" },
            { id: "5512", name: "interactive" },
            { id: "5513", name: "beginner" },
            { id: "5514", name: "vocabulary" },
        ],
    },
    {
        id: "5525",
        type: 2,
        title: "Action Packed",
        description:
            "From daily routines to weekend adventures, learn vital verbs to narrate your day.",
        author: {
            full_name: "Mustafa Şahin",
            username: "mustafas",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        created_at: "2024-06-24T10:00:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1578,
        question_count: 25,
        rating: {
            score: 3.4,
            count: 1309,
        },
        tags: [
            { id: "5515", name: "verbs" },
            { id: "5516", name: "daily activities" },
        ],
    },
    {
        id: "5526",
        type: 3,
        title: "Words of Wisdom",
        description:
            "Unpack the meanings behind popular proverbs and their cultural significance.",
        author: {
            full_name: "Elif Yıldız",
            username: "elifyildiz",
            avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        },
        created_at: "2024-06-25T13:20:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 789,
        question_count: 15,
        rating: {
            score: 4.7,
            count: 652,
        },
        tags: [
            { id: "5517", name: "proverbs" },
            { id: "5518", name: "culture" },
            { id: "5519", name: "advanced" },
        ],
    },
    {
        id: "5527",
        type: 1,
        title: "By the Numbers",
        description:
            "From bargaining to banking, master the art of using numbers in everyday situations.",
        author: {
            full_name: "Emre Kaya",
            username: "emrekaya",
            avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        },
        created_at: "2024-06-26T09:15:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 2367,
        question_count: 20,
        rating: {
            score: 4.1,
            count: 2098,
        },
        tags: [
            { id: "5520", name: "numbers" },
            { id: "5521", name: "practical" },
            { id: "5522", name: "money" },
            { id: "5523", name: "beginner" },
        ],
    },
    {
        id: "5528",
        type: 2,
        title: "Seasonal Splendor",
        description:
            "Experience the year through seasonal vocabulary, festivities, and weather expressions.",
        author: {
            full_name: "Selin Arslan",
            username: "selinarslan",
            avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        },
        created_at: "2024-06-27T11:30:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1234,
        question_count: 18,
        rating: {
            score: 3.6,
            count: 1087,
        },
        tags: [
            { id: "5524", name: "seasons" },
            { id: "5525", name: "cultural events" },
        ],
    },
    {
        id: "5529",
        type: 3,
        title: "Street Smarts",
        description:
            "Get savvy with popular idioms and their sometimes surprising meanings.",
        author: {
            full_name: "Can Yılmaz",
            username: "canyilmaz",
            avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        },
        created_at: "2024-06-28T14:45:00Z",
        difficulty: "hard",
        is_taken: true,
        num_taken: 876,
        question_count: 15,
        rating: {
            score: 4.8,
            count: 743,
        },
        tags: [
            { id: "5526", name: "slang" },
            { id: "5527", name: "youth culture" },
            { id: "5528", name: "informal speech" },
            { id: "5529", name: "advanced" },
        ],
    },
    {
        id: "5530",
        type: 1,
        title: "Family Ties",
        description:
            "Navigate the complex web of family terms and etiquette for addressing relatives.",
        author: {
            full_name: "Zehra Çelik",
            username: "zehracelik",
            avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        },
        created_at: "2024-06-29T10:00:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 1987,
        question_count: 15,
        rating: {
            score: 2.9,
            count: 1765,
        },
        tags: [
            { id: "5530", name: "family" },
            { id: "5531", name: "relationships" },
        ],
    },
    {
        id: "5531",
        type: 2,
        title: "Culinary Adventures",
        description:
            "Explore a world of flavors through traditional dishes and cooking terminology.",
        author: {
            full_name: "Ahmet Demir",
            username: "ahmetd",
            avatar: "https://randomuser.me/api/portraits/men/6.jpg",
        },
        created_at: "2024-06-30T08:20:00Z",
        difficulty: "medium",
        is_taken: true,
        num_taken: 1456,
        question_count: 20,
        rating: {
            score: 4.3,
            count: 1287,
        },
        tags: [
            { id: "5532", name: "food" },
            { id: "5533", name: "cuisine" },
            { id: "5534", name: "cooking" },
        ],
    },
    {
        id: "5532",
        type: 3,
        title: "Tech Talk",
        description:
            "Decode the jargon of the digital age with this technology-focused vocabulary quiz.",
        author: {
            full_name: "Selin Yılmaz",
            username: "seliny",
            avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        },
        created_at: "2024-06-31T11:45:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 789,
        question_count: 15,
        rating: {
            score: 3.9,
            count: 645,
        },
        tags: [
            { id: "5535", name: "technology" },
            { id: "5536", name: "modern" },
            { id: "5537", name: "computers" },
            { id: "5538", name: "internet" },
        ],
    },
    {
        id: "5533",
        type: 1,
        title: "Animal Kingdom",
        description:
            "From pets to wildlife, expand your animal vocabulary with this fun and informative quiz.",
        author: {
            full_name: "Mustafa Öztürk",
            username: "mustafao",
            avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        },
        created_at: "2024-09-01T09:30:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 2134,
        question_count: 18,
        rating: {
            score: 4.7,
            count: 1876,
        },
        tags: [
            { id: "5539", name: "animals" },
            { id: "5540", name: "nature" },
        ],
    },
    {
        id: "5534",
        type: 2,
        title: "Office Lingo",
        description:
            "Navigate the corporate world with essential business and office-related vocabulary.",
        author: {
            full_name: "Ayşe Kara",
            username: "aysek",
            avatar: "https://randomuser.me/api/portraits/women/7.jpg",
        },
        created_at: "2024-10-02T14:15:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1023,
        question_count: 20,
        rating: {
            score: 3.8,
            count: 897,
        },
        tags: [
            { id: "5541", name: "business" },
            { id: "5542", name: "office" },
            { id: "5543", name: "professional" },
        ],
    },
    {
        id: "5535",
        type: 3,
        title: "Poetic License",
        description:
            "Unravel the beauty of figurative language and poetic devices in this literary quiz.",
        author: {
            full_name: "Emre Aydın",
            username: "emrea",
            avatar: "https://randomuser.me/api/portraits/men/8.jpg",
        },
        created_at: "2024-09-03T10:00:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 567,
        question_count: 15,
        rating: {
            score: 4.6,
            count: 489,
        },
        tags: [
            { id: "5544", name: "poetry" },
            { id: "5545", name: "literature" },
            { id: "5546", name: "advanced" },
            { id: "5547", name: "figurative language" },
        ],
    },
    {
        id: "5536",
        type: 1,
        title: "Globe Trotter",
        description:
            "Embark on a linguistic journey around the world with geography and travel-related terms.",
        author: {
            full_name: "Zeynep Aksoy",
            username: "zeynepa",
            avatar: "https://randomuser.me/api/portraits/women/8.jpg",
        },
        created_at: "2024-10-04T13:30:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1345,
        question_count: 20,
        rating: {
            score: 4.2,
            count: 1198,
        },
        tags: [
            { id: "5548", name: "travel" },
            { id: "5549", name: "geography" },
            { id: "5550", name: "culture" },
        ],
    },
    {
        id: "5537",
        type: 2,
        title: "Sporty Spice",
        description:
            "Get in the game with sports terminology covering various athletic activities.",
        author: {
            full_name: "Ali Yıldırım",
            username: "aliy",
            avatar: "https://randomuser.me/api/portraits/men/9.jpg",
        },
        created_at: "2024-09-05T09:45:00Z",
        difficulty: "easy",
        is_taken: true,
        num_taken: 1876,
        question_count: 15,
        rating: {
            score: 3.9,
            count: 1654,
        },
        tags: [
            { id: "5551", name: "sports" },
            { id: "5552", name: "athletics" },
            { id: "5553", name: "fitness" },
        ],
    },
    {
        id: "5538",
        type: 3,
        title: "Legal Eagle",
        description:
            "Demystify legal jargon and understand common law-related terms and concepts.",
        author: {
            full_name: "Sema Erkut",
            username: "semae",
            avatar: "https://randomuser.me/api/portraits/women/9.jpg",
        },
        created_at: "2024-09-06T11:20:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 678,
        question_count: 20,
        rating: {
            score: 4.5,
            count: 542,
        },
        tags: [
            { id: "5554", name: "law" },
            { id: "5555", name: "legal" },
            { id: "5556", name: "professional" },
            { id: "5557", name: "advanced" },
        ],
    },
    {
        id: "5539",
        type: 1,
        title: "Emotional Intelligence",
        description:
            "Expand your emotional vocabulary and learn to express feelings with nuance.",
        author: {
            full_name: "Cem Yılmaz",
            username: "cemy",
            avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        },
        created_at: "2024-10-17T14:00:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1234,
        question_count: 18,
        rating: {
            score: 4.4,
            count: 1087,
        },
        tags: [
            { id: "5558", name: "emotions" },
            { id: "5559", name: "psychology" },
            { id: "5560", name: "self-improvement" },
        ],
    },
    {
        id: "5540",
        type: 2,
        title: "Artistic Expressions",
        description:
            "Brush up on your art vocabulary with terms from various artistic movements and techniques.",
        author: {
            full_name: "Elif Demir",
            username: "elifd",
            avatar: "https://randomuser.me/api/portraits/women/10.jpg",
        },
        created_at: "2024-09-08T10:30:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 987,
        question_count: 15,
        rating: {
            score: 4.1,
            count: 876,
        },
        tags: [
            { id: "5561", name: "art" },
            { id: "5562", name: "culture" },
        ],
    },
    {
        id: "5541",
        type: 3,
        title: "Melodies and Rhythms",
        description:
            "Tune into the world of music with this comprehensive quiz on musical terms and instruments.",
        author: {
            full_name: "Kerem Adalı",
            username: "kerema",
            avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        },
        created_at: "2024-09-09T12:15:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1543,
        question_count: 20,
        rating: {
            score: 4.6,
            count: 1298,
        },
        tags: [
            { id: "5563", name: "music" },
            { id: "5564", name: "instruments" },
            { id: "5565", name: "arts" },
        ],
    },
    {
        id: "5542",
        type: 1,
        title: "Celestial Bodies",
        description:
            "Explore the cosmos with this quiz on astronomical terms and space phenomena.",
        author: {
            full_name: "Aylin Yıldız",
            username: "ayliny",
            avatar: "https://randomuser.me/api/portraits/women/11.jpg",
        },
        created_at: "2024-09-10T09:30:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 876,
        question_count: 15,
        rating: {
            score: 4.3,
            count: 723,
        },
        tags: [
            { id: "5566", name: "astronomy" },
            { id: "5567", name: "science" },
            { id: "5568", name: "space" },
        ],
    },
    {
        id: "5543",
        type: 2,
        title: "Green Thumb",
        description:
            "Cultivate your gardening vocabulary with terms related to plants, flowers, and landscaping.",
        author: {
            full_name: "Mehmet Kaya",
            username: "mehmetk",
            avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        },
        created_at: "2024-09-11T14:45:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 2109,
        question_count: 18,
        rating: {
            score: 4.1,
            count: 1876,
        },
        tags: [
            { id: "5569", name: "gardening" },
            { id: "5570", name: "nature" },
            { id: "5571", name: "plants" },
        ],
    },
    {
        id: "5544",
        type: 3,
        title: "Silver Screen",
        description:
            "Lights, camera, action! Test your knowledge of cinema and film industry terminology.",
        author: {
            full_name: "Zehra Aksoy",
            username: "zehraa",
            avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        },
        created_at: "2024-10-20T18:00:00Z",
        difficulty: "medium",
        is_taken: true,
        num_taken: 1234,
        question_count: 20,
        rating: {
            score: 3.9,
            count: 1087,
        },
        tags: [
            { id: "5572", name: "movies" },
            { id: "5573", name: "entertainment" },
            { id: "5574", name: "cinema" },
            { id: "5575", name: "film" },
        ],
    },
    {
        id: "5545",
        type: 1,
        title: "Digital Nomad",
        description:
            "Master the lingo of remote work and digital entrepreneurship in this modern workplace quiz.",
        author: {
            full_name: "Can Yılmaz",
            username: "cany",
            avatar: "https://randomuser.me/api/portraits/men/13.jpg",
        },
        created_at: "2024-09-13T13:30:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 987,
        question_count: 15,
        rating: {
            score: 4.4,
            count: 865,
        },
        tags: [
            { id: "5576", name: "work" },
            { id: "5577", name: "technology" },
            { id: "5578", name: "business" },
        ],
    },
    {
        id: "5546",
        type: 2,
        title: "Fashion Forward",
        description:
            "Strut your stuff with this quiz on fashion terminology, from haute couture to street style.",
        author: {
            full_name: "Elif Demir",
            username: "elifd",
            avatar: "https://randomuser.me/api/portraits/women/13.jpg",
        },
        created_at: "2024-09-14T10:15:00Z",
        difficulty: "easy",
        is_taken: false,
        num_taken: 1654,
        question_count: 18,
        rating: {
            score: 3.8,
            count: 1432,
        },
        tags: [
            { id: "5579", name: "fashion" },
            { id: "5580", name: "style" },
            { id: "5581", name: "clothing" },
        ],
    },
    {
        id: "5547",
        type: 3,
        title: "Mind Matters",
        description:
            "Delve into the world of psychology with terms related to mental health and human behavior.",
        author: {
            full_name: "Ahmet Yıldırım",
            username: "ahmety",
            avatar: "https://randomuser.me/api/portraits/men/14.jpg",
        },
        created_at: "2024-09-15T09:45:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 765,
        question_count: 20,
        rating: {
            score: 4.7,
            count: 654,
        },
        tags: [
            { id: "5582", name: "psychology" },
            { id: "5583", name: "mental health" },
            { id: "5584", name: "behavior" },
            { id: "5585", name: "science" },
        ],
    },
    {
        id: "5548",
        type: 1,
        title: "Eco Warrior",
        description:
            "Save the planet one word at a time with this quiz on environmental terms and sustainability.",
        author: {
            full_name: "Ayşe Çelik",
            username: "aysec",
            avatar: "https://randomuser.me/api/portraits/women/14.jpg",
        },
        created_at: "2024-09-16T14:00:00Z",
        difficulty: "medium",
        is_taken: false,
        num_taken: 1098,
        question_count: 15,
        rating: {
            score: 4.2,
            count: 976,
        },
        tags: [
            { id: "5586", name: "environment" },
            { id: "5587", name: "sustainability" },
            { id: "5588", name: "nature" },
        ],
    },
    {
        id: "5549",
        type: 2,
        title: "Time Traveler",
        description:
            "Journey through the ages with this quiz on historical events, figures, and eras.",
        author: {
            full_name: "Mustafa Kara",
            username: "mustafak",
            avatar: "https://randomuser.me/api/portraits/men/15.jpg",
        },
        created_at: "2024-09-17T11:30:00Z",
        difficulty: "hard",
        is_taken: false,
        num_taken: 876,
        question_count: 20,
        rating: {
            score: 4.5,
            count: 765,
        },
        tags: [
            { id: "5589", name: "history" },
            { id: "5590", name: "events" },
            { id: "5591", name: "people" },
        ],
    },
    {
        id: "5550",
        type: 3,
        title: "Foodie's Delight",
        description:
            "Savor the flavors of culinary terms, cooking techniques, and global cuisines.",
        author: {
            full_name: "Zeynep Yılmaz",
            username: "zeynepy",
            avatar: "https://randomuser.me/api/portraits/women/15.jpg",
        },
        created_at: "2024-09-18T10:00:00Z",
        difficulty: "medium",
        is_taken: true,
        num_taken: 1432,
        question_count: 18,
        rating: {
            score: 4.0,
            count: 1298,
        },
        tags: [
            { id: "5592", name: "food" },
            { id: "5593", name: "cooking" },
            { id: "5594", name: "cuisine" },
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
        selected_option_id: "55",
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
