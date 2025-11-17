import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { authgate } from "../middleware/authgate";
import {
    getChartsByTop50,
    getTopFiftyFollowing,
    getTopFiveGenresForMonth,
} from "../queries/chart.queries";
import { ok, serverError, unauthorized } from "../utils/http";

const router = Router();

router.get("/top-50", authgate, async (req: Request, res: Response) => {
    try {
        const result = await getChartsByTop50.run(undefined, pool);
        return ok(res, { songs: result });
    } catch (err) {
        console.error(err);
        return serverError(res);
    }
});

router.get("/top-genres", authgate, async (req: Request, res: Response) => {
    try {
        const result = await getTopFiveGenresForMonth.run(undefined, pool);
        return ok(res, { genres: result });
    } catch (err) {
        console.error(err);
        return serverError(res);
    }
});

router.get("/top-50-following", authgate, async (req: Request, res: Response) => {
    try {
        const user_id = req.userId;
        if (!user_id) return unauthorized(res, "Missing user ID.");

        const result = await getTopFiftyFollowing.run(
            {
                user_id: Number(user_id),
            },
            pool,
        );
        return ok(res, { songs: result });
    } catch (err) {
        console.error(err);
        return serverError(res);
    }
});

export default router;
