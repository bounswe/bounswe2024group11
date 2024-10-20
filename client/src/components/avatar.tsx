import { InferInput } from "valibot";
import { quizAuthorSchema } from "../types/quiz";

type AvatarProps = {
    author: InferInput<typeof quizAuthorSchema>;
    size: number;
};

export const Avatar = ({ author, size = 40 }: AvatarProps) => {
    return (
        <div className="">
            <img
                src={author.avatar}
                alt={author.full_name}
                style={{
                    width: size,
                    height: size,
                    aspectRatio: "1 / 1",
                }}
                className="h-full w-full rounded-full"
            />
        </div>
    );
};
