import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../lib/AuthContext";
import AjoutVinModal from "../components/AjoutVinModal";
import VinCard from "../components/VinCard";

export default function Home() {
    const [showAjoutModal, setShowAjoutModal] = useState(false);
    const [vins, setVins] = useState([]);
    const { isAuthenticated, user, logout } = useAuth();

    useEffect(() => {
        axios
            .get("/api/vins")
            .then((response) => {
                setVins(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the wines!", error);
            });
    }, []);

    function handleVinUpdate(updatedVin) {
        setVins((prev) =>
            prev.map((vin) => (vin.id === updatedVin.id ? updatedVin : vin))
        );
    }

    function handleVinDelete(deletedId) {
        setVins((prev) => prev.filter((vin) => vin.id !== deletedId));
    }

    function handleVinAdd(newVin) {
        setVins((prev) => [newVin, ...prev]);
    }

    return (
        <div className="container py-4">
            <section className="info-section">
                <div className="info-text">
                    <h2>Découvrez nos vins</h2>
                    <p>Explorez notre sélection de vins du monde entier.</p>
                    <a href="#" className="btn-connexion">
                        Voir la collection
                    </a>
                </div>
                <div className="info-image">
                    <img
                        src="/images/Image-Accueil.jpg"
                        alt="Image d'accueil"
                    />
                </div>
            </section>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                }}
            >
                <h1>Liste des vins</h1>
                {isAuthenticated && user?.role === "admin" && (
                    <button
                        className="btn-connexion"
                        onClick={() => setShowAjoutModal(true)}
                    >
                        + Ajouter un vin
                    </button>
                )}
            </div>

            <div id="contenu">
                {vins.map((vin) => {
                    const isEfface = vin.efface;
                    if (isEfface) {
                        return null;
                    }
                    return (
                        <VinCard
                            key={vin.id}
                            vin={vin}
                            onUpdate={handleVinUpdate}
                            onDelete={handleVinDelete}
                        />
                    );
                })}
            </div>

            {/* AjoutVinModal Popup */}
            {isAuthenticated && user?.role === "admin" && (
                <AjoutVinModal
                    isOpen={showAjoutModal}
                    onClose={() => setShowAjoutModal(false)}
                    onSuccess={(newVin) => {
                        handleVinAdd(newVin);
                        setShowAjoutModal(false);
                    }}
                />
            )}
        </div>
    );
}
