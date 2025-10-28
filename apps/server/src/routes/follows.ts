import { Router, type Request, type Response } from "express";
import { authgate } from "../middleware/authgate";
import { ok, serverError, unauthorized } from "../utils/http";
import { getFollowsByFollower } from "../queries/follows.queries";
import { pool } from "../db";

const router = Router();

router.get("/", authgate, async (req: Request, res: Response) => {
    try {
        const user_id = req.userId;
        if (!user_id) return unauthorized(res, "User not found.");

        const result = await getFollowsByFollower.run(
            {
                user_id: Number(user_id),
            },
            pool,
        );

        return ok(res, result);
    } catch (err) {
        console.error(err);
        return serverError(res);
    }
});

export default router;
