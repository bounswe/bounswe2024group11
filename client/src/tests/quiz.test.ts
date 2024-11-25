import { expect, test } from "vitest";
import { questionTypeToQuestion } from "../routes/Quiz/Quiz.utils";
import { getNumberDifference, getRelativeTime, pluralize } from "../utils";

test("quiz question title is correctly interpolated for type 1", () => {
    const questionType = 1;
    const question = "turquiz";
    const expectedTitle = `What is the Turkish translation of '${question}'?`;
    const actualTitle = questionTypeToQuestion(questionType, question);
    expect(actualTitle).toBe(expectedTitle);
});

test("quiz question title is correctly interpolated for type 2", () => {
    const questionType = 2;
    const question = "turquiz";
    const expectedTitle = `What is the English translation of '${question}'?`;
    const actualTitle = questionTypeToQuestion(questionType, question);
    expect(actualTitle).toBe(expectedTitle);
});

test("quiz question title is correctly interpolated for type 3", () => {
    const questionType = 3;
    const question = "turquiz";
    const expectedTitle = `What is the sense of '${question}'?`;
    const actualTitle = questionTypeToQuestion(questionType, question);
    expect(actualTitle).toBe(expectedTitle);
});

test("quiz question title is correctly interpolated for unknown type", () => {
    const questionType = 4;
    const question = "turquiz";
    const expectedTitle = `${question}?`;
    const actualTitle = questionTypeToQuestion(questionType, question);
    expect(actualTitle).toBe(expectedTitle);
});

test("relative time is correctly calculated for seconds", () => {
    const date = new Date();
    date.setSeconds(date.getSeconds() - 10);
    const expectedTime = "10 seconds ago";
    const actualTime = getRelativeTime(date);
    expect(actualTime).toBe(expectedTime);
});

test("relative time is correctly calculated for minutes", () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 10);
    const expectedTime = "10 minutes ago";
    const actualTime = getRelativeTime(date);
    expect(actualTime).toBe(expectedTime);
});

test("relative time is correctly calculated for hours", () => {
    const date = new Date();
    date.setHours(date.getHours() - 10);
    const expectedTime = "10 hours ago";
    const actualTime = getRelativeTime(date);
    expect(actualTime).toBe(expectedTime);
});

test("relative time is correctly calculated for days", () => {
    const date = new Date();
    date.setDate(date.getDate() - 10);
    const expectedTime = "10 days ago";
    const actualTime = getRelativeTime(date);
    expect(actualTime).toBe(expectedTime);
});

test("pluralize is correctly calculated for singular", () => {
    const count = 1;
    const singular = "item";
    const plural = "items";
    const expectedPluralized = "1 item";
    const actualPluralized = pluralize(count, singular, plural);
    expect(actualPluralized).toBe(expectedPluralized);
});

test("pluralize is correctly calculated for plural", () => {
    const count = 2;
    const singular = "item";
    const plural = "items";
    const expectedPluralized = "2 items";
    const actualPluralized = pluralize(count, singular, plural);
    expect(actualPluralized).toBe(expectedPluralized);
});

test("number difference is correctly calculated for positive difference", () => {
    const value1 = 10;
    const value2 = 5;
    const expectedDifference = 5;
    const actualDifference = getNumberDifference(value1, value2);
    expect(actualDifference).toBe(expectedDifference);
});

test("number difference is correctly calculated for negative difference", () => {
    const value1 = 5;
    const value2 = 10;
    const expectedDifference = -5;
    const actualDifference = getNumberDifference(value1, value2);
    expect(actualDifference).toBe(expectedDifference);
});

test("number difference is correctly calculated for null values", () => {
    const value1 = 4;
    const value2 = null;
    const expectedDifference = 0;
    const actualDifference = getNumberDifference(value1, value2);
    expect(actualDifference).toBe(expectedDifference);
});
