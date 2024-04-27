import { makeLoader, typesafeBrowserRouter } from "react-router-typesafe";
import { App } from "./App";

import { Link } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./register";

const homeLoader = makeLoader(async ({ request }) => {
  const search = new URL(request.url).searchParams;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${search.get("search")}`
  );
  return { pokemon: await res.json().catch(() => null) };
});

export type HomeLoader = typeof homeLoader;

export const { router, href } = typesafeBrowserRouter([
  {
    path: "/",
    Component: App,
    loader: homeLoader,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);
