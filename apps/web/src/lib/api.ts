const API_URL = "http://localhost:3001/api";

export type MergedUnion<A extends object, B extends object> =
    | (A & Partial<Omit<B, keyof A>>)
    | (B & Partial<Omit<A, keyof B>>);

export type Result<T, E = Error> = MergedUnion<
    { success: true; data: T },
    { success: false; error: E }
>;

export const ok = <T>(data: T): Result<T, never> => ({ success: true, data });
export const err = <E = Error>(error: E): Result<never, E> => ({
    success: false,
    error,
});

/**
 * Generic API error with message and optional status code
 */
export class ApiError extends Error {
    constructor(
        message: string,
        public status?: number,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

/**
 * Make an authenticated API request
 * Returns a Result type for explicit error handling
 */
export async function api<T = unknown>(
    endpoint: string,
    options?: RequestInit,
): Promise<Result<T, ApiError>> {
    try {
        const token = localStorage.getItem("access_token");

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options?.headers,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: "Request failed",
            }));
            return err(
                new ApiError(errorData.message || `HTTP ${response.status}`, response.status),
            );
        }

        const data = await response.json();
        return ok(data);
    } catch (error) {
        // Network errors, JSON parse errors, etc.
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return err(new ApiError(message));
    }
}
