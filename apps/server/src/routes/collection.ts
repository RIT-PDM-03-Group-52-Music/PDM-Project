import {
    type GetCollectionParams,
    GetCollectionParamsSchema,
    GetCollectionsQuerySchema,
} from "@pdm/contracts";
import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { authgate } from "../middleware/authgate";
import { validatePath } from "../middleware/validate";
import {
    getCollectionById,
    getCollectionsByCollectionNameAsc,
    getCollectionsByCollectionNameDesc,
    getCollectionsBySongCountAsc,
    getCollectionsBySongCountDesc,
    getCollectionsByTotalLengthAsc,
    getCollectionsByTotalLengthDesc,
} from "../queries/collection.queries";
import { badRequest, notFound, ok, serverError, unauthorized } from "../utils/http";

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

router.get("/", authgate, async (req: Request, res: Response) => {
    try {
        const query = GetCollectionsQuerySchema.safeParse(req.query);
        if (!query.success) {
            const first = query.error.issues[0]?.message ?? "Invalid query parameters.";
            return badRequest(res, first);
        }

        const { page, page_size, sort, order } = query.data;

        const user_id = req.userId;
        if (!user_id) return unauthorized(res, "Missing user ID.");

        let result: unknown[] = [];

        if (sort === "collection_name" && order === "asc") {
            result = await getCollectionsByCollectionNameAsc.run(
                {
                    page,
                    page_size,
                    user_id: Number(user_id),
                },
                pool,
            );
        } else if (sort === "collection_name" && order === "desc") {
            result = await getCollectionsByCollectionNameDesc.run(
                {
                    page,
                    page_size,
                    user_id: Number(user_id),
                },
                pool,
            );
        } else if (sort === "songs_count" && order === "asc") {
            result = await getCollectionsBySongCountAsc.run(
                {
                    page,
                    page_size,
                    user_id: Number(user_id),
                },
                pool,
            );
        } else if (sort === "songs_count" && order === "desc") {
            result = await getCollectionsBySongCountDesc.run(
                {
                    page,
                    page_size,
                    user_id: Number(user_id),
                },
                pool,
            );
        } else if (sort === "total_minutes" && order === "asc") {
            result = await getCollectionsByTotalLengthAsc.run(
                {
                    page,
                    page_size,
                    user_id: Number(user_id),
                },
                pool,
            );
        } else if (sort === "total_minutes" && order === "desc") {
            result = await getCollectionsByTotalLengthDesc.run(
                {
                    page,
                    page_size,
                    user_id: Number(user_id),
                },
                pool,
            );
        }

        return ok(res, result);
    } catch (err) {
        console.error(err);
        return serverError(res);
    }
});

export default router;
