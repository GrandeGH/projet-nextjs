'use client';

import './Navbar.scss';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

export default function Navbar() {
    const pathname = usePathname();
    const [darkMode, setDarkMode] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);

    // Toggle Dark Mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark-mode");
    };

    // Toggle Sidebar
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    // Toggle Navbar Mobile
    const toggleNavbar = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <>
            {/* Navbar */}
            <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"} shadow`}>
                <div className="container">
                    {/* Logo */}
                    <Link href="/" className="navbar-brand fw-bold">
                        BOOK<span className="text-primary">STORE</span>
                    </Link>

                    {/* Menu mobile (toggle) */}
                    <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Lien de navigation */}
                    <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link href="/" className={`nav-link ${pathname === "/" ? "active text-primary fw-bold" : ""}`}>
                                    Accueil
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/produits" className={`nav-link ${pathname === "/produits" ? "active text-primary fw-bold" : ""}`}>
                                    Produits
                                </Link>
                            </li>
                        </ul>

                        {/* Boutons dark mode & sidebar */}
                        <div className="d-flex align-items-center gap-3 ms-3">
                            {/* Dark mode */}
                            <button onClick={toggleDarkMode} className="btn btn-outline-secondary">
                                <i className="bi bi-moon-fill"></i>
                            </button>
                            {/* Sidebar favoris */}
                            <button onClick={toggleSidebar} className="btn btn-outline-warning">
                                <i className="bi bi-star-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar Favoris */}
            <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />

            {/* Overlay pour fermer le sidebar */}
            {showSidebar && <div className="overlay" onClick={toggleSidebar}></div>}
        </>
    );
}
