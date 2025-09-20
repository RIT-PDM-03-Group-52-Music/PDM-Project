import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { handleZodError } from "../utils/http";

export const validateBody =
    <T>(schema: ZodSchema<T>) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (err) {
            handleZodError(res, err) ?? res.status(400).json({ error: "Invalid request body." });
        }
    };
