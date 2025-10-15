import { type GetCollectionParams, GetCollectionParamsSchema, type GetCollectionsQuery, GetCollectionsQuerySchema } from "@pdm/contracts";
import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { authgate } from "../middleware/authgate";
import { validatePath, validateQuery } from "../middleware/validate";
import { getCollectionById, getCollections } from "../queries/collection.queries";
import { notFound, ok, serverError } from "../utils/http";

const router = Router();

router.get(
    "/:collection_id",
    authgate,
    validatePath(GetCollectionParamsSchema),
    async (req: Request<GetCollectionParams, unknown, unknown>, res: Response) => {
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

router.get(
    "/",
    authgate,
    validateQuery(GetCollectionsQuerySchema),
    async (req: Request<unknown, GetCollectionsQuery, unknown>, res: Response) => {
        try {

            const { page, page_size, sort, order } = req.query;

            const result = await getCollections.run(
                {
                    //page: 
                    //page_size:
                    sort: `${sort} ${order.toUpperCase()}`,
                    //order:
                },
                pool,
            );

            // const { collection_id } = req.params;

            // const result = await getCollectionById.run(
            //     {
            //         collection_id: Number(collection_id),
            //     },
            //     pool,
            // );

            // const collection = result[0];
            // if (!collection) return notFound(res, "Collection not found.");

            return ok(res, collections);
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    },
);

export default router;
