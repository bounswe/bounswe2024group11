import { useLoaderData } from "react-router";

export const Quizzes = () => {
    const data = useLoaderData();
    console.log(data);
    return null;
};
