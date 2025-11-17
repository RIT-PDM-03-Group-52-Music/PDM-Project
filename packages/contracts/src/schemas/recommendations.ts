import z from "zod";

export const GetRecommendationsQuerySchema = z.object({
    page: z.string().default("0").transform(Number),
    page_size: z.string().default("10").transform(Number),
});

export type GetRecommendationsPath = z.infer<typeof GetRecommendationsQuerySchema>;
