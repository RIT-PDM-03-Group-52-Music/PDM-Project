import z from "zod";

export const GetUserPathSchema = z.object({

    user_id: z.string().regex(/^\d+$/, "User ID must be a number."),
});
export type UserPath = z.infer<typeof GetUserPathSchema>;