import React from "react";
import CellierCard from "../components/CellierCard";

const sample = [
    { id: 1, nom: "Cellier Maison", user_name: "Alice" },
    { id: 2, nom: "Réserve", user_name: "Bob" },
];

export default function Celliers() {
    return (
        <div className="container py-4">
            <section className="info-section">
                <div className="info-text">
                    <h2>Gérez vos celliers</h2>
                    <p>
                        Créez, organisez et consultez vos celliers personnels.
                    </p>
                    <a href="#" className="btn-connexion">
                        Créer un cellier
                    </a>
                </div>
            </section>

            <h1>Mes celliers</h1>
            <div id="contenu">
                {sample.map((c) => (
                    <CellierCard key={c.id} cellier={c} />
                ))}
            </div>
        </div>
    );
}
