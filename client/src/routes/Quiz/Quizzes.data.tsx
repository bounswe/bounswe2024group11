import { LoaderFunction } from "react-router";
import {
    array,
    boolean,
    InferInput,
    nullable,
    number,
    object,
    safeParse,
    string,
} from "valibot";
import apiClient from "../../api"; // Axios instance
import { logger } from "../../utils";

export type Quiz = InferInput<typeof quizSchema>;

/*
{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 2,
            "title": "Cars Quiz",
            "description": "Test your knowledge about cars",
            "difficulty": 2,
            "author": {
                "id": 3,
                "username": "jackma",
                "email": "jackma@email.com",
                "full_name": "jackma",
                "avatar": "https://api.dicebear.com/9.x/avataaars/webp?accessories=eyepatch,kurt,prescription01&seed=David%20Bush"
            },
            "tags": [
                {
                    "name": "car",
                    "linked_data_id": "bn:00007309n",
                    "description": "A motor vehicle with four wheels; usually propelled by an internal combustion engine"
                }
            ],
            "type": 2,
            "created_at": "2024-11-12T12:33:23Z",
            "questions": [
                {
                    "id": 6,
                    "question_text": "Kaput",
                    "choices": [
                        {
                            "id": 21,
                            "choice_text": "Hood",
                            "is_correct": true
                        },
                        {
                            "id": 22,
                            "choice_text": "Fender",
                            "is_correct": false
                        },
                        {
                            "id": 23,
                            "choice_text": "Bumper",
                            "is_correct": false
                        },
                        {
                            "id": 24,
                            "choice_text": "Windshield",
                            "is_correct": false
                        }
                    ]
                },
                {
                    "id": 7,
                    "question_text": "Vites",
                    "choices": [
                        {
                            "id": 25,
                            "choice_text": "Belt",
                            "is_correct": false
                        },
                        {
                            "id": 26,
                            "choice_text": "Tire",
                            "is_correct": false
                        },
                        {
                            "id": 27,
                            "choice_text": "Clutch",
                            "is_correct": false
                        },
                        {
                            "id": 28,
                            "choice_text": "Gear",
                            "is_correct": true
                        }
                    ]
                },
                {
                    "id": 8,
                    "question_text": "Debriyaj",
                    "choices": [
                        {
                            "id": 29,
                            "choice_text": "Brake",
                            "is_correct": false
                        },
                        {
                            "id": 30,
                            "choice_text": "Clutch",
                            "is_correct": true
                        },
                        {
                            "id": 31,
                            "choice_text": "Accelerator",
                            "is_correct": false
                        },
                        {
                            "id": 32,
                            "choice_text": "Handbrake",
                            "is_correct": false
                        }
                    ]
                }
            ],
            "num_taken": 1,
            "is_taken": false,
            "rating": {
                "score": 4,
                "count": 1
            },
            "is_my_quiz": false
        },
        {
            "id": 1,
            "title": "Technology Quiz",
            "description": "Test your knowledge about technology",
            "difficulty": 1,
            "author": {
                "id": 2,
                "username": "alibaba",
                "email": "alibaba@email.com",
                "full_name": "alibaba",
                "avatar": "https://api.dicebear.com/9.x/avataaars/webp?accessories=eyepatch,kurt,prescription01&seed=Cody%20Ross"
            },
            "tags": [
                {
                    "name": "technology",
                    "linked_data_id": "bn:00030858n",
                    "description": "The practical application of science to commerce or industry"
                }
            ],
            "type": 1,
            "created_at": "2024-11-02T02:30:20Z",
            "questions": [
                {
                    "id": 1,
                    "question_text": "Algorithm",
                    "choices": [
                        {
                            "id": 1,
                            "choice_text": "Algoritma",
                            "is_correct": true
                        },
                        {
                            "id": 2,
                            "choice_text": "Yazılım",
                            "is_correct": false
                        },
                        {
                            "id": 3,
                            "choice_text": "Veri",
                            "is_correct": false
                        },
                        {
                            "id": 4,
                            "choice_text": "Ağ",
                            "is_correct": false
                        }
                    ]
                },
                {
                    "id": 2,
                    "question_text": "Cloud Computing",
                    "choices": [
                        {
                            "id": 5,
                            "choice_text": "Bulut Bilişim",
                            "is_correct": true
                        },
                        {
                            "id": 6,
                            "choice_text": "Veritabanı",
                            "is_correct": false
                        },
                        {
                            "id": 7,
                            "choice_text": "Ağ",
                            "is_correct": false
                        },
                        {
                            "id": 8,
                            "choice_text": "Sunucu",
                            "is_correct": false
                        }
                    ]
                },
                {
                    "id": 3,
                    "question_text": "Artificial Intelligence",
                    "choices": [
                        {
                            "id": 9,
                            "choice_text": "Yapay Zeka",
                            "is_correct": true
                        },
                        {
                            "id": 10,
                            "choice_text": "Robot",
                            "is_correct": false
                        },
                        {
                            "id": 11,
                            "choice_text": "Bilişim",
                            "is_correct": false
                        },
                        {
                            "id": 12,
                            "choice_text": "Veri Tabanı",
                            "is_correct": false
                        }
                    ]
                },
                {
                    "id": 4,
                    "question_text": "Cybersecurity",
                    "choices": [
                        {
                            "id": 13,
                            "choice_text": "Siber Güvenlik",
                            "is_correct": true
                        },
                        {
                            "id": 14,
                            "choice_text": "Firewall",
                            "is_correct": false
                        },
                        {
                            "id": 15,
                            "choice_text": "Yazılım",
                            "is_correct": false
                        },
                        {
                            "id": 16,
                            "choice_text": "Donanım",
                            "is_correct": false
                        }
                    ]
                },
                {
                    "id": 5,
                    "question_text": "Virtual Reality",
                    "choices": [
                        {
                            "id": 17,
                            "choice_text": "Sanal Gerçeklik",
                            "is_correct": true
                        },
                        {
                            "id": 18,
                            "choice_text": "Gerçek Zeka",
                            "is_correct": false
                        },
                        {
                            "id": 19,
                            "choice_text": "Fiziksel Gerçeklik",
                            "is_correct": false
                        },
                        {
                            "id": 20,
                            "choice_text": "Dijital Dünya",
                            "is_correct": false
                        }
                    ]
                }
            ],
            "num_taken": 0,
            "is_taken": false,
            "rating": {
                "score": null,
                "count": 0
            },
            "is_my_quiz": false
        }
    ]
}
*/

const quizSchema = object({
    id: number(),
    title: string(),
    description: string(),
    author: object({
        full_name: string(),
        username: string(),
        avatar: string(),
        id: number(),
        email: string(),
    }),
    created_at: string(),
    tags: array(
        object({
            name: string(),
            linked_data_id: string(),
            description: string(),
        }),
    ),
    type: number(),
    num_taken: number(),
    is_my_quiz: boolean(),
    is_taken: boolean(),
    questions: array(
        object({
            id: number(),
            question_text: string(),
            choices: array(
                object({
                    id: number(),
                    is_correct: boolean(),
                    choice_text: string(),
                }),
            ),
        }),
    ),
    //question_count: nullable(number()),
    difficulty: number(),
    rating: object({
        score: nullable(number()),
        count: number(),
    }),
});

const quizzesResponseSchema = object({
    count: number(),
    next: nullable(string()),
    previous: nullable(string()),
    results: array(quizSchema),
});

export const quizzesLoader = (async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const per_page = Number(url.searchParams.get("per_page")) || 20;

    try {
        const response = await apiClient.get("/quizzes/", {
            params: { page, per_page },
        });
        //logger.log(response.data);
        const data = response.data; // Extract data from the axios response
        const { output, issues, success } = safeParse(
            quizzesResponseSchema,
            data,
        );

        if (!success) {
            logger.error("Failed to parse quizzes response", issues);
            throw new Error(`Failed to parse quizzes response: ${issues}`);
        }

        return output;
    } catch (error) {
        logger.error("Error fetching quizzes", error);
        throw new Error("Failed to fetch quizzes");
    }
}) satisfies LoaderFunction;
