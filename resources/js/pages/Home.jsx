import React, { useState, useEffect } from "react";
import axios from "axios";
import { getStatus, logout } from "../lib/auth";

export default function Home() {
    const [vins, setVins] = useState([]);
    const [auth, setAuth] = useState(getStatus());

    function handleLogout() {
        logout();
        setAuth(getStatus());
    }

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

            <h1>Liste des vins</h1>

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
                                <a
                                    href={`/vins/${vin.id}`}
                                    className="btn-connexion"
                                >
                                    Voir
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
