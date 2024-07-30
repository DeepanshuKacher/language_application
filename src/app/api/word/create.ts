"use server";

import { initialState, prisma, response_message, wordScheme } from "@/utils";
import { getSession } from "@auth0/nextjs-auth0";
import { parse } from "valibot";

async function createWord(
  // previousState: typeof initialState,
  formData: FormData
): Promise<typeof initialState> {
  "use server";
  const session = await getSession();

  const rawFormData = {
    word: formData.get("word"),
    meaning: formData.get("meaning"),
    hindimeaning: formData.get("hindimeaning"),
    description: formData.get("description"),
    typeofword: formData.get("typeofword"),
    userEmailId: session?.user.email,
  };

  try {
    const wordData = parse(wordScheme, rawFormData);
    await prisma.englishUserWord.create({
      data: wordData,
    });

    return response_message.creation_success;
  } catch (error) {
    throw error;
  }

  // mutate data
  // revalidate cache
}

export { createWord };
