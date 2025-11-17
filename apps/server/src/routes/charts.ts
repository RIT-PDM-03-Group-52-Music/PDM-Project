import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { authgate } from "../middleware/authgate";
import { getChartsByTop50 } from "../queries/chart.queries";
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

export default router;
