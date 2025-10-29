import z from "zod";

export const GetUserQuerySchema = z.object({
    email: z.string().trim().toLowerCase().email("Email must be valid."),
});
export type GetUserSchema = z.infer<typeof GetUserQuerySchema>;

export const UserPathSchema = z.object({
    user_id: z.string().regex(/^\d+$/, "User ID must be a number."),
});
export type UserPath = z.infer<typeof UserPathSchema>;

export const PostFollowBodySchema = z.object({
    followee_id: z.string().regex(/^\d+$/, "Followee ID must be a number."),
})

export type PostFollowBody = z.infer<typeof PostFollowBodySchema>;