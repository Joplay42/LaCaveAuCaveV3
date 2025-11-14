import React from "react";
import { Link } from "react-router-dom";

export default function CellierCard({ cellier }) {
    return (
        <div className="carteVin">
            <h2 className="titreArticle" style={{ color: "#333" }}>
                {cellier.nom || "Cellier"}
            </h2>
            <p>Propriétaire : {cellier.user_name || "—"}</p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <Link
                    to={`/celliers/${cellier.id || ""}`}
                    className="btn-connexion"
                >
                    Ouvrir
                </Link>
            </div>
        </div>
    );
}
