import { RiQuestionAnswerLine, RiQuestionnaireFill } from "@remixicon/react";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { PageHead } from "../../components/page-head";
import { quizReviewLoader } from "./Quiz.data";
import { QuizAnswer, QuizQuestion } from "./Quiz.schema";
import { questionTypeToQuestion } from "./Quiz.utils";
import { choiceButton } from "./QuizChoice";

const QuizCard = ({
    quizType,
    question,
    answer,
}: {
    quizType: number;
    question: QuizQuestion;
    answer: QuizAnswer | undefined;
}) => {
    return (
        <div className="flex flex-col gap-6 rounded-2 p-4 ring-1 ring-slate-200">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <span className="text-xs tracking-widest text-slate-500">
                        QUESTION ID {question.id}
                    </span>
                    <h2 className="text-lg font-medium">
                        {questionTypeToQuestion(
                            quizType,
                            question.question_text,
                        )}
                    </h2>
                </div>
                <Link
                    className={buttonClass({
                        intent: "secondary",
                        icon: "left",
                    })}
                    to={`/forum/new?qid=${question.id}&title=Help+needed:+"${questionTypeToQuestion(
                        quizType,
                        question.question_text,
                    )}"`}
                >
                    <span
                        className={buttonInnerRing({ intent: "secondary" })}
                    />
                    <RiQuestionAnswerLine size={16} />
                    <span>Ask Community</span>
                </Link>
            </div>
            <div className="grid flex-1 grid-cols-2 justify-start gap-2">
                {question.choices.map((choice) => (
                    <div
                        className={choiceButton({
                            isCorrect: choice.is_correct,
                            isSelected: answer?.answer === choice.id,
                            showAnswer: true,
                        })}
                        key={choice.id}
                    >
                        <span className="flex-1 pl-8">
                            {choice.choice_text}
                        </span>
                        <Link
                            aria-label="Ask Community"
                            className="rounded-full bg-transparent p-2.5 text-current transition-all hover:bg-white hover:text-orange-900"
                            to={`/forum/new?title=Help+needed:+"${questionTypeToQuestion(
                                quizType,
                                question.question_text,
                            )}"&question=I+could+not+understand+"${choice.choice_text}"+option+for+this+question.+Can+somebody+explain+this?&quiz_question=${question.id}`}
                        >
                            <RiQuestionnaireFill size={20} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const QuizReview = () => {
    const { quiz, savedAnswers } = useLoaderData<typeof quizReviewLoader>();
    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <svg
                width="128"
                height="128"
                viewBox="0 0 91 76"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth="1px"
                strokeLinecap="round"
            >
                <g stroke="currentColor" className="text-cyan-600">
                    <path d="M88.0799 21.0799V41.0799H88.0499V34.3999L88.0399 34.3899L76.2799 34.3699C75.4999 35.7299 74.4899 36.9899 73.2599 38.1599C72.1599 39.1999 70.88 40.1599 69.42 41.0499L56.6799 41.0299V21.0299L88.0799 21.0799Z" />
                    <path d="M2.10999 52.76V72.76L2.01001 54.63V34.63H2.04001L2.10999 52.76Z" />
                    <path d="M13.0999 52.78V72.78L2.10986 72.76V52.76L13.0999 52.78Z" />
                    <path d="M88.08 21.08L56.68 21.0299L56.65 14.68L69.21 14.7099L68.52 14.31C61.96 10.52 54.08 8.62995 44.89 8.62995C35.7 8.62995 27.82 10.53 21.23 14.34C19.54 15.31 18.07 16.39 16.83 17.56C15.6 18.72 14.59 19.9899 13.81 21.3499L2.04004 21.32C3.07004 19.06 4.54004 16.9699 6.42004 15.0499C8.31004 13.1199 10.62 11.37 13.36 9.78995C22.09 4.74995 32.58 2.21995 44.81 2.19995C57.04 2.19995 67.55 4.71995 76.34 9.78995L77.03 10.19L76.99 2.93995L87.98 2.95995L88.08 21.08Z" />
                    <path d="M33.4401 41.04V45.9C29.1001 44.97 25.1401 43.47 21.5701 41.41L20.8901 41.01L33.4401 41.04Z" />
                    <path d="M13.81 21.3499V34.6499L6.84003 34.6399L2.04004 34.6299V21.3199L13.81 21.3499Z" />
                    <path d="M56.6501 14.68L56.6801 21.03V29.83C53.0301 29.02 49.1001 28.63 44.8901 28.63C35.7001 28.63 27.8201 30.53 21.2301 34.34C21.0401 34.45 20.8601 34.56 20.6801 34.67L13.8101 34.65V21.35C14.5901 19.99 15.6 18.72 16.83 17.56C18.07 16.39 19.5401 15.31 21.2301 14.34C27.8201 10.53 35.7001 8.63 44.8901 8.63C54.0801 8.63 61.9601 10.52 68.5201 14.31L69.2101 14.71L56.6501 14.68Z" />
                    <path d="M88.04 34.39C87.02 36.67 85.56 38.75 83.67 40.67C83.54 40.81 83.4 40.94 83.26 41.07C81.45 42.85 79.27 44.46 76.73 45.93C68 50.97 57.51 53.5 45.28 53.52C41.13 53.52 37.19 53.23 33.44 52.65C26.12 51.52 19.56 49.28 13.75 45.93L13.06 45.53L13.1 52.78L2.11002 52.76L2.04004 34.63H6.84003L13.81 34.65L20.68 34.67L33.41 34.69L33.44 41.04L20.89 41.01L21.57 41.41C25.14 43.47 29.1 44.97 33.44 45.9C37.09 46.7 41.01 47.09 45.2 47.09C54.39 47.09 62.28 45.18 68.86 41.38C69.05 41.27 69.23 41.16 69.42 41.05C70.88 40.16 72.16 39.2 73.26 38.16C74.49 36.99 75.5 35.73 76.28 34.37L88.04 34.39Z" />
                    <path d="M88.05 35.6399V54.3899C87.02 56.6599 85.5601 58.7499 83.6701 60.6699C81.7801 62.5999 79.4701 64.3499 76.7301 65.9299C68.0001 70.9699 57.5101 73.4999 45.2801 73.5199C33.0501 73.5299 22.5401 70.9999 13.7501 65.9299L13.1001 65.5499V52.7799L13.0601 45.5299L13.7501 45.9299C19.5601 49.2799 26.1201 51.5199 33.4401 52.6499C37.1901 53.2299 41.1301 53.5199 45.2801 53.5199C57.5101 53.4999 68.0001 50.9699 76.7301 45.9299C79.2701 44.4599 81.4501 42.8499 83.2601 41.0699C83.4001 40.9399 83.5401 40.8099 83.6701 40.6699C85.5601 38.7499 87.0201 36.6699 88.0401 34.3999V35.6399H88.05Z" />
                </g>
            </svg>
            <PageHead
                title={quiz.title}
                description="Review quiz, learn from your mistakes, and ask community for help."
            />
            <main className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8">
                {quiz.questions.map((question) => (
                    <QuizCard
                        key={question.id}
                        question={question}
                        quizType={quiz.type}
                        answer={savedAnswers.find(
                            (answer) => answer.question === question.id,
                        )}
                    />
                ))}
            </main>
            <div className="flex gap-4">
                <Link
                    className={buttonClass({
                        intent: "secondary",
                        size: "medium",
                    })}
                    to={`/quizzes/`}
                >
                    <span
                        className={buttonInnerRing({ intent: "secondary" })}
                        aria-hidden="true"
                    />
                    Back to Quizzes
                </Link>
                <Link
                    to={`/quizzes/${quiz.id}/`}
                    className={buttonClass({
                        intent: "primary",
                        size: "medium",
                    })}
                >
                    <span
                        className={buttonInnerRing({ intent: "primary" })}
                        aria-hidden="true"
                    />
                    Re-attempt
                </Link>
            </div>
        </div>
    );
};
