import { z } from "zod";

export const GetTopFollowingQuerySchema = z.object({
    user_id: z.string().regex(/^\d+$/, "User ID must be a number."),
});

export type GetTopFollowingQuery = z.infer<typeof GetTopFollowingQuerySchema>;
