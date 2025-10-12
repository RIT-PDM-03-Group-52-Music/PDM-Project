import { Navigate } from "react-router";
import { Chat } from "../components/Chat";
import { Header } from "../components/Header";
import { useAuth } from "../contexts/AuthContext";

export function ChatPage() {
    const auth = useAuth();
    if (!auth.isAuthenticated) return <Navigate to="/login" replace={true} />;

    return (
        <div className="font-sans flex flex-col items-center justify-start h-screen min-h-0 overflow-hidden text-neutral-50 bg-neutral-950">
            <Header />
            <Chat />
        </div>
    );
}
