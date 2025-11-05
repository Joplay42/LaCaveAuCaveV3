import React from 'react';

export default function Profile() {
    const data = window.Laravel || {};
    const user = data.user || null;

    return (
        <div className="container py-4">
            <h1>Profil</h1>
            {user ? (
                <div>
                    <p>Nom: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Vous n'êtes pas connecté.</p>
            )}
        </div>
    );
}
