import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { useAuth } from "../lib/AuthContext";
import EditVinModal from "./EditVinModal";
import DeleteVinModal from "./DeleteVinModal";

export default function ShowVinModal({
    isOpen,
    onClose,
    vinId,
    onUpdate,
    onDelete,
}) {
    const [vin, setVin] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        if (isOpen && vinId) {
            setLoading(true);
            setError(null);
            axios
                .get(`/api/vins/${vinId}`)
                .then((res) => {
                    setVin(res.data);
                    setError(null);
                })
                .catch((err) => {
                    setError("Impossible de charger ce vin.");
                    console.error(err);
                })
                .finally(() => setLoading(false));
        }
    }, [isOpen, vinId]);

    const imageSrc = vin?.image_url
        ? vin.image_url
        : vin?.image
        ? new URL(
              `/storage/images/upload/${vin.image}`,
              window.location.origin
          ).toString()
        : "/images/Image-Accueil.jpg";

    const nomComplet = vin
        ? `${vin.nom_vin || ""}${
              vin.millesime && vin.millesime.annee
                  ? " · " + vin.millesime.annee
                  : ""
          }`
        : "";

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={nomComplet || "Détails du vin"}
                size="large"
            >
                {loading && (
                    <div style={{ textAlign: "center", padding: "2rem" }}>
                        <p>Chargement…</p>
                    </div>
                )}

                {error && (
                    <div style={{ textAlign: "center", padding: "2rem" }}>
                        <div className="auth-alert error">{error}</div>
                    </div>
                )}

                {vin && !loading && !error && (
                    <div>
                        <section
                            className="info-section vin-detail"
                            style={{ gap: "2rem", alignItems: "flex-start" }}
                        >
                            <div
                                className="info-image"
                                style={{ flex: "0 0 300px" }}
                            >
                                <img
                                    src={imageSrc}
                                    alt={vin.nom_vin}
                                    style={{
                                        width: "100%",
                                        height: "400px",
                                        objectFit: "cover",
                                        borderRadius: "12px",
                                        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                                    }}
                                />
                            </div>

                            <div className="info-text" style={{ flex: "1" }}>
                                <h2
                                    style={{
                                        fontSize: "2rem",
                                        fontWeight: "700",
                                        marginBottom: "1rem",
                                        color: "#ffffff",
                                    }}
                                >
                                    {vin.nom_vin}
                                </h2>

                                {vin.millesime?.annee && (
                                    <p
                                        style={{
                                            fontSize: "1.2rem",
                                            marginBottom: "1.5rem",
                                            color: "#e0e0e0",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Millésime : {vin.millesime.annee}
                                    </p>
                                )}

                                <div style={{ marginBottom: "1.5rem" }}>
                                    <p
                                        style={{
                                            color: "#d0d0d0",
                                            marginBottom: "0.5rem",
                                            fontSize: "1.1rem",
                                        }}
                                    >
                                        <strong>Pays :</strong>{" "}
                                        {vin.pays?.nom_pays || "Pays inconnu"}
                                    </p>
                                    <p
                                        style={{
                                            color: "#d0d0d0",
                                            marginBottom: "0.5rem",
                                            fontSize: "1.1rem",
                                        }}
                                    >
                                        <strong>Région :</strong>{" "}
                                        {vin.region?.nom_region ||
                                            "Région inconnue"}
                                    </p>
                                    {vin.cepage && (
                                        <p
                                            style={{
                                                color: "#d0d0d0",
                                                marginBottom: "0.5rem",
                                                fontSize: "1.1rem",
                                            }}
                                        >
                                            <strong>Cépage :</strong>{" "}
                                            {vin.cepage}
                                        </p>
                                    )}
                                </div>

                                {vin.description && (
                                    <div style={{ marginBottom: "1.5rem" }}>
                                        <h3
                                            style={{
                                                color: "#ffffff",
                                                fontSize: "1.3rem",
                                                marginBottom: "0.8rem",
                                            }}
                                        >
                                            Description
                                        </h3>
                                        <p
                                            style={{
                                                color: "#c5c5c5",
                                                lineHeight: "1.6",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            {vin.description}
                                        </p>
                                    </div>
                                )}

                                {vin.prix && (
                                    <div style={{ marginBottom: "2rem" }}>
                                        <span
                                            className="btn-connexion"
                                            style={{
                                                fontSize: "1.2rem",
                                                fontWeight: "600",
                                                pointerEvents: "none",
                                                cursor: "default",
                                            }}
                                        >
                                            {parseFloat(vin.prix)
                                                .toFixed(2)
                                                .replace(".", ",")}{" "}
                                            €
                                        </span>
                                    </div>
                                )}

                                {/* Boutons d'action pour les admins */}
                                {isAuthenticated && user?.role === "admin" && (
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "1rem",
                                            flexWrap: "wrap",
                                            marginTop: "2rem",
                                        }}
                                    >
                                        <button
                                            onClick={() =>
                                                setShowEditModal(true)
                                            }
                                            className="btn btn-warning"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() =>
                                                setShowDeleteModal(true)
                                            }
                                            className="btn btn-danger"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                )}
            </Modal>

            {/* Modal d'édition */}
            <EditVinModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSuccess={(updatedVin) => {
                    setVin(updatedVin);
                    onUpdate?.(updatedVin);
                    setShowEditModal(false);
                }}
                vinId={vinId}
            />

            {/* Modal de suppression */}
            <DeleteVinModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onSuccess={() => {
                    onDelete?.(vinId);
                    setShowDeleteModal(false);
                    onClose(); // Fermer aussi le modal de détails
                }}
                vinId={vinId}
            />
        </>
    );
}
