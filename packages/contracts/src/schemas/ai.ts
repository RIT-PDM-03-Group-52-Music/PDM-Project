import { z } from "zod";

export const PlanSchema = z.object({
    prompt: z.string().min(1, "Prompt is required."),
    history: z
        .array(
            z.object({
                role: z.enum(["user", "assistant"]),
                content: z.string(),
                context: z.string().optional(),
            }),
        )
        .max(10)
        .optional(),
});
export type PlanInput = z.infer<typeof PlanSchema>;

export const PlanOutputSchema = z.object({
    calls: z.array(
        z.object({
            call_id: z.string(),
            method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
            path: z.string(),
            query: z.string().optional(),
            body: z.record(z.any()).optional(),
        }),
    ),
});
export type PlanOutput = z.infer<typeof PlanOutputSchema>;

export const CompleteSchema = z.object({
    started_at: z.string().datetime(),
    prompt: z.string().min(1, "Prompt is required."),
    history: z
        .array(
            z.object({
                role: z.enum(["user", "assistant"]),
                content: z.string(),
                context: z.string().optional(),
            }),
        )
        .max(10)
        .optional(),
    results: z.array(
        z.object({
            call_id: z.string(),
            request: z.object({
                method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
                path: z.string(),
                query: z.string().optional(),
                body: z.record(z.any()).optional(),
            }),
            response: z.object({
                status: z.number(),
                data: z.any(),
            }),
        }),
    ),
});

export const CompleteOutputSchema = z.object({
    markdown_text: z.string(),
    context: z.string().optional(),
});
export type CompleteOutput = z.infer<typeof CompleteOutputSchema>;
