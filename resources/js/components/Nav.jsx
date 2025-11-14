import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Nav() {
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
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">
                                    Profil
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
