import React from "react";
import { useAuth } from "../lib/AuthContext";

export default function Profile() {
    const { user, isAuthenticated } = useAuth();
    return (
        <div className="container py-4">
            <h1>Profil</h1>
            {isAuthenticated && user ? (
                <div>
                    <p>Nom: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Vous n'êtes pas connecté.</p>
            )}
        </div>
    );
}
