import { CircleQuestionMark, LogOut, RotateCcw, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useChatStore } from "../hooks/chat.store";

interface ProfileDropdown {
    firstName: string;
    lastName: string;
    email: string;
}

function ProfileButton({ firstName, lastName, email }: ProfileDropdown) {
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleMouseDown(e: MouseEvent) {
            if (
                isOpen &&
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleMouseDown);
        return () => document.removeEventListener("mousedown", handleMouseDown);
    }, [isOpen]);

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((s) => !s)}
                className="inline-flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 text-xs font-medium text-neutral-200 hover:bg-neutral-800 transition cursor-pointer"
                title="Account"
            >
                <User className="h-3 w-3" /> Account
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 min-w-48 z-20"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        role="menu"
                        aria-label="Account menu"
                        className="flex flex-col rounded-md border border-neutral-800 bg-neutral-900/80 text-neutral-200 text-sm shadow-xl"
                    >
                        <div className="flex flex-col px-4 py-3 border-b border-neutral-800">
                            <span className="block font-medium">
                                {firstName} {lastName}
                            </span>
                            <span className="block text-xs text-neutral-400">{email}</span>
                        </div>
                        <div className="p-1">
                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    setIsOpen(false);
                                    logout();
                                }}
                                className="inline-flex w-full items-center justify-between gap-2 rounded-md border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 text-xs font-medium text-neutral-200 hover:bg-neutral-800 transition cursor-pointer"
                            >
                                <span>Logout</span>
                                <LogOut className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export function Header() {
    const { user, isAuthenticated } = useAuth();
    const { messages, isBusy, reset, sendPrompt } = useChatStore();

    return (
        <header className="w-full flex flex-row items-center justify-between px-6 py-4 bg-neutral-900">
            <span className="text-neutral-100 text-md font-medium sm:text-lg">
                Relational Records
            </span>

            <div className="flex flex-row flex-end gap-1 sm:gap-4">
                {messages.length > 0 && (
                    <button
                        type="button"
                        onClick={() => reset()}
                        disabled={isBusy}
                        className="inline-flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 text-xs font-medium text-neutral-200 hover:bg-neutral-800 transition cursor-pointer disabled:opacity-50 disabled:hover:cursor-not-allowed"
                        title="Reset chat"
                    >
                        <RotateCcw className="h-3 w-3" /> Reset
                    </button>
                )}

                <button
                    type="button"
                    onClick={() => sendPrompt("What can you do?")}
                    disabled={isBusy}
                    className="inline-flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 text-xs font-medium text-neutral-200 hover:bg-neutral-800 transition cursor-pointer disabled:opacity-50 disabled:hover:cursor-not-allowed"
                    title="Send help message"
                >
                    <CircleQuestionMark className="h-3 w-3" /> Help
                </button>

                {isAuthenticated && (
                    <ProfileButton
                        firstName={user?.first_name ?? ""}
                        lastName={user?.last_name ?? ""}
                        email={user?.email ?? ""}
                    />
                )}
            </div>
        </header>
    );
}
