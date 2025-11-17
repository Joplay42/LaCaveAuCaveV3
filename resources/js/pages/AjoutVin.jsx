import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import axios from "axios";

export default function AjoutVin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [pays, setPays] = useState([]);
    const [regions, setRegions] = useState([]);
    const [millesimes, setMillesimes] = useState([]);
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nom_vin: "",
        id_millesime: "",
        id_pays: "",
        id_region: "",
        cepage: "",
        description: "",
        image: null,
        prix: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isAuthenticated || user?.role !== "admin") {
            navigate("/");
            return;
        }

        // Charger les données pour les selects
        Promise.all([
            axios.get("/api/pays"),
            axios.get("/api/regions"),
            axios.get("/api/millesimes"),
        ])
            .then(([paysRes, regionsRes, millesimesRes]) => {
                setPays(paysRes.data);
                setRegions(regionsRes.data);
                setMillesimes(millesimesRes.data);
            })
            .catch((err) => {
                console.error("Erreur chargement données:", err);
            });
    }, [isAuthenticated, user, navigate]);

    function handleChange(e) {
        const { name, value, type, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));

        // Effacer l'erreur pour ce champ
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setErrors({});

        const formData = new FormData();
        Object.keys(form).forEach((key) => {
            if (form[key] !== null && form[key] !== "") {
                formData.append(key, form[key]);
            }
        });

        try {
            await axios.post("/api/vins", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSuccess(true);
            setTimeout(() => navigate("/vins"), 2000);
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors || {});
            } else {
                setError(
                    err.response?.data?.message ||
                        "Erreur lors de l'ajout du vin"
                );
            }
        } finally {
            setLoading(false);
        }
    }

    if (!isAuthenticated || user?.role !== "admin") {
        return null;
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Ajouter un vin</h2>

                {success && (
                    <div className="auth-alert success">
                        Vin ajouté avec succès ! Redirection...
                    </div>
                )}

                {error && <div className="auth-alert error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="nom_vin">Nom du vin</label>
                        <input
                            id="nom_vin"
                            type="text"
                            name="nom_vin"
                            value={form.nom_vin}
                            onChange={handleChange}
                            className={errors.nom_vin ? "is-invalid" : ""}
                            required
                        />
                        {errors.nom_vin && (
                            <p className="input-error">{errors.nom_vin[0]}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="id_millesime">Millésime</label>
                        <select
                            id="id_millesime"
                            name="id_millesime"
                            value={form.id_millesime}
                            onChange={handleChange}
                            className={errors.id_millesime ? "is-invalid" : ""}
                        >
                            <option value="">Sélectionner un millésime</option>
                            {millesimes.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.annee}
                                </option>
                            ))}
                        </select>
                        {errors.id_millesime && (
                            <p className="input-error">
                                {errors.id_millesime[0]}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="id_pays">Pays</label>
                        <select
                            id="id_pays"
                            name="id_pays"
                            value={form.id_pays}
                            onChange={handleChange}
                            className={errors.id_pays ? "is-invalid" : ""}
                            required
                        >
                            <option value="">Sélectionner un pays</option>
                            {pays.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nom_pays}
                                </option>
                            ))}
                        </select>
                        {errors.id_pays && (
                            <p className="input-error">{errors.id_pays[0]}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="id_region">Région</label>
                        <select
                            id="id_region"
                            name="id_region"
                            value={form.id_region}
                            onChange={handleChange}
                            className={errors.id_region ? "is-invalid" : ""}
                        >
                            <option value="">Sélectionner une région</option>
                            {regions.map((r) => (
                                <option key={r.id} value={r.id}>
                                    {r.nom_region}
                                </option>
                            ))}
                        </select>
                        {errors.id_region && (
                            <p className="input-error">{errors.id_region[0]}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="cepage">Cépage</label>
                        <input
                            id="cepage"
                            type="text"
                            name="cepage"
                            value={form.cepage}
                            onChange={handleChange}
                            className={errors.cepage ? "is-invalid" : ""}
                        />
                        {errors.cepage && (
                            <p className="input-error">{errors.cepage[0]}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className={errors.description ? "is-invalid" : ""}
                        />
                        {errors.description && (
                            <p className="input-error">
                                {errors.description[0]}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <input
                            id="image"
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                            className={errors.image ? "is-invalid" : ""}
                            required
                        />
                        {errors.image && (
                            <p className="input-error">{errors.image[0]}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="prix">Prix (€)</label>
                        <input
                            id="prix"
                            type="number"
                            step="0.01"
                            name="prix"
                            value={form.prix}
                            onChange={handleChange}
                            className={errors.prix ? "is-invalid" : ""}
                            required
                        />
                        {errors.prix && (
                            <p className="input-error">{errors.prix[0]}</p>
                        )}
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Ajout en cours..." : "Ajouter"}
                        </button>
                    </div>

                    <div
                        className="login-footer"
                        style={{ marginTop: "12px", textAlign: "center" }}
                    >
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="link-muted"
                            style={{ background: "none", border: "none" }}
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
