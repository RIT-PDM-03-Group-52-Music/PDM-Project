import { UserPathSchema } from "@pdm/contracts";
import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { authgate } from "../middleware/authgate";
import { getProfileByUserID } from "../queries/profile.queries";
import { badRequest, notFound, ok, serverError } from "../utils/http";

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

        const result = await getProfilebyUserID.run(
            // TODO: sql BAD :(
            {
                username,
                collections_count: Number(collections_count),
                followers_count: Number(followers_count),
                following_count: Number(following_count),
                artists,
            },
            pool,
        );

        const username = result[0];
        if (!username) return notFound(res, "User not found.");
        const collections_count = result[1];
        if (!collections_count) return notFound(res, "Collections count not found.");
        const followers_count = result[2];
        if (!followers_count) return notFound(res, "Followers count not found.");
        const following_count = result[3];
        if (!following_count) return notFound(res, "Following count not found.");
        const artists = result[4];
        if (!artists) return notFound(res, "Artists not found.");

        return ok(res, {
            username,
            collections_count,
            followers_count,
            following_count,
            artists 
        });
    } catch (err) {
        console.error(err);
        return serverError(res);
    }
});

export default router;
