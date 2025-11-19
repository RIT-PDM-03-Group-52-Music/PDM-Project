import z from "zod";

export const PostListeningSessionBodySchema = z.object({
    song_id: z.string().regex(/^\d{1,24}$/, "Song ID must be a numeric string of up to 24 digits."),
});

export type PostListeningSessionBody = z.infer<typeof PostListeningSessionBodySchema>;

export const PostListenToCollectionPathSchema = z.object({
    collection_id: z
        .string()
        .regex(/^\d{1,24}$/, "Collection ID must be a numeric string of up to 24 digits."),
});

export type PostListenToCollectionPath = z.infer<typeof PostListenToCollectionPathSchema>;
