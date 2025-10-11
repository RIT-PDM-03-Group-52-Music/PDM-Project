import { openai } from "@ai-sdk/openai";
import {
    PlanBodySchema,
    // type CompleteInput,
    // CompleteOutputSchema,
    // CompleteSchema,
    type PlanInput,
    PlanOutputSchema,
} from "@pdm/contracts";
import { generateObject, NoObjectGeneratedError } from "ai";
import { type Request, type Response, Router } from "express";
import { PLAN_SYSTEM_PROMPT } from "../context/prompts";
import { validateBody } from "../middleware/validate";
import { noContent, ok, serverError } from "../utils/http";

// import { authgate } from "../middleware/authgate";

const router = Router();

router.post(
    "/plan",
    // authgate,
    validateBody(PlanBodySchema),
    async (req: Request<unknown, unknown, PlanInput>, res: Response) => {
        try {
            const { prompt, history } = req.body;

            const response = await generateObject({
                model: openai("gpt-5-nano"),
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

// router.post(
//     "/complete",
//     // authgate,
//     validateBody(CompleteSchema),
//     async (req: Request<unknown, unknown, CompleteInput>, res: Response) => {
//         try {
//             // const { prompt, history, started_at, results } = req.body;

//             // const response = await generateObject({
//             //     model: openai("gpt-4o-mini"),
//             //     schema: CompleteOutputSchema,
//             //     system: COMPLETE_SYSTEM_PROMPT,
//         } catch (err) {
//             if (NoObjectGeneratedError.isInstance(err))
//                 return res.status(422).json({
//                     error: "Failed to generate valid completion",
//                 });

//             console.error(err);
//             return serverError(res);
//         }
//     },
// );

export default router;
