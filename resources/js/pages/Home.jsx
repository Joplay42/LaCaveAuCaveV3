import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../lib/AuthContext";

export default function Home() {
    const [vins, setVins] = useState([]);
    const { isAuthenticated, user, logout } = useAuth();

    // Debug: afficher les infos de l'utilisateur
    console.log(
        "Home - isAuthenticated:",
        isAuthenticated,
        "user:",
        user,
        "role:",
        user?.role
    );

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
                    <Link to="/vins/create" className="btn-connexion">
                        + Ajouter un vin
                    </Link>
                )}
            </div>

            <div id="contenu">
                {vins.map((vin) => {
                    const isEfface = vin.efface;
                    // Not showing efface wines for now, will need user context
                    if (isEfface) {
                        return null;
                    }

                    return (
                        <div key={vin.id} className="carteVin">
                            <img
                                src={
                                    vin.image
                                        ? `/storage/images/upload/${vin.image}`
                                        : "/images/Image-Accueil.jpg"
                                }
                                alt={vin.nom_vin || vin.nom}
                            />
                            <h2
                                className="titreArticle"
                                style={{ color: "#333", marginTop: "0.5rem" }}
                            >
                                {vin.nom_vin || vin.nom}
                            </h2>
                            <p>
                                Région :{" "}
                                {vin.region ? vin.region.nom_region : "N/A"}
                            </p>
                            <p>Pays : {vin.pays ? vin.pays.nom_pays : "N/A"}</p>
                            <p>
                                Prix :{" "}
                                {new Intl.NumberFormat("fr-FR", {
                                    style: "currency",
                                    currency: "EUR",
                                }).format(vin.prix)}
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "0.5rem",
                                    flexWrap: "wrap",
                                }}
                            >
                                <Link
                                    to={`/vins/${vin.id}`}
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
                    );
                })}
            </div>
        </div>
    );
}
