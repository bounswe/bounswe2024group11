import { LoaderFunction } from "react-router";
import { useLoaderData } from "react-router-dom";

export const IdLoader = (({ params }) => {
    if (typeof params.id !== "string") return null;
    return params.id;
}) satisfies LoaderFunction;

export const Id = () => {
    const data = useLoaderData() as ReturnType<typeof IdLoader>;
    return <div>Id {data}</div>;
};
