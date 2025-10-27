import z from "zod";

export const GetCollectionParamsSchema = z.object({
    collection_id: z
        .string()
        .regex(/^\d{1,24}$/, "Collection ID must be a numeric string of up to 24 digits."),
});
export type GetCollectionParams = z.infer<typeof GetCollectionParamsSchema>;

export const GetCollectionsQuerySchema = z.object({
    page: z.string().default("0").transform(Number),
    page_size: z.string().default("15").transform(Number),
    sort: z.enum(["collection_name", "songs_count", "total_minutes"]).default("collection_name"),
    order: z.enum(["asc", "desc"]).default("asc"),
});

export const PostCollectionBodySchema = z.object({
    collection_name: z
        .string()
        .min(3, "Collection name must be at least 3 character long.")
        .max(24, "Collection name must be at most 24 characters long."),
});

export type PostCollectionBody = z.infer<typeof PostCollectionBodySchema>;

export const PatchCollectionBodySchema = z.object({
    collection_name: z
        .string()
        .min(3, "Collection name must be at least 3 character long.")
        .max(24, "Collection name must be at most 24 characters long."),
});

export type PatchCollectionBody = z.infer<typeof PatchCollectionBodySchema>;

export const PutCollectionPathSchema = z.object({
    collection_id: z
        .string()
        .regex(/^\d{1,24}$/, "Collection ID must be a numeric string of up to 24 digits."),
    song_id: z.string().regex(/^\d{1,24}$/, "Song ID must be a numeric string of up to 24 digits."),
});

export type PutCollectionPath = z.infer<typeof PutCollectionPathSchema>;

export const DeleteCollectionItemPathSchema = z.object({
    collection_id: z
        .string()
        .regex(/^\d{1,24}$/, "Collection ID must be a numeric string of up to 24 digits."),
    song_id: z.string().regex(/^\d{1,24}$/, "Song ID must be a numeric string of up to 24 digits."),
});

export type DeleteCollectionItemPath = z.infer<typeof DeleteCollectionItemPathSchema>;

export const DeleteCollectionPathSchema = z.object({
    collection_id: z
        .string()
        .regex(/^\d{1,24}$/, "Collection ID must be a numeric string of up to 24 digits."),
});

export type DeleteCollectionPath = z.infer<typeof DeleteCollectionPathSchema>;
