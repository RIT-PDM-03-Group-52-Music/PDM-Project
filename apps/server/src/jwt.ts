import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET ?? "";
if (!secret) throw new Error("JWT_SECRET not set");

export type JWTPayload = { sub: string };

export const verify = (token: string): JWTPayload => jwt.verify(token, secret) as JWTPayload;

export const sign = (payload: JWTPayload) => jwt.sign(payload, secret);
