import { expect, test } from "vitest";
import { snakeToTitle } from "../utils";

test("snakeToTitle converts basic snake case to title case", () => {
    const snake = "hello_world";
    const expectedTitle = "Hello World";
    const actualTitle = snakeToTitle(snake);
    expect(actualTitle).toBe(expectedTitle);
});

test("snakeToTitle handles multiple underscores", () => {
    const snake = "hello_beautiful_world";
    const expectedTitle = "Hello Beautiful World";
    const actualTitle = snakeToTitle(snake);
    expect(actualTitle).toBe(expectedTitle);
});

test("snakeToTitle handles single word input", () => {
    const snake = "hello";
    const expectedTitle = "Hello";
    const actualTitle = snakeToTitle(snake);
    expect(actualTitle).toBe(expectedTitle);
});

test("snakeToTitle handles empty string", () => {
    const snake = "";
    const expectedTitle = "";
    const actualTitle = snakeToTitle(snake);
    expect(actualTitle).toBe(expectedTitle);
});

test("snakeToTitle handles consecutive underscores", () => {
    const snake = "hello__world";
    const expectedTitle = "Hello  World";
    const actualTitle = snakeToTitle(snake);
    expect(actualTitle).toBe(expectedTitle);
});

test("snakeToTitle preserves existing capital letters", () => {
    const snake = "hello_World_TEST";
    const expectedTitle = "Hello World TEST";
    const actualTitle = snakeToTitle(snake);
    expect(actualTitle).toBe(expectedTitle);
});

test("snakeToTitle handles leading and trailing underscores", () => {
    const snake = "_hello_world_";
    const expectedTitle = " Hello World ";
    const actualTitle = snakeToTitle(snake);
    expect(actualTitle).toBe(expectedTitle);
});

test("snakeToTitle handles numbers in string", () => {
    const snake = "hello_world_123";
    const expectedTitle = "Hello World 123";
    const actualTitle = snakeToTitle(snake);
    expect(actualTitle).toBe(expectedTitle);
});
