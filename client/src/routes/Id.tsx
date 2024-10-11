import { LoaderFunction } from "react-router";
import { useLoaderData } from "react-router-typesafe";
import { object, parse, string } from "valibot";
import { BASE_URL } from "../utils";

const IdParamsSchema = object({
    id: string(),
});

const IdDataSchema = object({
    id: string(),
    firstName: string(),
    lastName: string(),
});

export const IdLoader = (async ({ params }) => {
    const { id } = parse(IdParamsSchema, params);
    const response = await fetch(`${BASE_URL}/user/john-maverick?id=${id}`, {
        method: "GET",
    }).then((response) => response.json());
    return parse(IdDataSchema, response);
}) satisfies LoaderFunction;

export const Id = () => {
    const data = useLoaderData<typeof IdLoader>();
    return (
        <div className="flex flex-col gap-3">
            <span>Id: {data.id}</span>
            <span>First name: {data.firstName}</span>
            <span>Last name: {data.lastName}</span>
        </div>
    );
};
