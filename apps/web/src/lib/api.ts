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

export class ApiError extends Error {
    constructor(
        message: string,
        public status?: number,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

export type ApiMeta<T> =
    | { hasBody: true; status: number; headers: Record<string, string>; body: T }
    | { hasBody: false; status: number; headers: Record<string, string>; body: undefined };

export async function api<T = unknown>(
    endpoint: string,
    options?: RequestInit,
): Promise<Result<ApiMeta<T>, ApiError>> {
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
            const errorData = await response.json().catch(() => ({ message: "Request failed" }));
            return err(
                new ApiError(errorData.message || `HTTP ${response.status}`, response.status),
            );
        }

        const status = response.status;
        const headersRec: Record<string, string> = {};
        response.headers.forEach((v, k) => {
            headersRec[k] = v;
        });

        const contentType = response.headers.get("content-type") || "";
        const isJson = /application\/json/i.test(contentType);
        const isNoContent = status === 204;
        const hasBody = isJson && !isNoContent;

        if (hasBody) {
            const body = (await response.json()) as T;
            const meta: ApiMeta<T> = { hasBody: true, status, headers: headersRec, body };
            return ok<ApiMeta<T>>(meta);
        }

        const meta: ApiMeta<T> = { hasBody: false, status, headers: headersRec, body: undefined };
        return ok<ApiMeta<T>>(meta);
    } catch (error) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return err(new ApiError(message));
    }
}
