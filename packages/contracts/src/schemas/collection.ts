import z from "zod";

export const GetCollectionSchema = z.object({
    collection_id: z
        .string()
        .regex(/^\d{1,24}$/, "Collection ID must be a numeric string of up to 24 digits."),
});
export type GetCollectionInput = z.infer<typeof GetCollectionSchema>;
