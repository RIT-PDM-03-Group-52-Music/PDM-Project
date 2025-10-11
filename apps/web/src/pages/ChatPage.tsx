import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export function ChatPage() {
    const auth = useAuth();
    if (!auth.isAuthenticated) return <Navigate to="/login" replace={true} />;

    return (
        <div className="font-sans flex flex-col items-center justify-center min-h-screen text-neutral-50 bg-neutral-950"></div>
    );
}
