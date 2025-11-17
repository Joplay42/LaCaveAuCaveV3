import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Vin() {
    const { id } = useParams();
    const [vin, setVin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/api/vins/${id}`)
            .then((res) => {
                setVin(res.data);
                setError(null);
            })
            .catch((err) => {
                setError("Impossible de charger ce vin.");
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="container py-4">
                <p>Chargement…</p>
            </div>
        );
    }

    if (error || !vin) {
        return (
            <div className="container py-4">
                <p>{error || "Vin introuvable."}</p>
            </div>
        );
    }

    const imageSrc = vin.image_url
        ? vin.image_url
        : vin.image
        ? new URL(
              `/storage/images/upload/${vin.image}`,
              window.location.origin
          ).toString()
        : "/images/Image-Accueil.jpg";
    const nomComplet = `${vin.nom_vin || ""}${
        vin.millesime && vin.millesime.annee ? " · " + vin.millesime.annee : ""
    }`;

    return (
        <div className="container py-4">
            <Link to="/" className="btn-retour">
                ← Retour
            </Link>

            <section
                className="info-section vin-detail"
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    alignItems: "start",
                }}
            >
                <div className="info-image">
                    <img
                        src={imageSrc}
                        alt={vin.nom_vin || "Bouteille de vin"}
                        loading="lazy"
                    />
                </div>
                <div className="info-text">
                    <h2>{nomComplet}</h2>

                    {vin.description && (
                        <p>
                            {vin.description.split("\n").map((line, idx) => (
                                <span key={idx}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </p>
                    )}

                    <p>
                        <strong>Pays:</strong> {vin.pays?.nom_pays || "Inconnu"}
                    </p>
                    <p>
                        <strong>Région:</strong>{" "}
                        {vin.region?.nom_region || "Inconnue"}
                    </p>
                    {vin.cepage && (
                        <p>
                            <strong>Cépage:</strong> {vin.cepage}
                        </p>
                    )}

                    {vin.prix != null && (
                        <p style={{ margin: "1rem 0 0.75rem" }}>
                            <span
                                className="btn-connexion"
                                style={{
                                    pointerEvents: "none",
                                    cursor: "default",
                                }}
                            >
                                {new Intl.NumberFormat("fr-FR", {
                                    style: "currency",
                                    currency: "EUR",
                                }).format(Number(vin.prix))}
                            </span>
                        </p>
                    )}

                    <div>
                        <a href="#" className="btn-connexion">
                            Ajouter au cellier
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
