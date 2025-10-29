import z from "zod";

export const GetSongsQuerySchemaBase = z.object({
    page: z.string().default("0").transform(Number),
    page_size: z.string().default("10").transform(Number),
    sort: z.enum(["song_title", "artist_name", "genre_name", "released_at"]).default("song_title"),
    order: z.enum(["asc", "desc"]).default("asc"),
});

export const GetSongsByTitleQuerySchema = GetSongsQuerySchemaBase.extend({
    song_title: z.string().min(1).max(254),
});

export const GetSongsByArtistNameQuerySchema = GetSongsQuerySchemaBase.extend({
    artist_name: z.string().min(1).max(128),
});

export const GetSongsByAlbumNameQuerySchema = GetSongsQuerySchemaBase.extend({
    album_name: z.string().min(1).max(128),
});

export const GetSongsByGenreNameQuerySchema = GetSongsQuerySchemaBase.extend({
    genre_name: z.string().min(1).max(64),
});

export const GetSongsQuerySchema = z.union([
    GetSongsByTitleQuerySchema,
    GetSongsByArtistNameQuerySchema,
    GetSongsByAlbumNameQuerySchema,
    GetSongsByGenreNameQuerySchema,
]);

export const GetSongByIDPathSchema = z.object({
    song_id: z.string().regex(/^\d{1,24}$/, "Song ID must be a numeric string of up to 24 digits."),
});

export type GetSongByIDPath = z.infer<typeof GetSongByIDPathSchema>;

export const PutRatingPathSchema = z.object({
    song_id: z.string().regex(/^\d{1,24}$/, "Song ID must be a numeric string of up to 24 digits."),
});

export type PutRatingPath = z.infer<typeof PutRatingPathSchema>;

export const PutRatingBodySchema = z.object({
    rating: z.number().min(1).max(5),
});

export type PutRatingBody = z.infer<typeof PutRatingBodySchema>;