import type { LoginInput, RegisterInput } from "@pdm/contracts";
import {
    createContext,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { api } from "../lib/api";

export const ACCESS_TOKEN = "access_token";

interface User {
    user_id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at: string;
    last_seen: string;
}

interface AuthContextValue {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
    login: (credentials: LoginInput) => Promise<void>;
    register: (data: RegisterInput) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [hasToken, setHasToken] = useState<boolean>(
        () => localStorage.getItem(ACCESS_TOKEN) !== null,
    );
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const checkAuth = useCallback(async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        const { success, data } = await api<User>("/auth/me");

        if (success) setUser(data);
        else {
            localStorage.removeItem(ACCESS_TOKEN);
            setHasToken(false);
            setUser(null);
        }

        setIsLoading(false);
    }, []);

    const login = useCallback(
        async (credentials: LoginInput) => {
            setIsLoading(true);
            setError(null);

            const { success, error, data } = await api<{ access_token: string }>("/auth/login", {
                method: "POST",
                body: JSON.stringify(credentials),
            });

            if (success) {
                localStorage.setItem(ACCESS_TOKEN, data.access_token);
                setHasToken(true);
                await checkAuth();
            } else {
                setError(error.message);
                setIsLoading(false);
            }
        },
        [checkAuth],
    );

    const register = useCallback(async (fields: RegisterInput) => {
        setIsLoading(true);
        setError(null);

        const { success, error, data } = await api<User & { access_token: string }>(
            "/auth/register",
            {
                method: "POST",
                body: JSON.stringify(fields),
            },
        );

        if (success) {
            localStorage.setItem(ACCESS_TOKEN, data.access_token);
            const { access_token, ...userData } = data;
            setHasToken(true);
            setUser(userData);
        } else {
            setError(error.message);
        }

        setIsLoading(false);
    }, []);

    const logout = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem(ACCESS_TOKEN);

        if (token) await api("/auth/logout", { method: "POST" });

        localStorage.removeItem(ACCESS_TOKEN);
        setHasToken(false);
        setUser(null);
        setIsLoading(false);
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const value = useMemo(
        () => ({
            user,
            isLoading,
            isAuthenticated: hasToken || user !== null,
            error,
            login,
            register,
            logout,
            clearError,
        }),
        [user, isLoading, error, login, register, logout, clearError],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}
