import z from "zod";

export const GetCollectionSchema = z.object({
    collection_id: z
        .string()
        .min(1, "Collection ID is required.")
        .max(24, "Collection ID must be at most 24 characters."),
});
export type GetCollectionInput = z.infer<typeof GetCollectionSchema>;
