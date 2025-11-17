import React from "react";
import { useParams, Link } from "react-router-dom";

export default function Cellier() {
    const { id } = useParams();

    return (
        <div className="container py-4">
            <Link to="/celliers" className="btn-retour">
                ← Retour
            </Link>

            <section className="info-section" style={{ paddingTop: "1rem" }}>
                <div className="info-text">
                    <h2>Cellier #{id}</h2>
                    <p>Informations et actions pour votre cellier.</p>
                    <div
                        style={{
                            display: "flex",
                            gap: "0.5rem",
                            flexWrap: "wrap",
                        }}
                    >
                        <a href="#" className="btn-connexion">
                            Ajouter un vin
                        </a>
                        <a href="#" className="btn-connexion">
                            Renommer
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
