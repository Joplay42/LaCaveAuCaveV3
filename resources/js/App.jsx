import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import AuthProvider from "./lib/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    );
}
