import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { authgate } from "../middleware/authgate";
import { deleteFollowsByUserId, getFollowsByFollower } from "../queries/follows.queries";
import { ok, serverError, unauthorized } from "../utils/http";

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

// DELETE /follows/:user_id
router.delete("/:user_id", authgate, async (req: Request, res: Response) => {
    try {
        const follower_id = req.userId;
        if (!follower_id) return unauthorized(res, "Missing user ID.");

        const followee_id = Number(req.params.user_id);
        if (isNaN(followee_id)) return res.status(400).send("Invalid user ID.");

        const result = await deleteFollowsByUserId.run(
            { user_id: followee_id },
            pool
        );

        console.log("Delete result:", result);

        return res.sendStatus(204);
    } catch (err) {
        console.error(err);
        return serverError(res);
    } //
});

export default router;
