import {
    type PostListeningSessionBody,
    PostListeningSessionBodySchema,
    type PostListenToCollectionPath,
    PostListenToCollectionPathSchema,
} from "@pdm/contracts";
import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { authgate } from "../middleware/authgate";
import { validateBody, validatePath } from "../middleware/validate";
import { createListen, listenByCollectionId } from "../queries/listens.queries";
import { created, notFound, serverError, unauthorized } from "../utils/http";

const router = Router();

router.post(
    "/",
    authgate,
    validateBody(PostListeningSessionBodySchema),
    async (req: Request<unknown, unknown, PostListeningSessionBody>, res: Response) => {
        try {
            const { song_id } = req.body;
            const user_id = req.userId;
            if (!user_id) return unauthorized(res, "Missing user ID.");

            const listened_at = new Date().toISOString();

            const result = await createListen.run(
                {
                    song_id: Number(song_id),
                    listened_at,
                    user_id: Number(user_id),
                },
                pool,
            );

            const listen = result[0];
            if (!listen) return notFound(res, "Failed to play a song.");
            return created(res, listen);
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    },
);

router.post(
    "/collection/:collection_id",
    authgate,
    validatePath(PostListenToCollectionPathSchema),
    async (req: Request<PostListenToCollectionPath, unknown, unknown>, res: Response) => {
        try {
            const { collection_id } = req.params;
            const user_id = req.userId;
            if (!user_id) return unauthorized(res, "Missing user ID.");

            const listened_at = new Date().toISOString();

            const result = await listenByCollectionId.run(
                {
                    collection_id: Number(collection_id),
                    listened_at,
                    user_id: Number(user_id),
                },
                pool,
            );

            if (result.length === 0) return notFound(res, "Failed to play collection.");

            return created(res, result);
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    },
);

export default router;
