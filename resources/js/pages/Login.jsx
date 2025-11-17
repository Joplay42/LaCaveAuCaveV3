import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../lib/AuthContext";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated, user, login, logout } = useAuth();
    const navigate = useNavigate();

    function onChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/login", form);
            if (response.data.success) {
                login({
                    user: response.data.user,
                    token: response.data.token,
                });
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Erreur de connexion");
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        logout();
    }

    return (
        <div className="container py-4">
            <h1>Connexion</h1>
            {isAuthenticated && (
                <p className="text-success">
                    Connecté en tant que <strong>{user?.name}</strong>
                </p>
            )}
            {error && <p className="text-danger">{error}</p>}
            {!isAuthenticated && (
                <form onSubmit={onSubmit} style={{ maxWidth: 420 }}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={onChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mot de passe</label>
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={onChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Envoi..." : "Se connecter"}
                    </button>
                </form>
            )}
            {isAuthenticated && (
                <button
                    className="btn btn-outline-secondary"
                    onClick={handleLogout}
                >
                    Se déconnecter
                </button>
            )}
        </div>
    );
}
