import { GetAlbumsQuerySchema } from "@pdm/contracts";
import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { authgate } from "../middleware/authgate";
import { getAlbumsByAlbumName } from "../queries/albums.queries";
import { badRequest, ok, serverError } from "../utils/http";

const router = Router();

router.get("/", authgate, async (req: Request, res: Response) => {
    try {
        const query = GetAlbumsQuerySchema.safeParse(req.query);
        if (!query.success) {
            const first = query.error.issues[0]?.message ?? "Invalid query parameters.";
            return badRequest(res, first);
        }

        const result = await getAlbumsByAlbumName.run(
            {
                album_name: query.data.album_name,
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
