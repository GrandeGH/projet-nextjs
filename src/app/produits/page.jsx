'use client'

import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "../Sidebar/Sidebar";
import './page.scss';

export default function Produits() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Recherche
    const [genres, setGenres] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    
    // Favoris
    const [favoriteButtons, setFavoriteButtons] = useState([]);
    const [favorites, setFavorites] = useState([]); // Ajout de l'état des favoris

    const handleFavoriteClick = (index, item) => {
        const newFavorites = [...favorites];
        if (!newFavorites.includes(item)) {
            setFavorites([...newFavorites, item]);
            setShowSidebar(true); // ouvrir automatiquement
        }

        const newFavoriteButtons = [...favoriteButtons];
        newFavoriteButtons[index] = !newFavoriteButtons[index]; // Toggle button
        setFavoriteButtons(newFavoriteButtons);
    };

    const removeFavorite = (index) => {
        const updatedFavorites = [...favorites];
        const removedItem = updatedFavorites[index];
    
        // Supprimer des favoris
        updatedFavorites.splice(index, 1);
        setFavorites(updatedFavorites);
    
        // Trouver l'index du produit dans le tableau data
        const originalIndex = data.findIndex(book => book.id === removedItem.id);
        if (originalIndex !== -1) {
            const updatedFavoriteButtons = [...favoriteButtons];
            updatedFavoriteButtons[originalIndex] = false;
            setFavoriteButtons(updatedFavoriteButtons);
        }
    };

    // Sidebar
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
      };


    // Axios
    useEffect(() => {
        axios.get("https://example-data.draftbit.com/books")
            .then(response => {
                setData(response.data);
                setLoading(false);

                // Extraction des genres uniques
                const allGenres = response.data.flatMap(book => book.genres.split(", ").map(g => g.trim()));
                const uniqueGenres = [...new Set(allGenres)].sort();
                setGenres(uniqueGenres);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })
    }, []);

    useEffect(() => {
        if (data) {
            const storedFavorites = localStorage.getItem('favorites');
            const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    
            const buttonsState = data.map((book) =>
                parsedFavorites.some(fav => fav.id === book.id)
            );
    
            setFavoriteButtons(buttonsState);
        }
    }, [data]);

    // Conserver
    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        setFavorites(parsedFavorites);
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);
    

    const handleSearch = (book) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = (
            (book.title && book.title.toLowerCase().includes(query)) ||
            (book.author && book.author.toLowerCase().includes(query))
        );
    
        const matchesGenre = selectedGenre
            ? book.genres.split(", ").some(genre => genre.toLowerCase() === selectedGenre.toLowerCase())
            : true;
    
        return matchesSearch && matchesGenre;
    };

    if (loading) {
        return <h1>Chargement...</h1>;
    }

    if (error) {
        return <h1>Le produit introuvable...</h1>;
    }

    return (
        <div className="container mt-4">
            {/* Barre de recherche et filtres */}
            <div className="d-flex justify-content-between mb-4">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Rechercher par titre ou auteur"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="d-flex gap-3">
                    <select
                        className="form-select"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        <option value="">Tous les genres</option>
                        {genres.map((genre, index) => (
                            <option key={index} value={genre.toLowerCase()}>{genre}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Affichage des produits */}
            <div className="row my-4 justify-content-center gap-3">
                {data.filter(handleSearch).map((item, i) => (
                    <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-center justify-content-center">
                        <div className="card text-center p-3 shadow position-relative" style={{ width: "100%", maxWidth: "220px" }}>
                            <button
                                className={`btnFav btn ${favoriteButtons[i] ? 'btn-warning' : 'btn-outline-warning'} position-absolute`}
                                style={{ right: "5px", top: "5px" }}
                                onClick={() => handleFavoriteClick(i, item)}
                            >
                                <i className="bi bi-star-fill"></i>
                            </button>
                            <img src={item.image_url} alt={item.title} className="card-img-top mx-auto d-block" />
                            <h3 className="mt-2 text-truncate">{item.title}</h3>
                            <Link href={`/produits/${item.id}`} passHref>
                                <button className="btn btn-primary mt-2">Détails</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sidebar des produits favoris */}
            <div className={`sidebar ${showSidebar ? "active" : ""}`}>
                <button className="close-btn" onClick={() => toggleSidebar()}>✖</button>
                <h2 className="mb-4">Vos favoris</h2>
                {favorites.length === 0 ? (
                    <p>Aucun favori ajouté...</p>
                ) : (
                    favorites.map((item, index) => (
                    <div key={index} className="favorite-item">
                        <img src={item.image_url} alt={item.title} style={{ width: '50px', height: 'auto' }} />
                        <span>{item.title}</span>
                        <button 
                        className="btn btn-primary ms-2 btn-remove " 
                        onClick={() => removeFavorite(index)}>
                            Supprimer
                        </button>
                    </div>
                    ))
                )}
                </div>
            </div>
    );
}
