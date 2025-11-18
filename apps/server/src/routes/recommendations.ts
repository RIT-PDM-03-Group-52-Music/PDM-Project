import { GetRecommendationsQuerySchema } from "@pdm/contracts";
import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { authgate } from "../middleware/authgate";
import { getRecommendations } from "../queries/recommendations.queries";
import { badRequest, ok, serverError, unauthorized } from "../utils/http";

const router = Router();

router.get("/", authgate, async (req: Request, res: Response) => {
    try {
        const query = GetRecommendationsQuerySchema.safeParse(req.query);
        if (!query.success) {
            const first = query.error.issues[0]?.message ?? "Invalid query parameters.";
            return badRequest(res, first);
        }

        const user_id = req.userId;
        if (!user_id) return unauthorized(res, "User ID missing from request.");

        const { page, page_size } = query.data;

        const result = await getRecommendations.run(
            {
                user_id: Number(user_id),
                page,
                page_size,
            },
            pool,
        );

        return ok(
            res,
            result.map((r) => ({
                song_id: r.song_id,
                song_title: r.song_title,
                average_rating: r.ave_rating,
                genre_support: r.genre_support,
            })),
        );
    } catch (err) {
        console.error(err);
        return serverError(res);
    }
});

export default router;
