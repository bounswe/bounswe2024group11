import { expect, test } from "vitest";
import { combineHints } from "../utils/quiz";

test("Combine hints", () => {
  const hints = combineHints({
    synonyms: ["test", "test2"],
    definitions: ["test", "test2"],
    examples: ["test", "test2"],
    images: ["test", "test2"],
  });
  expect(hints).toEqual([
    { type: "synonym", text: "test" },
    { type: "synonym", text: "test2" },
    { type: "definition", text: "test" },
    { type: "definition", text: "test2" },
    { type: "example", text: "test" },
    { type: "example", text: "test2" },
    { type: "image", text: "test" },
    { type: "image", text: "test2" },
  ]);
});
