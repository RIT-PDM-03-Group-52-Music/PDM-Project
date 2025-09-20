import type { Response } from "express";
import { ZodError } from "zod";

export const badRequest = (res: Response, message: string) =>
    res.status(400).json({ error: message });

export const unauthorized = (res: Response, message: string = "Unauthorized.") =>
    res.status(401).json({ error: message });

export const conflict = (res: Response, message: string) =>
    res.status(409).json({ error: message });

export const serverError = (res: Response) =>
    res.status(500).json({ error: "Internal server error." });

export const handleZodError = (res: Response, err: unknown) => {
    if (err instanceof ZodError) {
        const first = err.issues[0]?.message ?? "Invalid input.";
        return badRequest(res, first);
    }
    return null;
};
