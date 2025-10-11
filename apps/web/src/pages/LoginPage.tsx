import type { LoginInput, RegisterInput } from "@pdm/contracts";
import { Disc3, Eye, EyeOff } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

type Mode = "login" | "signup";

export function LoginPage() {
    const { isAuthenticated, isLoading, error, clearError, login, register } = useAuth();
    if (isAuthenticated) return <Navigate to="/" replace={true} />;

    const [mode, setMode] = useState<Mode>("login");

    const [loginForm, setLoginForm] = useState<LoginInput & { login: string }>({
        login: "",
        password: "",
    });

    const [signupForm, setSignupForm] = useState<RegisterInput>({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
    });

    const [loginTouched, setLoginTouched] = useState<{ login: boolean; password: boolean }>({
        login: false,
        password: false,
    });

    const [signupTouched, setSignupTouched] = useState<{
        username: boolean;
        email: boolean;
        first_name: boolean;
        last_name: boolean;
        password: boolean;
    }>({
        username: false,
        email: false,
        first_name: false,
        last_name: false,
        password: false,
    });

    const [loginPwVisible, setLoginPwVisible] = useState(false);
    const [signupPwVisible, setSignupPwVisible] = useState(false);

    useEffect(() => {
        clearError();
    }, [mode]);

    const isValidEmail = (email: string) => {
        const at = email.indexOf("@");
        const dot = email.lastIndexOf(".");
        return at > 0 && dot > at + 1 && dot < email.length - 1;
    };

    const loginErrors = useMemo(() => {
        const errs: Partial<Record<keyof typeof loginForm, string>> = {};
        const loginValue = loginForm.login.trim();

        if (loginValue.length === 0) {
            errs.login = "Required";
        } else if (loginValue.includes("@")) {
            if (!isValidEmail(loginValue)) errs.login = "Invalid email";
        } else if (loginValue.length < 3) {
            errs.login = "Min 3 chars";
        }

        if (loginForm.password.length === 0) errs.password = "Required";

        return errs;
    }, [loginForm]);

    const signupErrors = useMemo(() => {
        const errs: Partial<Record<keyof RegisterInput, string>> = {};
        const username = signupForm.username.trim();
        const email = signupForm.email.trim();
        const first = signupForm.first_name.trim();
        const last = signupForm.last_name.trim();

        if (username.length < 3) errs.username = "Min 3 chars";
        else if (username.length > 32) errs.username = "Max 32 chars";

        if (!isValidEmail(email)) errs.email = "Invalid email";

        if (first.length === 0) errs.first_name = "Required";
        else if (first.length > 50) errs.first_name = "Max 50 chars";

        if (last.length === 0) errs.last_name = "Required";
        else if (last.length > 50) errs.last_name = "Max 50 chars";

        if (signupForm.password.length < 6) errs.password = "Min 6 chars";
        else if (signupForm.password.length > 128) errs.password = "Max 128 chars";

        return errs;
    }, [signupForm]);

    const canSubmit = useMemo(() => {
        if (mode === "login") return Object.keys(loginErrors).length === 0;
        return Object.keys(signupErrors).length === 0;
    }, [mode, loginErrors, signupErrors]);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (!canSubmit) return;

        if (mode === "login") {
            const isEmail = isValidEmail(loginForm.login.trim());

            await login({
                password: loginForm.password,
                ...(isEmail
                    ? { email: loginForm.login.trim().toLowerCase() }
                    : { username: loginForm.login.trim() }),
            });
        } else {
            await register({
                username: signupForm.username.trim(),
                email: signupForm.email.trim().toLowerCase(),
                first_name: signupForm.first_name.trim(),
                last_name: signupForm.last_name.trim(),
                password: signupForm.password,
            });
        }
    }

    return (
        <div className="font-sans flex flex-col items-center justify-center min-h-screen text-neutral-50 bg-neutral-950">
            <div className="relative flex w-full max-w-sm flex-col items-center justify-center p-6 bg-neutral-900 rounded-lg shadow-lg border-2 border-neutral-800">
                <Disc3 className="absolute top-2 left-2 text-neutral-700" size="28" />

                <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl font-bold">Relational Records</span>
                    <span className="text-md text-neutral-200">CSCI 320 - Team #52</span>
                </div>
            </div>

            <div
                className={
                    "flex w-full max-w-sm flex-col items-center justify-center p-6 rounded-lg shadow-lg border-2 mt-6 transition-colors border-neutral-800 bg-neutral-900"
                }
            >
                <nav className="w-full mb-4">
                    <div
                        role="tablist"
                        aria-label="Authentication mode"
                        className="flex items-center gap-6 border-b border-neutral-800 px-1"
                    >
                        <button
                            role="tab"
                            aria-selected={mode === "login"}
                            className={`relative -mb-px pb-2 px-1 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 focus-visible:rounded-sm ${
                                mode === "login"
                                    ? "text-neutral-100 border-b-2 border-neutral-300"
                                    : "text-neutral-400 hover:text-neutral-200 border-b-2 border-transparent"
                            }`}
                            onClick={() => setMode("login")}
                            disabled={isLoading}
                        >
                            <span>Sign in</span>
                        </button>
                        <button
                            role="tab"
                            aria-selected={mode === "signup"}
                            className={`relative -mb-px pb-2 px-1 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 focus-visible:rounded-sm ${
                                mode === "signup"
                                    ? "text-neutral-100 border-b-2 border-neutral-300"
                                    : "text-neutral-400 hover:text-neutral-200 border-b-2 border-transparent"
                            }`}
                            onClick={() => setMode("signup")}
                            disabled={isLoading}
                        >
                            <span>Create account</span>
                        </button>
                    </div>
                </nav>

                <form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
                    {mode === "login" ? (
                        <>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="login"
                                    className="text-sm font-medium flex items-center gap-1"
                                >
                                    <span>Username or Email</span>
                                    {loginTouched.login && loginErrors.login && (
                                        <span className="text-red-400 font-normal">
                                            · {loginErrors.login}
                                        </span>
                                    )}
                                </label>
                                <input
                                    id="login"
                                    type="text"
                                    className={`rounded-lg border ${
                                        loginTouched.login && loginErrors.login
                                            ? "border-red-600 focus:border-red-500"
                                            : "border-neutral-700 focus:border-neutral-500"
                                    } bg-neutral-800 px-4 py-2 text-neutral-100 disabled:text-neutral-500 focus:outline-none`}
                                    value={loginForm.login}
                                    onChange={(e) => {
                                        if (error) clearError();
                                        setLoginForm({ ...loginForm, login: e.target.value });
                                    }}
                                    onBlur={() => setLoginTouched((t) => ({ ...t, login: true }))}
                                    name="username"
                                    disabled={isLoading}
                                    required
                                    autoComplete="username"
                                />
                            </div>
                            <div className="flex flex-col gap-1 relative">
                                <label
                                    htmlFor="login-password"
                                    className="text-sm font-medium flex items-center gap-1"
                                >
                                    <span>Password</span>
                                    {loginTouched.password && loginErrors.password && (
                                        <span className="text-red-400 font-normal">
                                            · {loginErrors.password}
                                        </span>
                                    )}
                                </label>
                                <input
                                    id="login-password"
                                    type={loginPwVisible ? "text" : "password"}
                                    className={`rounded-lg border ${
                                        loginTouched.password && loginErrors.password
                                            ? "border-red-600 focus:border-red-500"
                                            : "border-neutral-700 focus:border-neutral-500"
                                    } bg-neutral-800 px-4 py-2 text-neutral-100 disabled:text-neutral-500 focus:outline-none pr-10`}
                                    value={loginForm.password}
                                    onChange={(e) => {
                                        if (error) clearError();
                                        setLoginForm({ ...loginForm, password: e.target.value });
                                    }}
                                    onBlur={() =>
                                        setLoginTouched((t) => ({ ...t, password: true }))
                                    }
                                    name="current-password"
                                    disabled={isLoading}
                                    required
                                    maxLength={128}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3.5 top-9 text-neutral-500 hover:text-neutral-200 focus:outline-none"
                                    onClick={() => setLoginPwVisible(!loginPwVisible)}
                                    tabIndex={-1}
                                    aria-label={loginPwVisible ? "Hide password" : "Show password"}
                                >
                                    {loginPwVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="signup-username"
                                    className="text-sm font-medium flex items-center gap-1"
                                >
                                    <span>Username</span>
                                    {signupTouched.username && signupErrors.username && (
                                        <span className="text-red-400 font-normal">
                                            · {signupErrors.username}
                                        </span>
                                    )}
                                </label>
                                <input
                                    id="signup-username"
                                    type="text"
                                    className={`rounded-lg border ${
                                        signupTouched.username && signupErrors.username
                                            ? "border-red-600 focus:border-red-500"
                                            : "border-neutral-700 focus:border-neutral-500"
                                    } bg-neutral-800 px-4 py-2 text-neutral-100 disabled:text-neutral-500 focus:outline-none`}
                                    value={signupForm.username}
                                    onChange={(e) => {
                                        if (error) clearError();
                                        setSignupForm({ ...signupForm, username: e.target.value });
                                    }}
                                    onBlur={() =>
                                        setSignupTouched((t) => ({ ...t, username: true }))
                                    }
                                    name="username"
                                    disabled={isLoading}
                                    required
                                    minLength={3}
                                    maxLength={32}
                                    autoComplete="username"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="signup-email"
                                    className="text-sm font-medium flex items-center gap-1"
                                >
                                    <span>Email</span>
                                    {signupTouched.email && signupErrors.email && (
                                        <span className="text-red-400 font-normal">
                                            · {signupErrors.email}
                                        </span>
                                    )}
                                </label>
                                <input
                                    id="signup-email"
                                    type="email"
                                    className={`rounded-lg border ${
                                        signupTouched.email && signupErrors.email
                                            ? "border-red-600 focus:border-red-500"
                                            : "border-neutral-700 focus:border-neutral-500"
                                    } bg-neutral-800 px-4 py-2 text-neutral-100 disabled:text-neutral-500 focus:outline-none`}
                                    value={signupForm.email}
                                    onChange={(e) => {
                                        if (error) clearError();
                                        setSignupForm({ ...signupForm, email: e.target.value });
                                    }}
                                    onBlur={() => setSignupTouched((t) => ({ ...t, email: true }))}
                                    name="email"
                                    disabled={isLoading}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="signup-first-name"
                                        className="text-sm font-medium flex items-center gap-1"
                                    >
                                        <span>First Name</span>
                                        {signupTouched.first_name && signupErrors.first_name && (
                                            <span className="text-red-400 font-normal">
                                                · {signupErrors.first_name}
                                            </span>
                                        )}
                                    </label>
                                    <input
                                        id="signup-first-name"
                                        type="text"
                                        className={`rounded-lg border ${
                                            signupTouched.first_name && signupErrors.first_name
                                                ? "border-red-600 focus:border-red-500"
                                                : "border-neutral-700 focus:border-neutral-500"
                                        } bg-neutral-800 px-4 py-2 text-neutral-100 disabled:text-neutral-500 focus:outline-none`}
                                        value={signupForm.first_name}
                                        onChange={(e) => {
                                            if (error) clearError();
                                            setSignupForm({
                                                ...signupForm,
                                                first_name: e.target.value,
                                            });
                                        }}
                                        onBlur={() =>
                                            setSignupTouched((t) => ({ ...t, first_name: true }))
                                        }
                                        name="given-name"
                                        disabled={isLoading}
                                        required
                                        maxLength={50}
                                        autoComplete="given-name"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="signup-last-name"
                                        className="text-sm font-medium flex items-center gap-1"
                                    >
                                        <span>Last Name</span>
                                        {signupTouched.last_name && signupErrors.last_name && (
                                            <span className="text-red-400 font-normal">
                                                · {signupErrors.last_name}
                                            </span>
                                        )}
                                    </label>
                                    <input
                                        id="signup-last-name"
                                        type="text"
                                        className={`rounded-lg border ${
                                            signupTouched.last_name && signupErrors.last_name
                                                ? "border-red-600 focus:border-red-500"
                                                : "border-neutral-700 focus:border-neutral-500"
                                        } bg-neutral-800 px-4 py-2 text-neutral-100 disabled:text-neutral-500 focus:outline-none`}
                                        value={signupForm.last_name}
                                        onChange={(e) => {
                                            if (error) clearError();
                                            setSignupForm({
                                                ...signupForm,
                                                last_name: e.target.value,
                                            });
                                        }}
                                        onBlur={() =>
                                            setSignupTouched((t) => ({ ...t, last_name: true }))
                                        }
                                        name="family-name"
                                        disabled={isLoading}
                                        required
                                        maxLength={50}
                                        autoComplete="family-name"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 relative">
                                <label
                                    htmlFor="signup-password"
                                    className="text-sm font-medium flex items-center gap-1"
                                >
                                    <span>Password</span>
                                    {signupTouched.password && signupErrors.password && (
                                        <span className="text-red-400 font-normal">
                                            · {signupErrors.password}
                                        </span>
                                    )}
                                </label>
                                <input
                                    id="signup-password"
                                    type={signupPwVisible ? "text" : "password"}
                                    className={`rounded-lg border ${
                                        signupTouched.password && signupErrors.password
                                            ? "border-red-600 focus:border-red-500"
                                            : "border-neutral-700 focus:border-neutral-500"
                                    } bg-neutral-800 px-4 py-2 text-neutral-100 disabled:text-neutral-500 focus:outline-none pr-10`}
                                    value={signupForm.password}
                                    onChange={(e) => {
                                        if (error) clearError();
                                        setSignupForm({ ...signupForm, password: e.target.value });
                                    }}
                                    onBlur={() =>
                                        setSignupTouched((t) => ({ ...t, password: true }))
                                    }
                                    name="new-password"
                                    disabled={isLoading}
                                    required
                                    minLength={6}
                                    maxLength={128}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3.5 top-9 text-neutral-500 hover:text-neutral-200 focus:outline-none"
                                    onClick={() => setSignupPwVisible(!signupPwVisible)}
                                    tabIndex={-1}
                                    aria-label={signupPwVisible ? "Hide password" : "Show password"}
                                >
                                    {signupPwVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </>
                    )}

                    <div className="relative w-full mt-3">
                        <button
                            type="submit"
                            className={`w-full px-4 py-3 rounded-lg font-medium ${
                                canSubmit
                                    ? "bg-neutral-100 text-neutral-900 hover:brightness-95 disabled:cursor-wait"
                                    : "bg-neutral-800 text-neutral-400 cursor-not-allowed"
                            }`}
                            disabled={!canSubmit || isLoading}
                            aria-disabled={!canSubmit || isLoading}
                        >
                            {mode === "login"
                                ? isLoading
                                    ? "Logging in…"
                                    : "Login"
                                : isLoading
                                  ? "Signing up…"
                                  : "Register"}
                        </button>
                        {error && <p className="mt-3 text-red-300 text-sm">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}
