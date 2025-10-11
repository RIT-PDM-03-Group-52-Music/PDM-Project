import { type GetCollectionInput, GetCollectionSchema } from "@pdm/contracts";
import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { authgate } from "../middleware/authgate";
import { validateParams } from "../middleware/validate";
import { getCollectionById } from "../queries/collection.queries";
import { notFound, ok, serverError } from "../utils/http";

const router = Router();

router.get(
    "/:collection_id",
    authgate,
    validateParams(GetCollectionSchema),
    async (req: Request<GetCollectionInput, unknown, unknown>, res: Response) => {
        try {
            const { collection_id } = req.params;

            const result = await getCollectionById.run(
                {
                    collection_id: Number(collection_id),
                },
                pool,
            );

            const collection = result[0];
            if (!collection) return notFound(res, "Collection not found.");

            return ok(res, collection);
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    },
);

export default router;
