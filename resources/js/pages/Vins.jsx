import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import VinCard from "../components/VinCard";

export default function Vins() {
    const [vins, setVins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q") || "";

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
            <h1>Vins</h1>
            {q && (
                <p className="text-muted">
                    Recherche: <strong>{q}</strong>
                </p>
            )}
            {loading && <p>Chargement...</p>}
            {error && <p className="text-danger">{error}</p>}
            <div id="contenu">
                {items.map((v) => (
                    <VinCard key={v.id} vin={v} />
                ))}
            </div>
        </div>
    );
}
