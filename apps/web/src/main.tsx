import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { ChatPage } from "./pages/ChatPage";
import { LoginPage } from "./pages/LoginPage";

const root = document.getElementById("root");
if (!root) throw new Error("Failed to find the root element");

createRoot(root).render(
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<ChatPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </AuthProvider>
    </BrowserRouter>,
);
