import { initTRPC, TRPCError } from "@trpc/server";
import type { Request } from "express";
import { type JwtPayload, verify } from "./jwt";

export const createContext = ({ req }: { req: Request }) => ({
    req,
    user: undefined as JwtPayload | undefined,
});

export type Context = ReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ ctx, next }) => {
    const token = ctx.req.headers.authorization?.split(" ")[1];
    if (!token) throw new TRPCError({ code: "UNAUTHORIZED" });

    try {
        return next({ ctx: { ...ctx, user: verify(token) } });
    } catch {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
});

export const protectedProcedure = t.procedure.use(isAuthed);

export const router = t.router;
export const publicProcedure = t.procedure;
