import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../lib/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";
import Modal from "./Modal";

export default function LoginModal({ isOpen, onClose, onSuccess }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated, user, login, logout } = useAuth();
    const [captchaToken, setCaptchaToken] = useState("");
    const recaptchaRef = useRef();

    // Réinitialiser le formulaire quand la modal s'ouvre
    useEffect(() => {
        if (isOpen) {
            setForm({ email: "", password: "" });
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

        if (!captchaToken) {
            setError("Veuillez valider le captcha.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("/api/login", {
                ...form,
                captcha: captchaToken,
            });
            if (response.data.success) {
                login({
                    user: response.data.user,
                    token: response.data.token,
                });
                onSuccess?.();
                onClose();
            }
        } catch (err) {
            setError(err.response?.data?.message || "Erreur de connexion");
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        logout();
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isAuthenticated ? "Profil" : "Connexion"}
            size="small"
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

                {!isAuthenticated ? (
                    <form onSubmit={onSubmit}>
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
                        {/* Ajout du captcha */}
                        <div
                            className="form-group"
                            style={{ margin: "1rem 0" }}
                        >
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={
                                    import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
                                    "6LcboA8sAAAAAIv3Me2aWZ0pkFKLpddoVsEkPyHU"
                                }
                                onChange={setCaptchaToken}
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={loading}
                            >
                                {loading ? "Connexion..." : "Se connecter"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div
                        className="form-actions"
                        style={{ textAlign: "center" }}
                    >
                        <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                        >
                            Se déconnecter
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
}
