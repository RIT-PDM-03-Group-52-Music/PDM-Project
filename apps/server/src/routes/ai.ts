import { type Request, type Response, Router } from "express";
import { validateBody } from "../middleware/validate";
import { PlanSchema, PlanOutputSchema, type PlanInput, CompleteSchema } from "@pdm/contracts";
import { generateObject, NoObjectGeneratedError } from "ai";
import { openai } from "@ai-sdk/openai";
import { noContent, ok, serverError } from "../utils/http";
import { PLAN_SYSTEM_PROMPT } from "../context/prompts";
// import { authgate } from "../middleware/authgate";

const router = Router();

router.post(
    "/plan",
    // authgate,
    validateBody(PlanSchema),
    async (req: Request<unknown, unknown, PlanInput>, res: Response) => {
        const { prompt, history } = req.body;

        try {
            const response = await generateObject({
                model: openai("gpt-4o-mini"),
                schema: PlanOutputSchema,
                system: PLAN_SYSTEM_PROMPT,
                messages: [
                    ...(history?.map((h) => ({
                        role: h.role,
                        content:
                            h.role === "assistant"
                                ? `${h.content}\n(Extra hidden context: ${h.context || "N/A"})`
                                : h.content,
                    })) ?? []),
                    { role: "user", content: prompt },
                ],
            });

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
    // authgate,
    validateBody(CompleteSchema),
    async (_req: Request<unknown, unknown, { prompt: string }>, _res: Response) => {
        //TODO
    },
);

export default router;
