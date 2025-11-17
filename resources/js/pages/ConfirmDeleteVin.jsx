import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import axios from "axios";

export default function ConfirmDeleteVin() {
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [error, setError] = useState(null);
    const [vin, setVin] = useState(null);
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!isAuthenticated || user?.role !== "admin") {
            navigate("/");
            return;
        }

        axios
            .get(`/api/vins/${id}`)
            .then((response) => {
                setVin(response.data);
            })
            .catch((err) => {
                setError("Vin non trouvé");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [isAuthenticated, user, navigate, id]);

    async function handleDelete() {
        setDeleteLoading(true);
        try {
            await axios.delete(`/api/vins/${id}`);
            navigate("/");
        } catch (err) {
            setError("Erreur lors de la suppression");
            console.error(err);
        } finally {
            setDeleteLoading(false);
        }
    }

    if (!isAuthenticated || user?.role !== "admin") {
        return null;
    }

    if (loading) {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <p>Chargement...</p>
                </div>
            </div>
        );
    }

    if (error || !vin) {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <h2 className="auth-title">Erreur</h2>
                    <div className="auth-alert error">
                        {error || "Vin non trouvé"}
                    </div>
                    <div className="form-actions">
                        <button
                            onClick={() => navigate("/")}
                            className="btn btn-primary"
                        >
                            Retour à la liste
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Confirmer la suppression</h2>

                <div style={{ textAlign: "center" }}>
                    <p
                        style={{
                            color: "#ffdddd",
                            fontWeight: "600",
                            margin: "1rem 0 1.5rem",
                        }}
                    >
                        Êtes-vous sûr de vouloir supprimer définitivement ce vin
                        ?
                    </p>

                    <div
                        className="form-actions"
                        style={{
                            display: "flex",
                            gap: "12px",
                            justifyContent: "center",
                        }}
                    >
                        <button
                            onClick={handleDelete}
                            disabled={deleteLoading}
                            className="btn btn-primary"
                            style={{
                                background:
                                    "linear-gradient(90deg, #dc3545 0%, #c82333 100%)",
                            }}
                        >
                            {deleteLoading
                                ? "Suppression..."
                                : "Supprimer définitivement"}
                        </button>
                        <button
                            onClick={() => navigate(`/vins/${id}`)}
                            className="btn btn-primary"
                            style={{ background: "#6c6c6c" }}
                        >
                            Annuler
                        </button>
                    </div>
                </div>

                <div
                    style={{
                        marginTop: "22px",
                        borderTop: "1px solid rgba(255,255,255,0.04)",
                        paddingTop: "18px",
                    }}
                >
                    <section
                        className="info-section vin-detail"
                        style={{ padding: "0", margin: "0" }}
                    >
                        <div
                            className="info-image"
                            style={{ maxWidth: "180px", margin: "0 auto 12px" }}
                        >
                            {vin.image && (
                                <img
                                    src={`/storage/images/upload/${vin.image}`}
                                    alt={vin.nom_vin}
                                    style={{
                                        borderRadius: "10px",
                                        maxWidth: "100%",
                                        display: "block",
                                    }}
                                />
                            )}
                        </div>

                        <div
                            className="info-text"
                            style={{ textAlign: "center" }}
                        >
                            <h3 style={{ margin: "6px 0 8px", color: "#fff" }}>
                                {vin.nom_vin}
                            </h3>

                            {vin.millesime?.annee && (
                                <p
                                    style={{
                                        margin: "0 0 8px",
                                        color: "#dcdcdc",
                                    }}
                                >
                                    · {vin.millesime.annee}
                                </p>
                            )}

                            {vin.description && (
                                <p
                                    style={{
                                        color: "#cfcfcf",
                                        margin: "0 0 8px",
                                    }}
                                >
                                    {vin.description.length > 250
                                        ? vin.description.substring(0, 250) +
                                          "..."
                                        : vin.description}
                                </p>
                            )}

                            <p style={{ color: "#cfcfcf", margin: "6px 0" }}>
                                <strong>Pays:</strong>{" "}
                                {vin.pays?.nom_pays || "Pays inconnu"}
                            </p>
                            <p style={{ color: "#cfcfcf", margin: "6px 0" }}>
                                <strong>Région:</strong>{" "}
                                {vin.region?.nom_region || "Région inconnue"}
                            </p>

                            {vin.prix && (
                                <p style={{ margin: "8px 0 0" }}>
                                    <span
                                        className="btn-connexion"
                                        style={{
                                            pointerEvents: "none",
                                            cursor: "default",
                                        }}
                                    >
                                        {parseFloat(vin.prix)
                                            .toFixed(2)
                                            .replace(".", ",")}{" "}
                                        €
                                    </span>
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
