import { makeLoader, typesafeBrowserRouter } from "react-router-typesafe";
import { App } from "./App";

import { Link } from "react-router-dom";
import { Login } from "./Login";

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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Link to="/login">Log In</Link>,
  },
]);
