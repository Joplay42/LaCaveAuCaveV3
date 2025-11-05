import React from 'react';
import Nav from './Nav';

export default function Layout({ children }) {
    return (
        <div>
            <header>
                <div className="car-body">
                    <Nav />
                </div>
            </header>
            <main className="py-4 container">
                {children}
            </main>
            <footer className="text-center py-4">
                <small>LaCave — © {new Date().getFullYear()}</small>
            </footer>
        </div>
    );
}
