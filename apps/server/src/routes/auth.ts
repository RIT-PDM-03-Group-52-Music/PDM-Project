import bcrypt from "bcrypt";
import { type Request, type Response, Router } from "express";
import { pool } from "../db";
import { sign } from "../jwt";
import { authgate } from "../middleware/authgate";
import { validateBody } from "../middleware/validate";
import { type LoginInput, LoginSchema, type RegisterInput, RegisterSchema } from "@pdm/contracts";
import type { PublicUser } from "@pdm/contracts";
import type { UserRow } from "../types/user";
import { conflict, serverError, unauthorized } from "../utils/http";

const router = Router();

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS, 10) : 12;

const toPublicUser = (u: UserRow): PublicUser => ({
    user_id: u.user_id,
    username: u.username,
    email: u.email,
    first_name: u.first_name,
    last_name: u.last_name,
    created_at: u.created_at,
    last_seen: u.last_seen,
});

/**
 * POST /api/auth/register
 * body: { username, password, email, first_name, last_name }
 * returns: { token, user }
 */
router.post(
    "/register",
    validateBody(RegisterSchema),
    async (req: Request<unknown, unknown, RegisterInput>, res: Response) => {
        try {
            const { username, password, email, first_name, last_name } = req.body;

            // 1) Check duplicates for username or email
            // QUERY NEEDED
            const existing = null;

            if (existing) return conflict(res, "Username or email already in use.");

            // 2) Hash password
            const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

            // 3) Insert user
            // QUERY NEEDED
            const insertedUser: UserRow = {
                user_id: "replace-with-real-id",
                username,
                password: passwordHash,
                email,
                created_at: new Date().toISOString(),
                last_seen: new Date().toISOString(),
                first_name,
                last_name,
            };

            const token = sign({ sub: insertedUser.user_id });
            return res.status(201).json({ token, user: toPublicUser(insertedUser) });
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    },
);

/**
 * POST /api/auth/login
 * body: { username, password }
 * returns: { token, user }
 */
router.post(
    "/login",
    validateBody(LoginSchema),
    async (req: Request<unknown, unknown, LoginInput>, res: Response) => {
        try {
            const { username, password } = req.body;

            // 1) Fetch user by username
            // QUERY NEEDED
            let user: UserRow | null = null as unknown as UserRow | null;

            if (!user) return unauthorized(res, "Invalid credentials.");

            // 2) Compare password
            const ok = await bcrypt.compare(password, user.password);
            if (!ok) return unauthorized(res, "Invalid credentials.");

            // 3) Update last_seen
            // QUERY NEEDED
            const freshUser: UserRow = {
                ...(user as UserRow),
                last_seen: new Date().toISOString(),
            };

            const token = sign({ sub: freshUser.user_id });
            return res.status(200).json({ token, user: toPublicUser(freshUser) });
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    },
);

/**
 * GET /api/auth/check
 * header: Authorization: Bearer <token>
 * returns: { ok, user }
 */
router.get("/check", authgate, async (req: Request, res: Response) => {
    try {
        // 1) Get userId from req (set in authgate)
        const userId = req.userId;
        if (!userId) return unauthorized(res, "No user ID.");

        // 2) Fetch user by ID
        // QUERY NEEDED
        const user: UserRow | null = null;

        if (!user) return unauthorized(res, "User not found.");

        return res.status(200).json({ ok: true, user: toPublicUser(user) });
    } catch (err) {
        console.error(err);
        return serverError(res);
    }
});

export default router;
