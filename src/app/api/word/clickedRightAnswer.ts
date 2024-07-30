"use server";

import { handleServerError, prisma, response_message } from "@/utils";

export const incrementWordMemoryScore = async (id: string) => {
  "use server";

  try {
    const data = await prisma.englishUserWord.update({
      where: {
        id,
      },
      data: {
        wordMemoryScore: {
          increment: 1,
        },
      },
    });

    return response_message.update_success;
  } catch (error) {
    handleServerError(error);
  }
};

export const updateWordUpdatedAt = async (id: string) => {
  "use server";

  try {
    const data = await prisma.englishUserWord.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    return response_message.update_success;
  } catch (error) {
    handleServerError(error);
  }
};
