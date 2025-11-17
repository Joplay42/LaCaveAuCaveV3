import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../lib/AuthContext";
import Modal from "./Modal";

export default function EditVinModal({ isOpen, onClose, onSuccess, vinId }) {
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pays, setPays] = useState([]);
    const [regions, setRegions] = useState([]);
    const [millesimes, setMillesimes] = useState([]);
    const { user } = useAuth();

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

    const [currentImage, setCurrentImage] = useState(null);
    const [errors, setErrors] = useState({});

    // ...existing code...

    useEffect(() => {
        if (isOpen && vinId && user?.role === "admin") {
            setLoading(true);
            Promise.all([
                axios.get(`/api/vins/${vinId}`),
                axios.get("/api/pays"),
                axios.get("/api/regions"),
                axios.get("/api/millesimes"),
            ])
                .then(([vinRes, paysRes, regionsRes, millesimesRes]) => {
                    const vin = vinRes.data;
                    setForm({
                        nom_vin: vin.nom_vin || "",
                        id_millesime: vin.id_millesime || "",
                        id_pays: vin.id_pays || "",
                        id_region: vin.id_region || "",
                        cepage: vin.cepage || "",
                        description: vin.description || "",
                        image: null,
                        prix: vin.prix || "",
                    });
                    setCurrentImage(
                        vin.image ? `/storage/images/upload/${vin.image}` : null
                    );
                    setPays(paysRes.data || []);
                    setRegions(regionsRes.data || []);
                    setMillesimes(millesimesRes.data || []);
                    setErrors({});
                })
                .catch((err) => {
                    setError("Erreur lors du chargement du vin");
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [isOpen, vinId, user]);

    function handleChange(e) {
        const { name, value, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
        if (name === "image" && files && files[0]) {
            setCurrentImage(URL.createObjectURL(files[0]));
        }
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitLoading(true);
        setError(null);
        setErrors({});
        try {
            const formData = new FormData();
            Object.keys(form).forEach((key) => {
                if (form[key] !== null && form[key] !== "") {
                    formData.append(key, form[key]);
                }
            });
            const response = await axios.post(`/api/vins/${vinId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-HTTP-Method-Override": "PUT",
                },
            });
            onSuccess?.(response.data.vin);
            onClose();
        } catch (err) {
            setError("Erreur lors de la modification.");
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
        } finally {
            setSubmitLoading(false);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Modifier le vin"
            size="large"
        >
            <div className="auth-form">
                {user?.role !== "admin" ? (
                    <div style={{ textAlign: "center", padding: "2rem" }}>
                        <p style={{ color: "#ff6b6b" }}>
                            Accès réservé à l'administrateur.
                        </p>
                    </div>
                ) : loading ? (
                    <div style={{ textAlign: "center", padding: "2rem" }}>
                        <p>Chargement…</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="form-group">
                            <label htmlFor="nom_vin">Nom du vin *</label>
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
                                <p className="input-error">
                                    {errors.nom_vin[0]}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="id_millesime">Millésime *</label>
                            <select
                                id="id_millesime"
                                name="id_millesime"
                                value={form.id_millesime}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionner</option>
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
                            <label htmlFor="id_pays">Pays *</label>
                            <select
                                id="id_pays"
                                name="id_pays"
                                value={form.id_pays}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionner</option>
                                {pays.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.nom_pays}
                                    </option>
                                ))}
                            </select>
                            {errors.id_pays && (
                                <p className="input-error">
                                    {errors.id_pays[0]}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="id_region">Région *</label>
                            <select
                                id="id_region"
                                name="id_region"
                                value={form.id_region}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionner</option>
                                {regions.map((r) => (
                                    <option key={r.id} value={r.id}>
                                        {r.nom_region}
                                    </option>
                                ))}
                            </select>
                            {errors.id_region && (
                                <p className="input-error">
                                    {errors.id_region[0]}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="cepage">Cépage *</label>
                            <input
                                id="cepage"
                                type="text"
                                name="cepage"
                                value={form.cepage}
                                onChange={handleChange}
                                className={errors.cepage ? "is-invalid" : ""}
                                required
                            />
                            {errors.cepage && (
                                <p className="input-error">
                                    {errors.cepage[0]}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description *</label>
                            <textarea
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className={
                                    errors.description ? "is-invalid" : ""
                                }
                                required
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
                                accept="image/*"
                                onChange={handleChange}
                            />
                            {currentImage && (
                                <div style={{ marginTop: "0.5rem" }}>
                                    <img
                                        src={currentImage}
                                        alt="Aperçu"
                                        style={{
                                            maxWidth: "120px",
                                            borderRadius: "6px",
                                        }}
                                    />
                                </div>
                            )}
                            {errors.image && (
                                <p className="input-error">{errors.image[0]}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="prix">Prix *</label>
                            <input
                                id="prix"
                                type="number"
                                name="prix"
                                value={form.prix}
                                onChange={handleChange}
                                className={errors.prix ? "is-invalid" : ""}
                                required
                                min="0"
                                step="0.01"
                            />
                            {errors.prix && (
                                <p className="input-error">{errors.prix[0]}</p>
                            )}
                        </div>
                        {error && (
                            <div
                                className="auth-alert error"
                                style={{ marginBottom: "1rem" }}
                            >
                                {error}
                            </div>
                        )}
                        <div className="form-actions">
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={submitLoading}
                            >
                                {submitLoading ? "Modification..." : "Modifier"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
}
