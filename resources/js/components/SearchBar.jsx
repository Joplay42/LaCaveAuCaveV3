import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SearchBar() {
    const [term, setTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const timerRef = useRef(null);
    const wrapRef = useRef(null);

    function onSubmit(e) {
        e.preventDefault();
        const q = term.trim();
        if (q.length === 0) return;
        setOpen(false);
        navigate(`/vins?q=${encodeURIComponent(q)}`);
    }

    function onPick(item) {
        setOpen(false);
        setTerm(item.label || '');
        navigate(`/vins/${item.value}`);
    }


    useEffect(() => {
        const q = term.trim();
        if (timerRef.current) clearTimeout(timerRef.current);
        if (q.length < 2) {
            setItems([]);
            setLoading(false);
            return;
        }
        timerRef.current = setTimeout(() => {
            setLoading(true);
            axios
                .get('/api/autocomplete/vins', { params: { search: q } })
                .then((res) => setItems(Array.isArray(res.data) ? res.data : []))
                .catch(() => setItems([]))
                .finally(() => setLoading(false));
        }, 250);
        return () => timerRef.current && clearTimeout(timerRef.current);
    }, [term]);

    useEffect(() => {
        function onDocClick(e) {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, []);

    return (
        <div ref={wrapRef} style={{ position: 'relative', width: '100%', maxWidth: 360, marginLeft: 'auto' }}>
            <form onSubmit={onSubmit}>
                <input
                    id="vins_search"
                    type="search"
                    className="form-control"
                    placeholder="Rechercher des vins..."
                    value={term}
                    onFocus={() => setOpen(true)}
                    onChange={(e) => {
                        setTerm(e.target.value);
                        setOpen(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && items.length > 0) {
                            e.preventDefault();
                            onPick(items[0]);
                        }
                    }}
                    aria-label="Recherche vins"
                    autoComplete="off"
                />
            </form>
            {open && (loading || items.length > 0) && (
                <div
                    role="listbox"
                    style={{
                        position: 'absolute',
                        zIndex: 1000,
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: 6,
                        background: '#221d26',
                        color: '#f1eaf7',
                        border: '1px solid #4a3a57',
                        borderRadius: 12,
                        boxShadow: '0 14px 28px rgba(0,0,0,.5)',
                        maxHeight: 320,
                        overflowY: 'auto',
                    }}
                >
                    {loading && (
                        <div style={{ padding: '10px 12px', opacity: 0.8 }}>Recherche…</div>
                    )}
                    {!loading && items.map((it) => (
                        <button
                            key={it.value}
                            type="button"
                            onClick={() => onPick(it)}
                            style={{
                                display: 'flex',
                                width: '100%',
                                gap: 10,
                                textAlign: 'left',
                                alignItems: 'center',
                                padding: '8px 10px',
                                background: 'transparent',
                                border: 'none',
                                color: 'inherit',
                                cursor: 'pointer',
                            }}
                        >
                            <img
                                src={it.image}
                                alt=""
                                style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6 }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span className="sr-title">{it.label}</span>
                                    {it.efface ? (
                                        <span className="badge-efface" style={{ marginLeft: 6 }}>effacé</span>
                                    ) : null}
                                </div>
                                <div className="sr-sub" style={{ fontSize: 12, opacity: 0.8 }}>
                                    {[it.annee, it.region, it.pays].filter(Boolean).join(' • ')}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
