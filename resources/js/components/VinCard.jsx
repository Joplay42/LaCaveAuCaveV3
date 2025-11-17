import React, { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import ShowVinModal from "./ShowVinModal";
import EditVinModal from "./EditVinModal";
import DeleteVinModal from "./DeleteVinModal";

export default function VinCard({ vin, onUpdate, onDelete }) {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { isAuthenticated, user } = useAuth();

    const title = vin.nom_vin || vin.nom || vin.name || "Vin sans nom";
    const region =
        typeof vin.region === "string"
            ? vin.region
            : vin.region?.nom_region || vin.region_name || "—";
    const pays =
        typeof vin.pays === "string"
            ? vin.pays
            : vin.pays?.nom_pays || vin.pays_name || "—";
    const image =
        vin.image_url ||
        (vin.image
            ? new URL(
                  `/storage/images/upload/${vin.image}`,
                  window.location.origin
              ).toString()
            : null);

    return (
        <>
            <div className="card mb-3 carteVin">
                {image && (
                    <img src={image} className="card-img-top" alt={title} />
                )}
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">Pays: {pays}</p>
                    <p className="card-text">Région: {region}</p>
                    <div
                        style={{
                            display: "flex",
                            gap: "0.5rem",
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            onClick={() => setShowDetailModal(true)}
                            className="btn-connexion"
                        >
                            Voir
                        </button>
                        {isAuthenticated && user?.role === "admin" && (
                            <>
                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="btn btn-warning"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="btn btn-danger"
                                >
                                    Supprimer
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ShowVinModal
                isOpen={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                vinId={vin.id}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />

            <EditVinModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSuccess={(updatedVin) => {
                    onUpdate?.(updatedVin);
                    setShowEditModal(false);
                }}
                vinId={vin.id}
            />

            <DeleteVinModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onSuccess={() => {
                    onDelete?.(vin.id);
                    setShowDeleteModal(false);
                }}
                vinId={vin.id}
            />
        </>
    );
}
