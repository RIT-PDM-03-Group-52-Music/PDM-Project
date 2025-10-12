import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { handleZodError } from "../utils/http";

type ParamsLike = Record<string, string>;

export const validateBody =
    <T>(schema: ZodSchema<T>) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = schema.parse(req.body);
            (req as unknown as { body: T }).body = parsed;
            next();
        } catch (err) {
            handleZodError(res, err) ?? res.status(400).json({ error: "Invalid request body." });
        }
    };

export const validatePath =
    <T extends ParamsLike>(schema: ZodSchema<T>) =>
    (req: Request<T>, res: Response, next: NextFunction) => {
        try {
            const parsed = schema.parse(req.params);
            req.params = parsed;
            next();
        } catch (err) {
            handleZodError(res, err) ??
                res.status(400).json({ error: "Invalid request parameters." });
        }
    };

export const validateQuery =
    <T extends ParamsLike>(schema: ZodSchema<T>) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = schema.parse(req.query);
            (req as unknown as { query: T }).query = parsed;
            next();
        } catch (err) {
            handleZodError(res, err) ??
                res.status(400).json({ error: "Invalid query parameters." });
        }
    };
