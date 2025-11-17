import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../lib/AuthContext";
import Modal from "./Modal";

export default function DeleteVinModal({ isOpen, onClose, onSuccess, vinId }) {
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [error, setError] = useState(null);
    const [vin, setVin] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (isOpen && vinId && user?.role === "admin") {
            setLoading(true);
            axios
                .get(`/api/vins/${vinId}`)
                .then((res) => {
                    setVin(res.data);
                    setError(null);
                })
                .catch((err) => {
                    setError("Erreur lors du chargement du vin.");
                })
                .finally(() => setLoading(false));
        } else {
            setVin(null);
        }
    }, [isOpen, vinId, user]);

    async function handleDelete() {
        if (!vinId) return;
        setDeleteLoading(true);
        setError(null);
        try {
            await axios.delete(`/api/vins/${vinId}`);
            onSuccess?.();
            onClose();
        } catch (err) {
            setError("Erreur lors de la suppression.");
        } finally {
            setDeleteLoading(false);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Confirmer la suppression"
            size="medium"
        >
            <div className="auth-form">
                {user?.role !== "admin" ? (
                    <div style={{ textAlign: "center", padding: "2rem" }}>
                        <p style={{ color: "#ff6b6b" }}>
                            Accès réservé à l'administrateur.
                        </p>
                    </div>
                ) : loading ? (
                    <div style={{ textAlign: "center", padding: "2rem" }}>
                        <p>Chargement…</p>
                    </div>
                ) : error ? (
                    <div
                        className="auth-alert error"
                        style={{ marginBottom: "1rem" }}
                    >
                        {error}
                    </div>
                ) : vin ? (
                    <>
                        <div
                            style={{
                                textAlign: "center",
                                marginBottom: "2rem",
                            }}
                        >
                            <p
                                style={{
                                    color: "#ff6b6b",
                                    fontWeight: "600",
                                    marginBottom: "1rem",
                                }}
                            >
                                Êtes-vous sûr de vouloir supprimer
                                définitivement ce vin ?
                            </p>
                        </div>
                        <div
                            style={{
                                marginBottom: "2rem",
                                padding: "1rem",
                                backgroundColor: "rgba(255,255,255,0.05)",
                                borderRadius: "8px",
                                textAlign: "center",
                            }}
                        >
                            {vin.image && (
                                <div style={{ marginBottom: "1rem" }}>
                                    <img
                                        src={`/storage/images/upload/${vin.image}`}
                                        alt={vin.nom_vin}
                                        style={{
                                            maxWidth: "150px",
                                            maxHeight: "200px",
                                            borderRadius: "6px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                            )}
                            <h3
                                style={{
                                    margin: "0 0 0.5rem",
                                    color: "#ffffff",
                                    fontSize: "1.2rem",
                                }}
                            >
                                {vin.nom_vin}
                            </h3>
                            {vin.millesime?.annee && (
                                <p
                                    style={{
                                        margin: "0 0 0.5rem",
                                        color: "#dcdcdc",
                                    }}
                                >
                                    Millésime : {vin.millesime.annee}
                                </p>
                            )}
                            <p
                                style={{
                                    margin: "0 0 0.3rem",
                                    color: "#cfcfcf",
                                }}
                            >
                                <strong>Pays :</strong>{" "}
                                {vin.pays?.nom_pays || "Inconnu"}
                            </p>
                            <p
                                style={{
                                    margin: "0 0 0.3rem",
                                    color: "#cfcfcf",
                                }}
                            >
                                <strong>Région :</strong>{" "}
                                {vin.region?.nom_region || "Inconnue"}
                            </p>
                            {vin.prix && (
                                <p
                                    style={{
                                        margin: "0.5rem 0 0",
                                        color: "#fff",
                                    }}
                                >
                                    <strong>Prix :</strong>{" "}
                                    {parseFloat(vin.prix)
                                        .toFixed(2)
                                        .replace(".", ",")}{" "}
                                    €
                                </p>
                            )}
                        </div>
                        <div
                            className="form-actions"
                            style={{
                                display: "flex",
                                gap: "1rem",
                                justifyContent: "center",
                            }}
                        >
                            <button
                                onClick={handleDelete}
                                disabled={deleteLoading}
                                className="btn btn-danger"
                                style={{ minWidth: "120px" }}
                            >
                                {deleteLoading ? "Suppression..." : "Supprimer"}
                            </button>
                            <button
                                onClick={onClose}
                                className="btn btn-secondary"
                                style={{
                                    minWidth: "120px",
                                    backgroundColor: "#6c757d",
                                    border: "none",
                                }}
                            >
                                Annuler
                            </button>
                        </div>
                    </>
                ) : null}
            </div>
        </Modal>
    );
}
