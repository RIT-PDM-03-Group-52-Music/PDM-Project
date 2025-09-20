import type { NextFunction, Request, Response } from "express";
import { verify } from "../jwt";
import { unauthorized } from "../utils/http";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const authgate = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.header("authorization") ?? "";
    const token = auth.startsWith("Bearer ") ? auth.slice("Bearer ".length).trim() : "";

    if (!token) return unauthorized(res, "Missing bearer token.");

    try {
        const payload = verify(token);
        req.userId = payload.sub;
        next();
    } catch {
        return unauthorized(res, "Invalid token.");
    }
};
