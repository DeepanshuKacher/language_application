import { EnglishUserWord } from "@prisma/client";
import { DayEnum } from "../contextAPI";
import dayjs from "dayjs";

export const getRandomElements = <T>(
  array: T[],
  count: number = 3,
  dontIncludeIndex: number
): T[] => {
  const result: T[] = [];
  const arrayLength = array.length;

  // If the array length is 0, return an empty array
  if (arrayLength === 0) {
    return result;
  }

  // If the array length is more than 2, ensure no repetitions
  if (arrayLength > 2) {
    const indices = new Set<number>();

    while (indices.size < count) {
      const randomIndex = Math.floor(Math.random() * arrayLength);
      if (randomIndex === dontIncludeIndex) continue;

      indices.add(randomIndex);
    }

    indices.forEach((index) => result.push(array[index]));
  } else {
    // Loop to pick random elements with repetition if necessary
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * arrayLength);
      result.push(array[randomIndex]);
    }
  }

  return result;
};

export const getRandomEnglishWordArray = (
  array: EnglishUserWord[],
  count: number = 3,
  dontIncludeWord: EnglishUserWord
): EnglishUserWord[] => {
  let dontIncludeIndex: number = -1; // Initialize with -1

  for (let i = 0; i < array.length; i++) {
    if (array[i].id === dontIncludeWord.id) {
      dontIncludeIndex = i; // Assign the correct index
      break;
    }
  }

  return getRandomElements<EnglishUserWord>(array, count, dontIncludeIndex);
};

export const filterWordsByCategory = (
  words: EnglishUserWord[],
  category: DayEnum
): EnglishUserWord[] => {
  const now = dayjs();

  switch (category) {
    case "daily":
      return words.filter(
        (word) =>
          word.wordMemoryScore <= 6 && now.diff(word.updatedAt, "hour") >= 12
      );

    case "weekly":
      return words.filter(
        (word) =>
          word.wordMemoryScore >= 7 &&
          word.wordMemoryScore <= 10 &&
          now.diff(word.updatedAt, "week") >= 1
      );

    case "monthly":
      return words.filter(
        (word) =>
          word.wordMemoryScore >= 11 &&
          word.wordMemoryScore <= 13 &&
          now.diff(word.updatedAt, "month") >= 1
      );

    case "yearly":
      return words.filter(
        (word) =>
          word.wordMemoryScore >= 14 &&
          word.wordMemoryScore <= 15 &&
          now.diff(word.updatedAt, "year") >= 1
      );
  }
};

export const shuffleArray: <T>(array: T[]) => T[] = (array) => {
  const shuffledArray = array.slice(); // Create a copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
