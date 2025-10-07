import type { Response } from "express";
import { ZodError } from "zod";

export const ok = (res: Response, data: unknown) => res.status(200).json(data);

export const created = (res: Response, data: unknown) => res.status(201).json(data);

export const noContent = (res: Response) => res.status(204).send();

export const badRequest = (res: Response, message: string) =>
    res.status(400).json({ error: message });

export const unauthorized = (res: Response, message: string = "Unauthorized.") =>
    res.status(401).json({ error: message });

export const forbidden = (res: Response, message: string = "Forbidden.") =>
    res.status(403).json({ error: message });

export const notFound = (res: Response, message: string = "Not found.") =>
    res.status(404).json({ error: message });

export const conflict = (res: Response, message: string) =>
    res.status(409).json({ error: message });

export const unprocessableEntity = (res: Response, message: string) =>
    res.status(422).json({ error: message });

export const unavailableForLegalReasons = (
    res: Response,
    message: string = "Unavailable for legal reasons.",
) => res.status(451).json({ error: message });

export const serverError = (res: Response) =>
    res.status(500).json({ error: "Internal server error." });

export const handleZodError = (res: Response, err: unknown) => {
    if (err instanceof ZodError) {
        const first = err.issues[0]?.message ?? "Invalid input.";
        return badRequest(res, first);
    }
    return null;
};
