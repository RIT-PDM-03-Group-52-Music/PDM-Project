import {
    Clock,
    Dot,
    Hourglass,
    Loader2,
    Radio,
    Send,
    Terminal,
    Timer,
    TriangleAlert,
} from "lucide-react";
import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useChatStore } from "../hooks/chat.store";
import MarkdownRenderer from "./MarkdownRenderer";

const recommendations = [
    "Recommend me some songs I might like",
    "Summarize the latest in indie pop",
    "Help me organize my library of collections",
    "Show my collections",
    "Show my collections sorted by number of tracks",
    "Find songs titled 'Home' by different artists",
    "Search songs with the title 'Stay'",
    "Search for songs by 'Adele'",
    "Search for songs in the album 'Random Access Memories'",
    "Search for songs in the genre 'dream pop'",
    "Who am I following right now?",
    "Create a new collection called 'Road Trip Mix'",
    "How many songs are in my biggest collection?",
    "Which collection has the most songs?",
    "Which collection has the longest total playtime?",
    "How many collections do I have?",
    "Show my smallest collection by number of tracks",
    "Show my top 3 collections by number of tracks",
    "How many songs are titled 'Stay'?",
    "What's the earliest released song titled 'Home'?",
    "List distinct artists for songs titled 'Home'",
    "Show songs by 'Adele' sorted by release date",
];

const welcomes = [
    "Hello, %",
    "What's on for today, %?",
    "What can I do for you, %?",
    "Ready when you are, %",
    "What are you working on today?",
    "How can I assist you?",
];

// copilot generated :-p gonna fix up later / add on as we expand app
const getVirgilImageForText = (text: string) => {
    const t = (text || "").toLowerCase();
    console.log("Analyzing text for Virgil mood:", t);
    let mood = "blank";

    // System errors and no data states
    if (
        /no data|no relevant data|did not complete successfully|unable to retrieve|http 400/.test(t)
    ) {
        mood = "sad";
    }

    // API errors and invalid inputs
    else if (/error|invalid|failed|denied|unrecognizable parameters/.test(t)) {
        mood = "angry";
    }

    // Successful operations
    else if (/completed|received and executed|system status: nominal|greetings, operator/.test(t)) {
        mood = "happy";
    }

    // Awaiting input or needs more info
    else if (/please revise|please submit|please confirm|awaiting|how may i assist/.test(t)) {
        mood = "confused";
    }

    const src = `/virgil_images/${mood}-face.jpg`;
    console.log("Chose Virgil mood:", mood, "Image:", src);
    return src;
};

function VirgilAvatar({ text }: { text: string }) {
    const [src, setSrc] = useState(() => getVirgilImageForText(text));
    const [failed, setFailed] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // Debug: log component lifecycle
    useEffect(() => {
        console.log("VirgilAvatar mounted, text:", text);
        console.log("Trying to load image:", src);
    }, []);

    useEffect(() => {
        const newSrc = getVirgilImageForText(text);
        console.log("VirgilAvatar updating src:", newSrc);
        setSrc(newSrc);
        setFailed(false);
        setLoaded(false);
    }, [text]);

    // Pre-load image
    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            console.log("Image loaded successfully:", src);
            setLoaded(true);
        };
        img.onerror = (e) => {
            console.error("Image failed to load:", src, e);
            setFailed(true);
        };
        img.src = src;
    }, [src]);

    if (failed) {
        return (
            <div className="relative group">
                <div className="h-18 w-18 shrink-0 grid place-items-center rounded-full bg-neutral-800 border border-neutral-700 text-sm shadow-md shadow-black/30 font-semibold text-neutral-100">
                    V
                </div>
            </div>
        );
    }

    return (
        <div className="relative group w-12 h-12">
            <img
                src={src}
                alt="Virgil"
                title={loaded ? "Loaded: " + src : "Loading: " + src}
                loading="eager"
                onLoad={() => setLoaded(true)}
                onError={(e) => {
                    console.error(
                        "Virgil avatar failed to load:",
                        (e.target as HTMLImageElement).src,
                    );
                    setFailed(true);
                }}
                className={`w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 shadow-md shadow-black/30 transition-all duration-100 ${
                    loaded ? "opacity-100 scale-100" : "opacity-50 scale-95"
                } hover:border-neutral-600 hover:shadow-lg hover:scale-102`}
            />
        </div>
    );
}

export function Chat() {
    const { user } = useAuth();
    const { messages, isBusy, sendPrompt, run } = useChatStore();
    const [input, setInput] = useState("");
    const canSend = input.trim().length > 0 && !isBusy;
    const listRef = useRef<HTMLDivElement | null>(null);

    // Defaults
    const [welcome] = useState(welcomes[~~(Math.random() * welcomes.length)] ?? "");
    const [recommendation] = useState(() => {
        const i = ~~(Math.random() * recommendations.length);
        return [
            recommendations[i]!,
            recommendations[(i + 1) % recommendations.length]!,
            recommendations[(i + 2) % recommendations.length]!,
        ];
    });

    useEffect(() => {
        const list = listRef.current;
        if (list) list.scrollTop = list.scrollHeight;
    }, [messages.length]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!canSend) return;

        const text = input;
        setInput("");
        await sendPrompt(text);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (canSend) void onSubmit(e);
        }
    };

    return (
        <div className="w-full flex-1 min-h-0 flex flex-col p-2 md:p-4 gap-2 md:gap-4">
            <div className="relative flex-1 min-h-0 overflow-hidden rounded-xl border border-neutral-800 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 shadow-sm">
                <div ref={listRef} className="h-full overflow-y-auto py-4 px-2 sm:px-4 space-y-3">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center gap-4 text-neutral-300 text-sm">
                            {user && (
                                <div className="flex items-center gap-2 text-neutral-200">
                                    <Terminal />{" "}
                                    <span className="font-normal text-lg">
                                        {welcome.replace("%", user.first_name)}
                                    </span>
                                </div>
                            )}
                            <div className="flex flex-wrap items-center justify-center gap-2">
                                {recommendation.map((s, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setInput(s)}
                                        className="rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((m) =>
                                ((fromAssistant) => {
                                    return (
                                        <div
                                            key={m.id}
                                            className={`flex ${fromAssistant ? "justify-start" : "justify-end"}`}
                                        >
                                            <div className={`flex items-start gap-2 max-w-[85%]`}>
                                                {fromAssistant && <VirgilAvatar text={m.content} />}
                                                <div
                                                    className={`rounded-2xl text-sm shadow-md shadow-black/30 flex-1 ${
                                                        fromAssistant
                                                            ? "bg-neutral-800/70 border border-neutral-700 text-neutral-100 py-2 [--link-color:theme(colors.blue.400)] [--link-hover:theme(colors.blue.300)]"
                                                            : "bg-[rgb(111,143,94)] border border-[rgb(111,143,94)] text-white [--link-color:theme(colors.blue.200)] [--link-hover:theme(colors.blue.100)]"
                                                    }`}
                                                >
                                                    {fromAssistant && (
                                                        <div className="flex flex-row gap-1 items-center w-full border-b border-neutral-700 px-4 pb-2 pt-0.5 text-xs font-semibold text-neutral-500">
                                                            <Radio
                                                                className={`w-4 h-4 ${
                                                                    m.nCalls.total == 0
                                                                        ? "text-neutral-500"
                                                                        : m.nCalls.success === 0
                                                                          ? "text-[#8b3b3b]" /* muted error */
                                                                          : m.nCalls.success <
                                                                              m.nCalls.total
                                                                            ? "text-[#b7c48f]" /* partial - lighter camo */
                                                                            : "text-[#6f8f5e]" /* success - camo green */
                                                                }`}
                                                            />
                                                            <span>
                                                                API Calls:{" "}
                                                                <span className="font-code bg-black/10 px-0.5 rounded-sm">
                                                                    {m.nCalls.success}/
                                                                    {m.nCalls.total}
                                                                </span>
                                                                {"   "}
                                                                Duration:{" "}
                                                                <span className="font-code bg-black/10 px-0.5 rounded-sm">
                                                                    {m.durationMs}ms
                                                                </span>
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="px-4 py-2">
                                                        <MarkdownRenderer>
                                                            {m.content}
                                                        </MarkdownRenderer>
                                                    </div>
                                                </div>
                                                {!fromAssistant && user && (
                                                    <div className="h-8 w-8 shrink-0 grid place-items-center rounded-full bg-[rgb(111,143,94)] border border-[rgb(111,143,94)] text-[10px] shadow-md shadow-black/30 font-semibold text-white">
                                                        {user.first_name[0]?.toUpperCase() ?? "?"}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })(m.role === "assistant"),
                            )}

                            {isBusy && (
                                <div className="flex items-center gap-2 text-neutral-100 text-xs pl-1">
                                    <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
                                    Working...
                                </div>
                            )}
                        </>
                    )}
                </div>
                {run?.error && (
                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-4">
                        <div className="inline-flex items-center gap-2 rounded-md bg-red-900/80 px-3.5 py-1.5 text-sm font-medium text-red-200 shadow-sm shadow-black/30">
                            <TriangleAlert className="h-4 w-4 text-red-400" />
                            <span>{run?.error}</span>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={onSubmit} className="flex items-end gap-2">
                <div className="flex-1 flex items-center min-h-[44px] rounded-lg border border-neutral-700 bg-neutral-800 focus-within:ring-2 focus-within:ring-neutral-600/50 transition">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder="Type your request..."
                        rows={1}
                        className="w-full max-h-40 resize-none bg-transparent px-3 py-2.5 leading-5 text-neutral-100 placeholder-neutral-500 focus:outline-none disabled:opacity-50 disabled:cursor-wait"
                        disabled={isBusy}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!canSend}
                    className="h-11 inline-flex items-center justify-center gap-2 rounded-md border border-neutral-700 bg-neutral-800 px-3.5 text-sm font-medium text-neutral-200 shadow-sm hover:bg-neutral-800 hover:border-neutral-600 active:bg-neutral-800 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                    title="Send"
                >
                    <Send className="h-4 w-4" />
                    Send
                </button>
            </form>
        </div>
    );
}
