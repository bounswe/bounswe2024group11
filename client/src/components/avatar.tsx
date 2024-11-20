import { InferInput } from "valibot";
import { authorSchema } from "../types/forum";

type AvatarProps = {
    author: InferInput<typeof authorSchema>;
    size: number;
};

export const Avatar = ({ author, size = 40 }: AvatarProps) => {
    return (
        <div className="">
            <img
                src={author.avatar ?? undefined}
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
