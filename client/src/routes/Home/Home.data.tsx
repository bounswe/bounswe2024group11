import { defer } from "react-router-typesafe";
import { array, object, safeParse } from "valibot";
import apiClient from "../../api";
import { USER } from "../../constants";
import { userSchema } from "../../schemas";
import { forumQuestionSchema, tagSchema } from "../Forum/Forum.schema";
import { profileSchema } from "../Profile/Profile.schema";
import { quizDetailsSchema } from "../Quiz/Quiz.schema";

// •⁠  ⁠array of forum questions
// •⁠  ⁠array of quizzes
// •⁠  ⁠array of forum questions
// •⁠  ⁠array of quizzes
// •⁠  ⁠array of tags
// •⁠  ⁠array of tags

const a = {
    forum_questions_by_followed_users: [
        {
            id: 1,
            title: "How will AI impact the future of software development?",
            question:
                "With advancements in artificial intelligence, how do you think AI will change the way we approach software development in the next 5 to 10 years? What are the opportunities and challenges developers might face as AI tools become more integrated into the development process?",
            tags: [
                {
                    id: 1,
                    name: "technology",
                    linked_data_id: "bn:00030858n",
                    description:
                        "The practical application of science to commerce or industry",
                },
                {
                    id: 6,
                    name: "artificial intelligence",
                    linked_data_id: "bn:00002150n",
                    description:
                        "The branch of computer science that deal with writing computer programs that can solve problems creatively",
                },
            ],
            author: {
                id: 2,
                username: "alibaba",
                email: "alibaba@email.com",
                full_name: "alibaba",
                avatar: "https://api.dicebear.com/9.x/avataaars/webp?accessories=eyepatch,kurt,prescription01&seed=Cody%20Ross",
                is_followed: 1,
                is_blocked: null,
            },
            created_at: "2024-11-01T00:00:00Z",
            answers_count: 0,
            is_bookmarked: null,
            is_upvoted: null,
            upvotes_count: 0,
            is_downvoted: null,
            downvotes_count: 1,
            answers: [],
            is_my_forum_question: false,
            quiz_question: null,
            quiz_question_type: null,
            image_url: null,
            related_forum_questions: [],
        },
    ],
    quizzes_by_followed_users: [
        {
            id: 1,
            title: "Technology Quiz",
            description: "Test your knowledge about technology",
            difficulty: 1,
            author: {
                id: 2,
                username: "alibaba",
                email: "alibaba@email.com",
                full_name: "alibaba",
                avatar: "https://api.dicebear.com/9.x/avataaars/webp?accessories=eyepatch,kurt,prescription01&seed=Cody%20Ross",
                is_followed: 1,
                is_blocked: null,
            },
            tags: [
                {
                    id: 1,
                    name: "technology",
                    linked_data_id: "bn:00030858n",
                    description:
                        "The practical application of science to commerce or industry",
                },
            ],
            type: 1,
            created_at: "2024-11-02T02:30:20Z",
            questions: [
                {
                    id: 1,
                    question_text: "Algorithm",
                    question_point: 10,
                    choices: [
                        {
                            id: 1,
                            choice_text: "Algoritma",
                            is_correct: true,
                        },
                        {
                            id: 2,
                            choice_text: "Yazılım",
                            is_correct: false,
                        },
                        {
                            id: 3,
                            choice_text: "Veri",
                            is_correct: false,
                        },
                        {
                            id: 4,
                            choice_text: "Ağ",
                            is_correct: false,
                        },
                    ],
                    hints: [
                        {
                            id: 1,
                            type: "sense",
                            text: "A precise rule (or set of rules) specifying how to solve some problem.",
                        },
                    ],
                },
                {
                    id: 2,
                    question_text: "Cloud Computing",
                    question_point: 10,
                    choices: [
                        {
                            id: 5,
                            choice_text: "Bulut Bilişim",
                            is_correct: true,
                        },
                        {
                            id: 6,
                            choice_text: "Veritabanı",
                            is_correct: false,
                        },
                        {
                            id: 7,
                            choice_text: "Ağ",
                            is_correct: false,
                        },
                        {
                            id: 8,
                            choice_text: "Sunucu",
                            is_correct: false,
                        },
                    ],
                    hints: [],
                },
                {
                    id: 3,
                    question_text: "Artificial Intelligence",
                    question_point: 10,
                    choices: [
                        {
                            id: 9,
                            choice_text: "Yapay Zeka",
                            is_correct: true,
                        },
                        {
                            id: 10,
                            choice_text: "Robot",
                            is_correct: false,
                        },
                        {
                            id: 11,
                            choice_text: "Bilişim",
                            is_correct: false,
                        },
                        {
                            id: 12,
                            choice_text: "Veri Tabanı",
                            is_correct: false,
                        },
                    ],
                    hints: [],
                },
                {
                    id: 4,
                    question_text: "Cybersecurity",
                    question_point: 10,
                    choices: [
                        {
                            id: 13,
                            choice_text: "Siber Güvenlik",
                            is_correct: true,
                        },
                        {
                            id: 14,
                            choice_text: "Firewall",
                            is_correct: false,
                        },
                        {
                            id: 15,
                            choice_text: "Yazılım",
                            is_correct: false,
                        },
                        {
                            id: 16,
                            choice_text: "Donanım",
                            is_correct: false,
                        },
                    ],
                    hints: [],
                },
                {
                    id: 5,
                    question_text: "Virtual Reality",
                    question_point: 10,
                    choices: [
                        {
                            id: 17,
                            choice_text: "Sanal Gerçeklik",
                            is_correct: true,
                        },
                        {
                            id: 18,
                            choice_text: "Gerçek Zeka",
                            is_correct: false,
                        },
                        {
                            id: 19,
                            choice_text: "Fiziksel Gerçeklik",
                            is_correct: false,
                        },
                        {
                            id: 20,
                            choice_text: "Dijital Dünya",
                            is_correct: false,
                        },
                    ],
                    hints: [],
                },
            ],
            num_taken: 1,
            is_taken: true,
            rating: {
                score: null,
                count: 0,
            },
            is_my_quiz: false,
            quiz_point: 50,
            my_last_answers: {
                id: 2,
                quiz: 1,
                user: 4,
                date: "2024-12-15T17:42:30.657029Z",
                answers: [
                    {
                        id: 4,
                        take_quiz: 2,
                        question: 1,
                        answer: 1,
                        is_hint_used: false,
                    },
                    {
                        id: 5,
                        take_quiz: 2,
                        question: 2,
                        answer: 8,
                        is_hint_used: false,
                    },
                    {
                        id: 6,
                        take_quiz: 2,
                        question: 3,
                        answer: 9,
                        is_hint_used: false,
                    },
                    {
                        id: 7,
                        take_quiz: 2,
                        question: 4,
                        answer: 13,
                        is_hint_used: false,
                    },
                    {
                        id: 8,
                        take_quiz: 2,
                        question: 5,
                        answer: 18,
                        is_hint_used: false,
                    },
                ],
                score: 30,
                correct_answer_count: 3,
                wrong_answer_count: 2,
                empty_answer_count: 0,
            },
            is_frozen: false,
        },
    ],
    forum_questions_by_interests: [],
    quizzes_by_interests: [
        {
            id: 4,
            title: "da",
            description: "daw",
            difficulty: 1,
            author: {
                id: 4,
                username: "elonmusk",
                email: "elonmusk@email.com",
                full_name: "elonmusk",
                avatar: "https://api.dicebear.com/9.x/avataaars/webp?accessories=eyepatch,kurt,prescription01&seed=Jason%20Lee",
                is_followed: null,
                is_blocked: null,
            },
            tags: [
                {
                    id: 7,
                    name: "car",
                    linked_data_id: "bn:00007309n",
                    description:
                        "A motor vehicle with four wheels; usually propelled by an internal combustion engine",
                },
            ],
            type: 1,
            created_at: "2024-12-15T18:42:29.614855Z",
            questions: [
                {
                    id: 10,
                    question_text: "asd",
                    question_point: 30,
                    choices: [
                        {
                            id: 37,
                            choice_text: "q",
                            is_correct: false,
                        },
                        {
                            id: 38,
                            choice_text: "q",
                            is_correct: false,
                        },
                        {
                            id: 39,
                            choice_text: "otizm spektrum bozukluğu",
                            is_correct: true,
                        },
                        {
                            id: 40,
                            choice_text: "q",
                            is_correct: false,
                        },
                    ],
                    hints: [],
                },
            ],
            num_taken: 0,
            is_taken: false,
            rating: {
                score: null,
                count: 0,
            },
            is_my_quiz: true,
            quiz_point: 30,
            my_last_answers: null,
            is_frozen: false,
        },
        {
            id: 2,
            title: "Cars Quiz",
            description: "Test your knowledge about cars",
            difficulty: 2,
            author: {
                id: 3,
                username: "jackma",
                email: "jackma@email.com",
                full_name: "jackma",
                avatar: "https://api.dicebear.com/9.x/avataaars/webp?accessories=eyepatch,kurt,prescription01&seed=David%20Bush",
                is_followed: null,
                is_blocked: null,
            },
            tags: [
                {
                    id: 7,
                    name: "car",
                    linked_data_id: "bn:00007309n",
                    description:
                        "A motor vehicle with four wheels; usually propelled by an internal combustion engine",
                },
            ],
            type: 2,
            created_at: "2024-11-12T12:33:23Z",
            questions: [
                {
                    id: 6,
                    question_text: "Kaput",
                    question_point: 10,
                    choices: [
                        {
                            id: 21,
                            choice_text: "Hood",
                            is_correct: true,
                        },
                        {
                            id: 22,
                            choice_text: "Fender",
                            is_correct: false,
                        },
                        {
                            id: 23,
                            choice_text: "Bumper",
                            is_correct: false,
                        },
                        {
                            id: 24,
                            choice_text: "Windshield",
                            is_correct: false,
                        },
                    ],
                    hints: [],
                },
                {
                    id: 7,
                    question_text: "Vites",
                    question_point: 10,
                    choices: [
                        {
                            id: 25,
                            choice_text: "Belt",
                            is_correct: false,
                        },
                        {
                            id: 26,
                            choice_text: "Tire",
                            is_correct: false,
                        },
                        {
                            id: 27,
                            choice_text: "Clutch",
                            is_correct: false,
                        },
                        {
                            id: 28,
                            choice_text: "Gear",
                            is_correct: true,
                        },
                    ],
                    hints: [],
                },
                {
                    id: 8,
                    question_text: "Debriyaj",
                    question_point: 10,
                    choices: [
                        {
                            id: 29,
                            choice_text: "Brake",
                            is_correct: false,
                        },
                        {
                            id: 30,
                            choice_text: "Clutch",
                            is_correct: true,
                        },
                        {
                            id: 31,
                            choice_text: "Accelerator",
                            is_correct: false,
                        },
                        {
                            id: 32,
                            choice_text: "Handbrake",
                            is_correct: false,
                        },
                    ],
                    hints: [],
                },
            ],
            num_taken: 1,
            is_taken: true,
            rating: {
                score: 4,
                count: 1,
            },
            is_my_quiz: false,
            quiz_point: 30,
            my_last_answers: {
                id: 1,
                quiz: 2,
                user: 4,
                date: "2024-11-02T02:30:20Z",
                answers: [
                    {
                        id: 1,
                        take_quiz: 1,
                        question: 6,
                        answer: 22,
                        is_hint_used: false,
                    },
                    {
                        id: 2,
                        take_quiz: 1,
                        question: 7,
                        answer: 25,
                        is_hint_used: false,
                    },
                    {
                        id: 3,
                        take_quiz: 1,
                        question: 8,
                        answer: 30,
                        is_hint_used: false,
                    },
                ],
                score: 10,
                correct_answer_count: 1,
                wrong_answer_count: 2,
                empty_answer_count: 0,
            },
            is_frozen: false,
        },
    ],
    related_tags_for_forum_questions: [
        {
            name: "clutch",
            description:
                "A pedal or lever that engages or disengages a rotating shaft and a driving mechanism",
            linked_data_id: "bn:00020080n",
        },
        {
            name: "technology",
            description:
                "The practical application of science to commerce or industry",
            linked_data_id: "bn:00030858n",
        },
        {
            name: "artificial intelligence",
            description:
                "The branch of computer science that deal with writing computer programs that can solve problems creatively",
            linked_data_id: "bn:00002150n",
        },
    ],
    related_tags_for_quizzes: [
        {
            name: "technology",
            description:
                "The practical application of science to commerce or industry",
            linked_data_id: "bn:00030858n",
        },
    ],
};

const feedSchema = object({
    forum_questions_by_followed_users: array(forumQuestionSchema),
    quizzes_by_followed_users: array(quizDetailsSchema),
    forum_questions_by_interests: array(forumQuestionSchema),
    quizzes_by_interests: array(quizDetailsSchema),
    related_tags_for_forum_questions: array(tagSchema),
    related_tags_for_quizzes: array(tagSchema),
});

export const userLoader = () => {
    const user = sessionStorage.getObject(USER) || localStorage.getObject(USER);
    const { output, success } = safeParse(userSchema, user);
    if (!success) {
        return { logged_in: false } as const;
    }

    return { logged_in: true, user: output } as const;
};

export const homeLoader = () => {
    const user = sessionStorage.getObject(USER) || localStorage.getObject(USER);
    if (!user) {
        return Promise.resolve(null);
    }

    const feedPromise = apiClient.get(`/feed/`).then((res) => {
        const { output, success, issues } = safeParse(feedSchema, res.data);
        if (!success) {
            throw new Error(`Failed to parse feed response: ${issues}`);
        }
        return output;
    });

    const profilePromise = apiClient
        .get(`/profile/${user.username}/`)
        .then((res) => {
            const { output, success, issues } = safeParse(
                profileSchema,
                res.data,
            );
            if (!success) {
                throw new Error(`Failed to parse profile response: ${issues}`);
            }
            return output;
        });

    return defer({
        data: Promise.all([feedPromise, profilePromise]).then(
            ([feed, profile]) => ({
                feedData: feed,
                profileData: profile,
            }),
        ),
    });
};
