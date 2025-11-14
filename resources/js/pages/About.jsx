import React from "react";

export default function About() {
    return (
        <div className="container py-4">
            <div style={{ margin: "1rem 0" }}>
                <h1>À propos</h1>

                <div
                    className="info-section"
                    style={{ padding: "1rem 0", margin: "1rem 0" }}
                >
                    <div className="info-text">
                        <h2 style={{ marginBottom: "0.5rem" }}>
                            Équipe de développement
                        </h2>
                        <p style={{ marginBottom: "0.5rem" }}>
                            <strong>
                                Jonathan Deschênes, Nathan Brouillard, Mathéo
                                Lacerte
                            </strong>
                        </p>
                        <p style={{ marginBottom: "0.5rem" }}>
                            420-5H6 MO Applications web transactionnel
                            <br />
                            Automne 2025, Collège Montmorency
                        </p>
                    </div>
                </div>

                <div
                    className="info-section"
                    style={{ padding: "1rem 0", margin: "1rem 0" }}
                >
                    <div className="info-text">
                        <h2 style={{ marginBottom: "0.5rem" }}>
                            La cave au cave
                        </h2>
                        <p style={{ marginBottom: "0.5rem" }}>
                            L'application "La cave au cave" permet de magasiner
                            différentes sortes de vins selon le pays ainsi que
                            la région de chaque vin.
                        </p>
                        <p style={{ marginBottom: "0.5rem" }}>
                            La page d'Accueil présente la liste des vins avec le
                            nom, le prix ainsi que le pays et la région.
                        </p>
                        <p style={{ marginBottom: "0.5rem" }}>
                            On y retrouve un lien pour ajouter un vin (seulement
                            par un auteur en session). La page de création d'un
                            vin permet d'insérer un nouveau vin en spécifiant
                            son nom, son prix, son pays et sa région. Le vin
                            peut être modifié (seulement par un auteur en
                            session).
                        </p>
                    </div>
                </div>

                <div
                    className="info-section"
                    style={{ padding: "1rem 0", margin: "1rem 0" }}
                >
                    <div className="info-text">
                        <h2 style={{ marginBottom: "0.5rem" }}>Tests</h2>
                        <p style={{ marginBottom: "0.5rem" }}>
                            Voici comment accéder aux tests :
                        </p>
                        <p>
                            <a
                                href="#"
                                className="btn-connexion"
                                style={{ display: "inline-block", margin: 0 }}
                            >
                                Tests de modèle et de vue
                            </a>
                        </p>
                    </div>
                </div>

                <div
                    className="info-section"
                    style={{ padding: "1rem 0", margin: "1rem 0" }}
                >
                    <div className="info-text">
                        <h2 style={{ marginBottom: "0.5rem" }}>
                            Authentification
                        </h2>
                        <p style={{ marginBottom: "0.5rem" }}>
                            Afin de s'authentifier dans l'application :
                        </p>
                        <p style={{ marginBottom: "0.5rem" }}>
                            <strong>Comptes disponibles :</strong>
                        </p>
                        <p style={{ marginBottom: "0.5rem" }}>
                            <strong>Email :</strong> alice@example.com ou
                            bob@example.com
                            <br />
                            <strong>Mot de passe :</strong> mdpAlice123 ou
                            mdpBob456
                        </p>
                    </div>
                </div>

                <div
                    className="info-section"
                    style={{ padding: "1rem 0", margin: "1rem 0" }}
                >
                    <div className="info-text">
                        <h2 style={{ marginBottom: "0.5rem" }}>
                            Base de données
                        </h2>
                        <p style={{ marginBottom: "0.5rem" }}>
                            Base de données utilisée par l'application :
                        </p>
                    </div>
                    <div className="info-image">
                        <img
                            src="/images/bd.png"
                            alt="Schéma de la base de données"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
