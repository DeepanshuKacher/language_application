import { EnglishUserWord } from "@prisma/client";

export type WordType = Omit<
  EnglishUserWord,
  "id" | "updatedAt" | "wordMemoryScore"
>;
