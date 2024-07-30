import { PrismaClient } from "@prisma/client";

export * from "./contextAPI";
export * from "./localstorageFun";
export * from "./server_entities";
export * from "./schema";
export * from "./functions";

export const prisma = new PrismaClient();

// export const fetcher = (...args) => fetch(...args).then((res) => res.json());
