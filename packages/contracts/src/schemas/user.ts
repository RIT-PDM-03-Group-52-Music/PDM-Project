import z from "zod";
import type { email } from "zod/v4";

export const GetUserQuerySchema = z.object({
    email: z.string().trim().toLowerCase().email("Email must be valid."),
});
export type GetUserSchema = z.infer<typeof GetUserQuerySchema>;
