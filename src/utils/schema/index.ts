import { object, string, optional, enum_, email, pipe } from "valibot";

import { TypeOfEnglishWord } from "@prisma/client";

const EmailSchema = pipe(string(), email());

export const wordScheme = object({
  word: string(),
  meaning: string(),
  hindimeaning: optional(string()),
  description: optional(string()),
  typeofword: enum_(TypeOfEnglishWord),
  userEmailId: EmailSchema,
});
