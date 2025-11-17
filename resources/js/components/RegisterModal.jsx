import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../lib/AuthContext";
import Modal from "./Modal";

export default function RegisterModal({ isOpen, onClose, onSuccess }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        c_password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated, user, login } = useAuth();

    // Réinitialiser le formulaire quand la modal s'ouvre
    useEffect(() => {
        if (isOpen) {
            setForm({
                name: "",
                email: "",
                password: "",
                c_password: "",
            });
            setError(null);
        }
    }, [isOpen]);

    function onChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/register", form);
            if (response.data.success) {
                login({
                    user: response.data.user,
                    token: response.data.token,
                });
                onSuccess?.();
                onClose();
            }
        } catch (err) {
            setError(err.response?.data?.message || "Erreur d'inscription");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Inscription"
            size="medium"
        >
            <div className="auth-form">
                {isAuthenticated && (
                    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                        <p
                            className="text-success"
                            style={{ color: "#4CAF50" }}
                        >
                            Connecté en tant que <strong>{user?.name}</strong>
                        </p>
                    </div>
                )}

                {error && (
                    <div
                        className="auth-alert error"
                        style={{ marginBottom: "1rem" }}
                    >
                        {error}
                    </div>
                )}

                {!isAuthenticated && (
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nom</label>
                            <input
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="c_password">
                                Confirmez le mot de passe
                            </label>
                            <input
                                id="c_password"
                                name="c_password"
                                type="password"
                                value={form.c_password}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={loading}
                            >
                                {loading ? "Inscription..." : "Créer le compte"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
}
