import { makeLoader, typesafeBrowserRouter } from "react-router-typesafe";
import { App } from "./App";

const pokeLoader = makeLoader(async ({ request }) => {
  const search = new URL(request.url).searchParams;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${search.get("search")}`
  );
  return { pokemon: await res.json().catch(() => null) };
});

export type PokeLoader = typeof pokeLoader;

export const { router, href } = typesafeBrowserRouter([
  {
    path: "/",
    Component: App,
    loader: pokeLoader,
  },
  {
    path: "/type",
    element: <div>Page A</div>,
  },
  {
    path: "/safe",
    element: <div>Page B</div>,
  },
  {
    path: "/routes",
    element: <div>Page C</div>,
    children: [
      {
        path: "workseven",
        element: <div>Page D</div>,
      },
      {
        path: "on nested routes",
        element: <div>Page E</div>,
      },
    ],
  },
]);
