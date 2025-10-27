import {
    type DeleteCollectionItemPath,
    DeleteCollectionItemPathSchema,
    type DeleteCollectionPath,
    DeleteCollectionPathSchema,
    type GetCollectionParams,
    GetCollectionParamsSchema,
    GetCollectionsQuerySchema,
    type PatchCollectionBody,
    PatchCollectionBodySchema,
    type PostCollectionBody,
    PostCollectionBodySchema,
    type PutCollectionPath,
    PutCollectionPathSchema,
} from "@pdm/contracts";
import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { authgate } from "../middleware/authgate";
import { validateBody, validatePath } from "../middleware/validate";
import {
    deleteCollectionById,
    deleteCollectionItem,
    getCollectionById,
    getCollectionItem,
    getCollectionsByCollectionNameAsc,
    getCollectionsByCollectionNameDesc,
    getCollectionsBySongCountAsc,
    getCollectionsBySongCountDesc,
    getCollectionsByTotalLengthAsc,
    getCollectionsByTotalLengthDesc,
    insertCollectionByCollectionName,
    insertCollectionItemBySongId,
    updateCollectionName,
} from "../queries/collection.queries";
import {
    badRequest,
    conflict,
    created,
    notFound,
    ok,
    serverError,
    unauthorized,
} from "../utils/http";

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

router.post(
    "/",
    authgate,
    validateBody(PostCollectionBodySchema),
    async (req: Request<unknown, unknown, PostCollectionBody>, res: Response) => {
        try {
            const { collection_name } = req.body;

            if (!req.userId) return unauthorized(res, "Missing user ID.");

            const result = await insertCollectionByCollectionName.run(
                {
                    user_id: Number(req.userId),
                    collection_name,
                },
                pool,
            );

            const collection = result?.[0];
            if (!collection) return conflict(res, "Collection with this name already exists.");

            return ok(res, collection);
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    },
);

router.patch(
    "/:collection_id",
    authgate,
    validatePath(GetCollectionParamsSchema),
    validateBody(PatchCollectionBodySchema),
    async (req: Request<GetCollectionParams, unknown, PatchCollectionBody>, res: Response) => {
        try {
            const { collection_id } = req.params;
            const { collection_name } = req.body;

            if (!req.userId) return unauthorized(res, "Missing user ID.");
            const result = await getCollectionById.run(
                {
                    collection_id: Number(collection_id),
                },
                pool,
            );

            const collection = result[0];
            if (!collection || collection.user_id !== Number(req.userId))
                return notFound(res, "Collection not found.");

            const updateResult = await updateCollectionName.run(
                {
                    user_id: Number(req.userId),
                    collection_name: collection_name,
                    collection_id: Number(collection_id),
                },
                pool,
            );

            const updatedCollection = updateResult?.[0];
            if (!updatedCollection) return conflict(res, "Failed to update collection.");
            return ok(res, updatedCollection);
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    },
);

router.put(
    "/:collection_id/items/:song_id",
    authgate,
    validatePath(PutCollectionPathSchema),
    async (req: Request<PutCollectionPath, unknown, unknown>, res: Response) => {
        try {
            const { collection_id, song_id } = req.params;

            if (!req.userId) return unauthorized(res, "Missing user ID.");

            const result = await getCollectionById.run(
                {
                    collection_id: Number(collection_id),
                },
                pool,
            );

            const collection = result[0];
            if (!collection) return notFound(res, "Collection not found.");
            if (collection.user_id !== Number(req.userId)) {
                return unauthorized(res, "You do not have permission to edit this collection.");
            }

            const insertResult = await insertCollectionItemBySongId.run(
                {
                    collection_id: Number(collection_id),
                    song_id: Number(song_id),
                    added_at: new Date().toISOString(),
                },
                pool,
            );

            const collectionItem = insertResult[0];
            if (!collectionItem) {
                const getResult = await getCollectionItem.run(
                    {
                        collection_id: Number(collection_id),
                        song_id: Number(song_id),
                        user_id: Number(req.userId),
                    },
                    pool,
                );
                return ok(res, getResult[0]);
            }
            return created(res, collectionItem);
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    },
);

router.delete(
    "/:collection_id/items/:song_id",
    authgate,
    validatePath(DeleteCollectionItemPathSchema),
    async (req: Request<DeleteCollectionItemPath, unknown, unknown>, res: Response) => {
        try {
            const { collection_id, song_id } = req.params;

            if (!req.userId) return unauthorized(res, "Missing user ID.");

            const result = await getCollectionById.run(
                {
                    collection_id: Number(collection_id),
                },
                pool,
            );

            const collection = result[0];
            if (!collection || collection.user_id !== Number(req.userId))
                return notFound(res, "Collection not found.");

            const deleteResult = await deleteCollectionItem.run(
                {
                    collection_id: Number(collection_id),
                    song_id: Number(song_id),
                    user_id: Number(req.userId),
                },
                pool,
            );

            const collectionItem = deleteResult[0];
            if (!collectionItem) {
                return notFound(res, "Collection item not found.");
            }

            return ok(res, collectionItem);
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    },
);

router.delete(
    "/:collection_id",
    authgate,
    validatePath(DeleteCollectionPathSchema),
    async (req: Request<DeleteCollectionPath, unknown, unknown>, res: Response) => {
        try {
            const { collection_id } = req.params;

            if (!req.userId) return unauthorized(res, "Missing user ID.");

            const result = await deleteCollectionById.run(
                {
                    collection_id: Number(collection_id),
                    user_id: Number(req.userId),
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
