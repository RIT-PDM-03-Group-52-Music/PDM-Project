import { type PostFollowBody, PostFollowBodySchema, type UserPath, UserPathSchema } from "@pdm/contracts";
import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { authgate } from "../middleware/authgate";
import { validateBody, validatePath } from "../middleware/validate";
import { deleteFollowsByUserId, getFollowsByFollower, postFollowsByUserId } from "../queries/follows.queries";
import { conflict, notFound, ok, serverError, unauthorized } from "../utils/http";

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

router.delete(
    "/:user_id",
    authgate,
    validatePath(UserPathSchema),
    async (req: Request<UserPath, unknown, unknown>, res: Response) => {
        try {
            const user_id = req.userId;
            if (!user_id) return unauthorized(res, "Missing user ID.");

            const { user_id: followee_id } = req.params;

            const result = await deleteFollowsByUserId.run(
                {
                    user_id: Number(user_id),
                    followee_id: Number(followee_id),
                },
                pool,
            );

            const follow = result[0];
            if (!follow) return notFound(res, "Follow relationship not found.");

            return ok(res, follow);
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    },
);

router.post(
    "/",
    authgate,
    validateBody(PostFollowBodySchema),
    async (req: Request<unknown, unknown, PostFollowBody>, res: Response) => {
        try {
            const { followee_id } = req.body;

            const user_id = req.userId;
            if (!user_id) return unauthorized(res, "User not found.");

            const result = await postFollowsByUserId.run(
                {
                    follower_id: Number(user_id),
                    followee_id: Number(followee_id),
                },
                pool
            );

            const follow = result[0];
            if (!follow) return conflict(res, "Unable to create follow relationship.");

            return ok(res, follow);
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    });



export default router;
