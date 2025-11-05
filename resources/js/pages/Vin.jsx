import React from 'react';
import { useParams } from 'react-router-dom';

export default function Vin() {
    const { id } = useParams();
    return (
        <div className="container py-4">
            <h1>Détail Vin #{id}</h1>
            <p>Informations détaillées sur le vin (exemple).</p>
        </div>
    );
}
