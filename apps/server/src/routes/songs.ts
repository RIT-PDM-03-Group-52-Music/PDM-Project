import { GetSongsQuerySchema } from "@pdm/contracts";
import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { authgate } from "../middleware/authgate";
import { validatePath } from "../middleware/validate";
import {
    getSongsByAlbumName,
    getSongsByArtistName,
    getSongsByGenreName,
    getSongsById,
    getSongsBySongTitle,
} from "../queries/songs.queries";
import { badRequest, notFound, ok, serverError, unauthorized } from "../utils/http";

const router = Router();

router.get("/", authgate, async (req: Request, res: Response) => {
    try {
        const query = GetSongsQuerySchema.safeParse(req.query);
        if (!query.success) {
            const first = query.error.issues[0]?.message ?? "Invalid query parameters.";
            return badRequest(res, first);
        }

        const { page, page_size, sort, order } = query.data;

        let result: unknown[] = [];
        if ("song_title" in query.data) {
            result = await getSongsBySongTitle.run(
                {
                    song_title: query.data.song_title,
                    page,
                    page_size,
                    sort,
                    order,
                },
                pool,
            );
        } else if ("artist_name" in query.data) {
            result = await getSongsByArtistName.run(
                {
                    artist_name: query.data.artist_name,
                    page,
                    page_size,
                    sort,
                    order,
                },
                pool,
            );
        } else if ("album_name" in query.data) {
            result = await getSongsByAlbumName.run(
                {
                    album_name: query.data.album_name,
                    page,
                    page_size,
                    sort,
                    order,
                },
                pool,
            );
        } else if ("genre_name" in query.data) {
            result = await getSongsByGenreName.run(
                {
                    genre_name: query.data.genre_name,
                    page,
                    page_size,
                    sort,
                    order,
                },
                pool,
            );
        }

        return ok(res, {
            songs: result,
            page,
            page_size,
        });
    } catch (err) {
        console.error(err);
        return serverError(res);
    }
});

/**
 * GET /songs/:song_id
 * Path param: song_id (int)
 * Returns:
 * 200 with song info { song_id, song_title, song_length, released_at, artists[], genres[] }
 * 401 if unauthorized
 * 404 if song not found
 */

router.get("/", authgate, async (req: Request, res: Response) => {
    const { song_id } = req.params;

    if (!req.userId) return unauthorized(res, "Missing user ID.");

    // Default paging
    const page = Number(req.query.page) || 0;
    const page_size = Number(req.query.page_size) || 10;
    const sort = String(req.query.sort || "song_title");
    const order = String(req.query.order || "asc");

    return getSongsById
        .run({ song_id: Number(song_id), page, page_size, sort, order }, pool)
        .then((result) => {
            if (result.length === 0) return notFound(res, "Song not found.");

            return ok(res, {
                songs: result,
                page,
                page_size,
            });
        })
        .catch((err) => {
            console.error(err);
            return serverError(res);
        });
});

export default router;
