import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VinCard from '../components/VinCard';
import { useNavigate } from 'react-router-dom';

export default function VinsManager() {
    const [vins, setVins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ nom_vin: '', prix: '', description: '', image: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchVins();
    }, []);

    function fetchVins() {
        setLoading(true);
        axios.get('/api/vins')
            .then(res => {
                setVins(res.data || []);
            })
            .catch(err => {
                console.error(err);
                setError('Impossible de charger les vins.');
            })
            .finally(() => setLoading(false));
    }

    function handleDelete(id) {
        if (!confirm('Confirmer la suppression du vin #' + id + ' ?')) return;
        axios.delete(`/api/vins/${id}`)
            .then(() => {
                setVins(prev => prev.filter(v => v.id !== id));
            })
            .catch(err => {
                console.error(err);
                alert('Erreur lors de la suppression. Vérifiez que vous êtes connecté.');
            });
    }

    function handleDetails(id) {
        navigate(`/vins/${id}`);
    }

    function handleEdit(vin) {
        // simple inline edit: prefill form and show
        setForm({ nom_vin: vin.nom_vin || '', prix: vin.prix || '', description: vin.description || '', image: vin.image || '', id: vin.id });
        setShowForm(true);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    }

    function submitForm(e) {
        e.preventDefault();
        const payload = {
            nom_vin: form.nom_vin,
            prix: form.prix,
            description: form.description,
            image: form.image,
        };
        if (form.id) {
            axios.put(`/api/vins/update/${form.id}`, payload)
                .then(res => {
                    // update local list
                    setVins(prev => prev.map(v => v.id === form.id ? res.data : v));
                    setShowForm(false);
                    setForm({ nom_vin: '', prix: '', description: '', image: '' });
                })
                .catch(err => {
                    console.error(err);
                    alert('Erreur lors de la mise à jour.');
                });
        } else {
            axios.post('/api/vins', payload)
                .then(res => {
                    setVins(prev => [res.data, ...prev]);
                    setShowForm(false);
                    setForm({ nom_vin: '', prix: '', description: '', image: '' });
                })
                .catch(err => {
                    console.error(err);
                    alert('Erreur lors de la création.');
                });
        }
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Gestion des vins</h1>
                <div>
                    <button className="btn btn-primary me-2" onClick={() => { setForm({ nom_vin: '', prix: '', description: '', image: '' }); setShowForm(true); }}>Ajouter</button>
                    <button className="btn btn-secondary" onClick={fetchVins}>Rafraîchir</button>
                </div>
            </div>

            {showForm && (
                <form onSubmit={submitForm} className="mb-4">
                    <div className="mb-2">
                        <label className="form-label">Nom</label>
                        <input name="nom_vin" value={form.nom_vin} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Prix</label>
                        <input name="prix" value={form.prix} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Image (URL)</label>
                        <input name="image" value={form.image} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Description</label>
                        <textarea name="description" value={form.description} onChange={handleChange} className="form-control" />
                    </div>
                    <div>
                        <button className="btn btn-primary me-2" type="submit">Enregistrer</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setShowForm(false)}>Annuler</button>
                    </div>
                </form>
            )}

            {loading && <p>Chargement...</p>}
            {error && <p className="text-danger">{error}</p>}

            <div id="contenu">
                {vins.map(v => (
                    <div key={v.id} className="carteVin">
                        <img src={v.image || '/Images/placeholder.png'} alt={v.nom_vin} />
                        <div style={{ padding: '12px' }}>
                            <h3 className="titreArticle">{v.nom_vin}</h3>
                            <p>{v.description}</p>
                            <p><strong>{v.prix ? v.prix + ' €' : ''}</strong></p>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                <button className="btn btn-primary" onClick={() => handleDetails(v.id)}>Détails</button>
                                <button className="btn btn-secondary" onClick={() => handleEdit(v)}>Modifier</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(v.id)}>Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
