import { z } from "zod";

export const RegisterSchema = z.object({
    username: z.string().trim().min(3, "Username must be at least 3 characters."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    email: z.string().trim().email("Email must be valid."),
    first_name: z.string().trim().min(1, "First name is required."),
    last_name: z.string().trim().min(1, "Last name is required."),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
    username: z.string().trim().min(1, "Username is required."),
    password: z.string().min(1, "Password is required."),
});

export type LoginInput = z.infer<typeof LoginSchema>;
