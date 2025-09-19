import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error("JWT_SECRET not set");

export type JwtPayload = { id: string; username: string };

export const verify = (token: string): JwtPayload => jwt.verify(token, secret) as JwtPayload;
export const sign = (payload: JwtPayload) => jwt.sign(payload, secret);
