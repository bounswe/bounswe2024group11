import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import { PageHead } from "../../components/page-head";
import { quizReviewLoader } from "./Quiz.data";
import { QuizAnswer, QuizQuestion } from "./Quiz.schema";

// const quizSchema = object({
//     id: number(),
//     title: string(),
//     description: string(),
//     author: object({
//         full_name: string(),
//         username: string(),
//         avatar: string(),
//         id: number(),
//         email: string(),
//     }),
//     created_at: string(),
//     tags: array(
//         object({
//             name: string(),
//             linked_data_id: string(),
//             description: string(),
//         }),
//     ),
//     type: number(),
//     num_taken: number(),
//     is_my_quiz: boolean(),
//     is_taken: boolean(),
//     questions: array(
//         object({
//             id: number(),
//             question_text: string(),
//             choices: array(
//                 object({
//                     id: number(),
//                     is_correct: boolean(),
//                     choice_text: string(),
//                 }),
//             ),
//             hints: optional(
//                 array(
//                     object({
//                         id: number(),
//                         type: string(),
//                         text: string(),
//                     }),
//                 ),
//             ),
//         }),
//     ),
//     //question_count: nullable(number()),
//     difficulty: number(),
//     rating: object({
//         score: nullable(number()),
//         count: number(),
//     }),
// });

const QuizCard = ({
    question,
    answer,
}: {
    question: QuizQuestion;
    answer: QuizAnswer | undefined;
}) => {
    return (
        <div>
            <h2>
                {question.question_text} {answer?.answer}
                <Link
                    to={`/forum/new?qid=${question.id}&title=Quiz+Question:+"${question.question_text}"&question=Can+you+help+me+with+${question.question_text}?`}
                >
                    <span>Ask Community</span>
                </Link>
            </h2>
            {question.choices.map((choice) => (
                <div key={choice.id}>
                    {choice.choice_text} {choice.is_correct ? "(correct)" : ""}{" "}
                    {answer?.answer === choice.id ? "(selected)" : ""}
                    <Link
                        to={`/forum/new?title=${choice.choice_text}&question=Quiz+option:+${choice.choice_text}?&quiz_question=${question.id}`}
                    >
                        <span>Ask Community</span>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export const QuizReview = () => {
    const { quiz, savedAnswers } = useLoaderData<typeof quizReviewLoader>();
    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead title={quiz.title} description={quiz.description} />
            <main className="flex flex-col gap-10">
                {quiz.questions.map((question) => (
                    <QuizCard
                        key={question.id}
                        question={question}
                        answer={savedAnswers.find(
                            (answer) => answer.question === question.id,
                        )}
                    />
                ))}
            </main>
        </div>
    );
};
