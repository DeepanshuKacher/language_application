"use server";

import { prisma, response_message } from "@/utils";
import { getSession } from "@auth0/nextjs-auth0";
import { EnglishUserWord } from "@prisma/client";

export async function getWords(): Promise<EnglishUserWord[]> {
  "use server";

  const session = await getSession();

  try {
    const words = await prisma.englishUserWord.findMany({
      where: {
        userEmailId: session?.user.email,
      },
    });

    return words;
  } catch (error) {
    throw error;
  }
}
