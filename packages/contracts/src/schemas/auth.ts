import { z } from "zod";

export const RegisterBodySchema = z.object({
    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters.")
        .max(32, "Username must be at most 32 characters."),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters.")
        .max(128, "Password must be at most 128 characters."),
    email: z.string().trim().toLowerCase().email("Email must be valid."),
    first_name: z
        .string()
        .trim()
        .min(1, "First name is required.")
        .max(50, "First name must be at most 50 characters."),
    last_name: z
        .string()
        .trim()
        .min(1, "Last name is required.")
        .max(50, "Last name must be at most 50 characters."),
});
export type RegisterInput = z.infer<typeof RegisterBodySchema>;

export const LoginBodySchema = z
    .object({
        username: z.string().trim().optional(),
        email: z.string().trim().toLowerCase().email("Email must be valid.").optional(),
        password: z.string().min(1, "Password is required."),
    })
    .refine((d) => d.username || d.email, {
        message: "Either username or email is required.",
        path: ["username"],
    });

export type LoginInput = z.infer<typeof LoginBodySchema>;
