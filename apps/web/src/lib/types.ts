export type Role = "user" | "assistant";

export interface Message {
    id: string;
    role: Role;
    content: string;
    context?: string;
    createdAt: string;
    durationMs: number;
    nCalls: { success: number; total: number };
}

export interface CallPlan {
    call_id: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    path: string;
    query?: string;
    body?: Record<string, unknown>;
}

export interface CallResult {
    call_id: string;
    request: Omit<CallPlan, "call_id">;
    response: {
        status: number;
        data: unknown;
    };
}

export type RunPhase = "idle" | "planning" | "executing" | "completing" | "done" | "error";

export interface RunState {
    phase: RunPhase;
    error?: string | null;
    startedAt?: string;
    completedAt?: string;
    plan?: CallPlan[] | null;
    results?: CallResult[] | null;
}
