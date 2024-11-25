import { CreateQuizQuestionHintType, SuggestedHintsType } from "../types/quiz";

export const combineHints = (suggested_hints: SuggestedHintsType) => {
  const hints: CreateQuizQuestionHintType[] = [];
  if (suggested_hints?.synonyms.length > 0) {
    suggested_hints.synonyms.forEach((synonym) => {
      hints.push({ type: "synonym", text: synonym });
    });
  }
  if (suggested_hints?.definitions.length > 0) {
    suggested_hints.definitions.forEach((definition) => {
      hints.push({ type: "definition", text: definition });
    });
  }
  if (suggested_hints?.examples.length > 0) {
    suggested_hints.examples.forEach((example) => {
      hints.push({ type: "example", text: example });
    });
  }
  if (suggested_hints?.images.length > 0) {
    suggested_hints.images.forEach((image) => {
      hints.push({ type: "image", text: image });
    });
  }
  return hints;
};
