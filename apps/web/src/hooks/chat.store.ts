import type { CompleteInput, CompleteOutput, PlanInput, PlanOutput } from "@pdm/contracts";
import { create } from "zustand";
import { api } from "../lib/api";
import { normalizeApiPath, nowIso, uid } from "../lib/helpers";
import type { CallResult, Message, RunState } from "../lib/types";

interface ChatStoreState {
    messages: Message[];
    run: RunState | null;
    isBusy: boolean;
    sendPrompt: (prompt: string) => Promise<void>;
    reset: () => void;
}

export const useChatStore = create<ChatStoreState>()((set, get) => ({
    messages: [],
    run: null,
    isBusy: false,
    error: null,

    reset: () => set({ messages: [], run: null, isBusy: false }),

    sendPrompt: async (prompt: string) => {
        const text = prompt.trim();
        if (!text) return;
        if (get().isBusy) return;

        // Capture the moment this run starts
        const runStartedAt = nowIso();

        // Get previous 10 messages from the chat history
        const previous = get().messages.slice(-10);

        const history = previous.map((m) => ({
            role: m.role,
            content: m.content,
            ...(m.context !== undefined ? { context: m.context } : {}),
        }));

        // Add user message to state
        set((s) => ({
            messages: [
                ...s.messages,
                {
                    id: uid("msg"),
                    role: "user",
                    content: text,
                    createdAt: nowIso(),
                    durationMs: 0, // N/A
                    nCalls: { success: 0, total: 0 }, // N/A
                },
            ],
            error: null,
            isBusy: true,
            run: { phase: "planning", startedAt: runStartedAt, error: null },
        }));

        // Fetch call plan
        const planResult = await api<PlanOutput>("/ai/plan", {
            method: "POST",
            body: JSON.stringify({ prompt: text, history } satisfies PlanInput),
        });

        console.log("Plan result:", planResult);

        if (!planResult.success) {
            return set((s) => ({
                isBusy: false,
                run: {
                    phase: "error",
                    error: planResult.error.message,
                    startedAt: s.run?.startedAt ?? nowIso(),
                },
            }));
        }

        const calls = !planResult.data.body
            ? []
            : planResult.data.body.calls.map((c) => ({
                  call_id: c.call_id,
                  method: c.method,
                  path: c.path,
                  ...(c.query !== undefined ? { query: c.query } : {}),
                  ...(c.body !== undefined ? { body: c.body } : {}),
              }));

        set((s) => ({
            run: {
                phase: calls.length ? "executing" : "completing",
                startedAt: s.run?.startedAt ?? runStartedAt,
                error: null,
                plan: calls,
            },
        }));

        // Get results
        const results: CallResult[] = await Promise.all(
            calls.map(async (call) => {
                try {
                    const endpoint = normalizeApiPath(call.path, call.query);
                    const hasBody = call.body !== undefined;
                    const { success, error, data } = await api(endpoint, {
                        method: call.method,
                        body: hasBody ? JSON.stringify(call.body) : null,
                        headers: {
                            ...(hasBody ? { "Content-Type": "application/json" } : {}),
                        },
                    });

                    if (success) {
                        return {
                            call_id: call.call_id,
                            request: call,
                            response: { status: data.status, data: data.body },
                        } satisfies CallResult;
                    } else {
                        return {
                            call_id: call.call_id,
                            request: call,
                            response: {
                                status: error.status ?? 500,
                                data: { message: error.message },
                            },
                        } satisfies CallResult;
                    }
                } catch (e) {
                    return {
                        call_id: call.call_id,
                        request: {
                            method: call.method,
                            path: call.path,
                            ...(call.query ? { query: call.query } : {}),
                            ...(call.body ? { body: call.body } : {}),
                        },
                        response: {
                            status: 500,
                            data: { message: e instanceof Error ? e.message : String(e) },
                        },
                    } satisfies CallResult;
                }
            }),
        );

        // Complete
        set((s) => ({
            run: { ...(s.run ?? { startedAt: nowIso() }), phase: "completing", results },
        }));

        const completed = await api<CompleteOutput>("/ai/complete", {
            method: "POST",
            body: JSON.stringify({
                prompt: text,
                history,
                started_at: runStartedAt,
                results,
            } satisfies CompleteInput),
        });

        if (!completed.success || !completed.data.hasBody) {
            set((s) => ({
                isBusy: false,
                run: {
                    phase: "error",
                    error: completed.error?.message ?? "Completion failed",
                    startedAt: s.run?.startedAt ?? runStartedAt,
                },
            }));
            return;
        }

        set((s) => ({
            isBusy: false,
            messages: [
                ...s.messages,
                {
                    id: uid("msg"),
                    role: "assistant",
                    content: completed.data.body?.markdown_text ?? "",
                    context: completed.data.body?.context ?? "",
                    createdAt: nowIso(),
                    durationMs: Date.now() - new Date(runStartedAt).getTime(),
                    nCalls: {
                        success: results.filter((r) => r.response.status < 400).length,
                        total: results.length,
                    },
                },
            ],
            run: { ...(s.run ?? { startedAt: nowIso() }), phase: "done", completedAt: nowIso() },
        }));
    },
}));

export type ChatStore = ReturnType<typeof useChatStore>;
