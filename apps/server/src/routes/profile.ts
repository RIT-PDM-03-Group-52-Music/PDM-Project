import { UserPathSchema } from "@pdm/contracts";
import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { authgate } from "../middleware/authgate";
import { badRequest, notFound, ok, serverError } from "../utils/http";
import { getUsernamebyUserId, getCollectionsCountbyUserId, getFollowersCountbyUserId, getFollowingCountbyUserId, getArtistsbyTop10 } from "../queries/profile.queries";

const router = Router();

router.get("/", authgate, async (req: Request, res: Response) => {
    try {
        const query = UserPathSchema.safeParse(req.query);
        console.log("Get User Query:", req.query);
        if (!query.success) {
            const first = query.error.issues[0]?.message ?? "ID is required.";
            return badRequest(res, first);
        }

        const { user_id } = query.data;

        const result1 = await getUsernamebyUserId.run(
            {
                user_id: Number(user_id),
            },
            pool,
        );

        const result2 = await getCollectionsCountbyUserId.run(
            {
                user_id: Number(user_id),
            },
            pool,
        );

        const result3 = await getFollowersCountbyUserId.run(
            {
                user_id: Number(user_id),
            },
            pool,
        );

        const result4 = await getFollowingCountbyUserId.run(
            {
                user_id: Number(user_id),
            },
            pool,
        );

        const result5 = await getArtistsbyTop10.run(
            {
                user_id: Number(user_id),
            },
            pool,
        );


        const username = result1[0];
        if (!username) return notFound(res, "User not found.");
        const collections_count = result2[0];
        if (!collections_count) return notFound(res, "Collections could not be enumerated.");
        const followers_count = result3[0];
        if (!followers_count) return notFound(res, "Followers could not be enumerated.");
        const following_count = result4[0];
        if (!following_count) return notFound(res, "Follows could not be  enumerated.");
        const top_artists = result5;
        if (!top_artists) return notFound(res, "Top artists could not be enumerated.");

        return ok(res, {
            username,
            collections_count,
            followers_count,
            following_count,
            top_artists 
        });
    } catch (err) {
        console.error(err);
        return serverError(res);
    }
});

export default router;
