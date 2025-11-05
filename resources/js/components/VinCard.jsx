import React from 'react';
import { Link } from 'react-router-dom';

export default function VinCard({ vin }) {
    const title = vin.nom_vin || vin.nom || vin.name || 'Vin sans nom';
    const region = typeof vin.region === 'string'
        ? vin.region
        : (vin.region?.nom_region || vin.region_name || '—');
    const image = vin.image_url || (vin.image ? `/storage/images/upload/${vin.image}` : null);

    return (
        <div className="card mb-3 carteVin">
            {image && (
                <img src={image} className="card-img-top" alt={title} />
            )}
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">Région: {region}</p>
                <Link to={`/vins/${vin.id || ''}`} className="btn btn-primary">Voir</Link>
            </div>
        </div>
    );
}
