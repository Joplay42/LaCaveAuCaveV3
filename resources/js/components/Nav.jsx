import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuth } from "../lib/AuthContext";

export default function Nav() {
    const { isAuthenticated, user, logout } = useAuth();
    function handleLogout(e) {
        e.preventDefault();
        logout();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    LA CAVE AU CAVE
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/celliers">
                                Celliers
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                À propos
                            </Link>
                        </li>
                    </ul>
                    <div className="ms-auto d-flex align-items-center gap-3">
                        <SearchBar />
                        <div
                            style={{
                                display: "flex",
                                gap: "0.5rem",
                                alignItems: "center",
                                flexWrap: "nowrap",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {!isAuthenticated && (
                                <>
                                    <Link
                                        to="/login"
                                        className="btn-connexion"
                                        style={{
                                            textDecoration: "none",
                                            display: "inline-block",
                                        }}
                                    >
                                        Se connecter
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="btn-connexion"
                                        style={{
                                            textDecoration: "none",
                                            display: "inline-block",
                                        }}
                                    >
                                        Créer un compte
                                    </Link>
                                </>
                            )}
                            {isAuthenticated && (
                                <>
                                    <span
                                        style={{
                                            fontWeight: 600,
                                            color: "#fff",
                                        }}
                                    >
                                        Bonjour {user?.name}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="btn-connexion"
                                        style={{
                                            background: "#c40707",
                                            border: "none",
                                            display: "inline-block",
                                        }}
                                    >
                                        Déconnexion
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
