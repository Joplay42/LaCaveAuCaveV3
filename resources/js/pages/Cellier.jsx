import React from 'react';
import { useParams } from 'react-router-dom';

export default function Cellier() {
    const { id } = useParams();

    return (
        <div className="container py-4">
            <h1>Cellier #{id}</h1>
            <p>Détails du cellier (id = {id}) — contenu d'exemple.</p>
        </div>
    );
}
