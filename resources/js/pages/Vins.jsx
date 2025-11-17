import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import VinCard from "../components/VinCard";
import { useAuth } from "../lib/AuthContext";

export default function Vins() {
    const [vins, setVins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q") || "";
    const { isAuthenticated, user } = useAuth();

    const handleDelete = (vinId) => {
        setVins(vins.filter((v) => v.id !== vinId));
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get("/api/vins", { params: q ? { search: q } : {} })
            .then((res) => setVins(res.data || []))
            .catch((err) => {
                console.error(err);
                setError("Impossible de charger les vins");
            })
            .finally(() => setLoading(false));
    }, [q]);

    // Fallback client-side filter if backend ignores ?search=
    const items = useMemo(() => {
        if (!q) return vins;
        const term = q.toLowerCase();
        return (vins || []).filter(
            (v) =>
                (v.nom_vin && v.nom_vin.toLowerCase().includes(term)) ||
                (v.nom && v.nom.toLowerCase().includes(term)) ||
                (v.description && v.description.toLowerCase().includes(term))
        );
    }, [vins, q]);

    return (
        <div className="container py-4">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                }}
            >
                <h1>Vins</h1>
                {isAuthenticated && user?.role === "admin" && (
                    <Link to="/vins/create" className="btn-connexion">
                        + Ajouter un vin
                    </Link>
                )}
            </div>
            {q && (
                <p className="text-muted">
                    Recherche: <strong>{q}</strong>
                </p>
            )}
            {loading && <p>Chargement...</p>}
            {error && <p className="text-danger">{error}</p>}
            <div id="contenu">
                {items.map((v) => (
                    <VinCard key={v.id} vin={v} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
}
