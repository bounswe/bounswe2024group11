type AvatarProps = {
    author: {
        full_name: string;
        username: string;
        avatar: string | null;
    };
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
