import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import axios from "axios";

export default function VinCard({ vin, onDelete }) {
    const { isAuthenticated, user } = useAuth();
    const title = vin.nom_vin || vin.nom || vin.name || "Vin sans nom";
    const region =
        typeof vin.region === "string"
            ? vin.region
            : vin.region?.nom_region || vin.region_name || "—";
    const image =
        vin.image_url ||
        (vin.image ? `/storage/images/upload/${vin.image}` : null);

    return (
        <div className="card mb-3 carteVin">
            {image && <img src={image} className="card-img-top" alt={title} />}
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">Région: {region}</p>
                <div
                    style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                >
                    <Link
                        to={`/vins/${vin.id || ""}`}
                        className="btn-connexion"
                    >
                        Voir
                    </Link>
                    {isAuthenticated && user?.role === "admin" && (
                        <>
                            <Link
                                to={`/vins/${vin.id}/edit`}
                                className="btn-connexion"
                                style={{
                                    background:
                                        "linear-gradient(90deg, #ffa500 0%, #ff8c00 100%)",
                                    boxShadow:
                                        "0 8px 22px rgba(255, 165, 0, 0.18), inset 0 -2px 6px rgba(0, 0, 0, 0.15)",
                                }}
                            >
                                Modifier
                            </Link>
                            <Link
                                to={`/vins/${vin.id}/delete`}
                                className="btn-connexion"
                                style={{
                                    background:
                                        "linear-gradient(90deg, #dc3545 0%, #c82333 100%)",
                                    boxShadow:
                                        "0 8px 22px rgba(220, 53, 69, 0.18), inset 0 -2px 6px rgba(0, 0, 0, 0.15)",
                                    border: "none",
                                }}
                            >
                                Supprimer
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
