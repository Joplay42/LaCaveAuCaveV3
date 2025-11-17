import React, { useState, useEffect, useRef } from "react";
// Ajout reCAPTCHA
import ReCAPTCHA from "react-google-recaptcha";
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
    const [captchaToken, setCaptchaToken] = useState("");
    const recaptchaRef = useRef();
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

        if (!captchaToken) {
            setError("Veuillez valider le captcha.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("/api/register", {
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
                                {loading ? "Inscription..." : "Créer le compte"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
}
