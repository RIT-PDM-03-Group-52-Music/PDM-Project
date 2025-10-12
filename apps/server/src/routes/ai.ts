import { openai } from "@ai-sdk/openai";
import {
    CompleteBodySchema,
    type CompleteInput,
    CompleteOutputSchema,
    PlanBodySchema,
    type PlanInput,
    PlanOutputSchema,
} from "@pdm/contracts";
import { generateObject, NoObjectGeneratedError } from "ai";
import { type Request, type Response, Router } from "express";
import { COMPLETE_SYSTEM_PROMPT, PLAN_SYSTEM_PROMPT } from "../context/prompts";
import { authgate } from "../middleware/authgate";
import { validateBody } from "../middleware/validate";
import { noContent, ok, serverError } from "../utils/http";

const router = Router();

router.post(
    "/plan",
    authgate,
    validateBody(PlanBodySchema),
    async (req: Request<unknown, unknown, PlanInput>, res: Response) => {
        try {
            const { prompt, history } = req.body;

            const response = await generateObject({
                model: openai("gpt-4.1-nano"),
                schema: PlanOutputSchema,
                system: PLAN_SYSTEM_PROMPT,
                messages: [
                    ...(history?.map((h) => ({
                        role: h.role,
                        content:
                            h.role === "assistant"
                                ? `${h.content}\n\n>>> INTERNAL CONTEXT: ${h.context || "N/A"}`
                                : h.content,
                    })) ?? []),
                    { role: "user", content: prompt },
                ],
            });

            console.log("Prompt:", prompt);
            console.log("Generated plan:", response.object);

            if (response.object.calls.length === 0) return noContent(res);

            return ok(res, response.object);
        } catch (err) {
            if (NoObjectGeneratedError.isInstance(err))
                return res.status(422).json({
                    error: "Failed to generate valid API plan",
                });

            console.error(err);
            return serverError(res);
        }
    },
);

router.post(
    "/complete",
    authgate,
    validateBody(CompleteBodySchema),
    async (req: Request<unknown, unknown, CompleteInput>, res: Response) => {
        try {
            const { prompt, history, started_at, results } = req.body;

            const completed_at = new Date().toISOString();
            const startedAtTime = new Date(started_at).getTime();
            const ellapsed_ms = Number.isFinite(startedAtTime) ? Date.now() - startedAtTime : null;

            const execution = [
                ">>> EXECUTION CONTEXT",
                `started_at: ${started_at}`,
                `completed_at: ${completed_at}`,
                `ellapsed_ms: ${ellapsed_ms}`,
                "results (JSON):",
                JSON.stringify(results, null, 2),
            ].join("\n");

            const response = await generateObject({
                model: openai("gpt-4.1"),
                schema: CompleteOutputSchema,
                system: COMPLETE_SYSTEM_PROMPT,
                messages: [
                    ...(history?.map((h) => ({
                        role: h.role,
                        content:
                            h.role === "assistant"
                                ? `${h.content}\n\n>>> INTERNAL CONTEXT: ${h.context || "N/A"}`
                                : h.content,
                    })) ?? []),
                    { role: "user", content: prompt },
                    { role: "system", content: execution },
                ],
            });

            return ok(res, response.object);
        } catch (err) {
            if (NoObjectGeneratedError.isInstance(err))
                return res.status(422).json({
                    error: "Failed to generate valid completion",
                });

            console.error(err);
            return serverError(res);
        }
    },
);

export default router;
