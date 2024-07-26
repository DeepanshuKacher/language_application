import { PrismaClient } from "@prisma/client";

export * from "./contextAPI";
export * from "./localstorageFun";

export const prisma = new PrismaClient();

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
