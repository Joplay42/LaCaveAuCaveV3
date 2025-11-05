import React from 'react';
import CellierCard from '../components/CellierCard';

const sample = [
    { id: 1, nom: 'Cellier Maison', user_name: 'Alice' },
    { id: 2, nom: 'Réserve', user_name: 'Bob' },
];

export default function Celliers() {
    return (
        <div className="container py-4">
            <h1>Mes celliers</h1>
            <p>Liste des celliers (exemple statique).</p>
            {sample.map(c => <CellierCard key={c.id} cellier={c} />)}
        </div>
    );
}
