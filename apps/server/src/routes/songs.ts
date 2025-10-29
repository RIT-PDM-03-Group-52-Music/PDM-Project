import { type GetSongByIDPath, GetSongByIDPathSchema, GetSongsQuerySchema } from "@pdm/contracts";
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
import { badRequest, notFound, ok, serverError } from "../utils/http";

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

router.get(
    "/",
    authgate,
    validatePath(GetSongByIDPathSchema),
    async (req: Request<GetSongByIDPath, unknown, unknown>, res: Response) => {
        try {
            const { song_id } = req.params;

            const result = await getSongsById.run(
                {
                    song_id: Number(song_id),
                },
                pool,
            );

            const song = result[0];
            if (!song) return notFound(res, "Song not found.");

            return ok(res, song);
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    },
);

export default router;
