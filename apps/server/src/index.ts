import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { z } from "zod";
import { sign } from "./jwt";
import { createContext, protectedProcedure, publicProcedure, router } from "./trpc";

const appRouter = router({
    login: publicProcedure
        .input(z.object({ username: z.string(), password: z.string() }))
        .mutation(async ({ input }) => {
            if (input.username === "admin" && input.password === "password") {
                return { token: sign({ id: "1", username: "admin" }) };
            } else {
                throw new Error("Invalid credentials");
            }
        }),

    unauthedTest: publicProcedure.query(async () => {
        return "hi";
    }),

    authedTest: protectedProcedure.query(async ({ ctx }) => {
        return `hi ${ctx.user.username}`;
    }),
});

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());
app.use(express.json());
app.use(
    "/trpc",
    createExpressMiddleware({
        router: appRouter,
        createContext: ({ req }) => createContext({ req }),
    }),
);

const port = process.env.PORT ?? 3001;
app.listen(port, () => console.log(`API running on port ${port}`));
