import {
    type PutRatingBody,
    PutRatingBodySchema,
    type PutRatingPath,
    PutRatingPathSchema,
} from "@pdm/contracts";
import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { authgate } from "../middleware/authgate";
import { validateBody, validatePath } from "../middleware/validate";
import { rateSong } from "../queries/songs.queries";
import { notFound, ok, serverError, unauthorized } from "../utils/http";

const router = Router();

router.put(
    "/:song_id",
    authgate,
    validatePath(PutRatingPathSchema),
    validateBody(PutRatingBodySchema),
    async (req: Request<PutRatingPath, unknown, PutRatingBody>, res: Response) => {
        try {
            const { song_id } = req.params;
            const { rating } = req.body;
            const user_id = req.userId;
            if (!user_id) return unauthorized(res, "Missing user ID.");

            const result = await rateSong.run(
                {
                    user_id: Number(user_id),
                    song_id: Number(song_id),
                    rating,
                },
                pool,
            );

            const rate = result[0];
            if (!rate) return notFound(res, "Song not found.");

            return ok(res, rate);
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    },
);

export default router;
