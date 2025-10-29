import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { handleZodError } from "../utils/http";

export const validateBody =
    <T>(schema: ZodSchema<T>) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = schema.parse(req.body);
            (req as unknown as { body: T }).body = parsed;
            next();
        } catch (err) {
            console.log("Validation error:", err);
            handleZodError(res, err) ?? res.status(400).json({ error: "Invalid request body." });
        }
    };

export const validatePath =
    <T>(schema: ZodSchema<T>) =>
    (req: Request<T>, res: Response, next: NextFunction) => {
        try {
            const parsed = schema.parse(req.params);
            (req as unknown as { params: T }).params = parsed;
            next();
        } catch (err) {
            handleZodError(res, err) ??
                res.status(400).json({ error: "Invalid request parameters." });
        }
    };
