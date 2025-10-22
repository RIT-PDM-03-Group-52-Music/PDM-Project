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
