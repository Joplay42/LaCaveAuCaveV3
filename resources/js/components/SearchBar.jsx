import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [term, setTerm] = useState('');
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();
        const q = term.trim();
        if (q.length === 0) return;
        navigate(`/vins?q=${encodeURIComponent(q)}`);
    }

    return (
        <form onSubmit={onSubmit} style={{ width: '100%', maxWidth: 360, marginLeft: 'auto' }}>
            <input
                id="vins_search"
                type="search"
                className="form-control"
                placeholder="Rechercher des vins..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                aria-label="Recherche vins"
            />
        </form>
    );
}
