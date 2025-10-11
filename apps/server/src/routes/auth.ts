import {
    LoginBodySchema,
    type LoginInput,
    RegisterBodySchema,
    type RegisterInput,
} from "@pdm/contracts";
import bcrypt from "bcrypt";
import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { sign } from "../jwt";
import { authgate } from "../middleware/authgate";
import { validateBody } from "../middleware/validate";
import {
    getUserByEmail,
    getUserById,
    getUserByUsername,
    loginUser,
    registerUser,
} from "../queries/user.queries";
import { conflict, created, ok, serverError, unauthorized } from "../utils/http";

const router = Router();

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS, 10) : 12;

/**
 * POST /api/auth/register
 *
 * @description Register a new user account
 * @body username (3 <= string <= 32)
 * @body password (string === 60)
 * @body email (valid email <= 254)
 * @body first_name (1 <= string <= 50)
 * @body last_name (1 <= string <= 50)
 *
 * @returns 201 { access_token, user_id, username, email, first_name, last_name, created_at, last_seen }
 * @returns 409 on duplicate username or email
 * @returns 422 on validation error
 * @returns 500 on server error
 */
router.post(
    "/register",
    validateBody(RegisterBodySchema),
    async (req: Request<unknown, unknown, RegisterInput>, res: Response) => {
        try {
            const { username, password, email, first_name, last_name } = req.body;

            const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

            const result = await registerUser.run(
                {
                    username,
                    password: passwordHash,
                    email,
                    first_name,
                    last_name,
                    now: new Date().toISOString(),
                },
                pool,
            );

            const user = result[0];
            if (!user) return conflict(res, "Username or email already in use.");

            const token = sign({ sub: `${user.user_id}` });
            return created(res, {
                access_token: token,
                ...user,
            });
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    },
);

/**
 * POST /api/auth/login
 *
 * @description Authenticate user and generate access token
 * @body username OR email (required)
 * @body password (required)
 *
 * @returns 200 { access_token }
 * @returns 401 on invalid credentials
 * @returns 422 on validation error
 * @returns 500 on server error
 */
router.post(
    "/login",
    validateBody(LoginBodySchema),
    async (req: Request<unknown, unknown, LoginInput>, res: Response) => {
        try {
            const { username, email, password } = req.body;

            const result = username
                ? await getUserByUsername.run({ username }, pool)
                : email
                  ? await getUserByEmail.run({ email }, pool)
                  : null;

            const user = result?.[0];
            if (!user) return unauthorized(res, "Invalid credentials.");

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) return unauthorized(res, "Invalid credentials.");

            await loginUser.run({ user_id: user.user_id, now: new Date().toISOString() }, pool);

            const token = sign({ sub: `${user.user_id}` });
            return ok(res, { access_token: token });
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    },
);

/**
 * GET /api/auth/me
 *
 * @description Get current authenticated user's profile
 * @header Authorization: Bearer <token>
 *
 * @returns 200 { user_id, username, email, first_name, last_name, created_at, last_seen }
 * @returns 401 on unauthorized or user not found
 * @returns 500 on server error
 */
router.get("/me", authgate, async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) return unauthorized(res, "No user ID.");

        const result = await getUserById.run({ user_id: Number(userId) }, pool);

        const user = result[0];
        if (!user) return unauthorized(res, "User not found.");

        return ok(res, { ...user, password: undefined });
    } catch (err) {
        console.error(err);
        return serverError(res);
    }
});

export default router;
