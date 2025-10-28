import z from "zod";

export const GetSongsQuerySchemaBase = z.object({
    page: z.string().default("0").transform(Number),
    page_size: z.string().default("50").transform(Number),
    sort: z
        .enum(["song_title", "artist_name", "genre_name", "release_year"])
        .default("song_title"),
    order: z.enum(["asc", "desc"]).default("asc"),
});

export const GetSongsByTitleQuerySchema = GetSongsQuerySchemaBase.extend({
    song_title: z.string().min(1).max(254),
});

export const GetSongsByArtistNameQuerySchema = GetSongsQuerySchemaBase.extend({
    artist_name: z.string().min(1).max(128),
});

export const GetSongsByAlbumNameQuerySchema = GetSongsQuerySchemaBase.extend({
    album_name : z.string().min(1).max(128),
});

export const GetSongsByGenreNameQuerySchema = GetSongsQuerySchemaBase.extend({
    genre_name: z.string().min(1).max(64),
});

export const GetSongsQuerySchema = z.union([
    GetSongsByTitleQuerySchema,
    GetSongsByArtistNameQuerySchema,
    GetSongsByAlbumNameQuerySchema,
    GetSongsByGenreNameQuerySchema
]);