import React from 'react';
import { Link } from 'react-router-dom';

export default function CellierCard({ cellier }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{cellier.nom || 'Cellier'}</h5>
                <p className="card-text">Propriétaire: {cellier.user_name || '—'}</p>
                <Link to={`/celliers/${cellier.id || ''}`} className="btn btn-secondary">Ouvrir</Link>
            </div>
        </div>
    );
}
