import { GetUserQuerySchema } from "@pdm/contracts";
import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { authgate } from "../middleware/authgate";
import { getPublicUserByEmail } from "../queries/user.queries";
import { badRequest, notFound, ok, serverError } from "../utils/http";

const router = Router();

router.get("/", authgate, async (req: Request, res: Response) => {
    try {
        const query = GetUserQuerySchema.safeParse(req.query);
        console.log("Get User Query:", req.query);
        if (!query.success) {
            const first = query.error.issues[0]?.message ?? "Email is required.";
            return badRequest(res, first);
        }

        const { email } = query.data;

        const result = await getPublicUserByEmail.run(
            {
                email,
            },
            pool,
        );

        const user = result[0];
        if (!user) return notFound(res, "User not found.");

        return ok(res, user);
    } catch (err) {
        console.error(err);
        return serverError(res);
    }
});

export default router;
