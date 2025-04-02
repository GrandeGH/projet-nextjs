"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import Link from "next/link"
import './page.scss'

export default function Produits() {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Créer un tableau d'états pour chaque bouton, initialisé à false (pas favori)
    const [favoriteButtons, setFavoriteButtons] = useState([]);  // Initialiser avec un tableau vide

    // Gérer le clic sur le bouton favori
    const handleFavoriteClick = (index) => {
        const newFavorites = [...favoriteButtons];
        newFavorites[index] = !newFavorites[index];  // Inverser l'état du bouton favori
        setFavoriteButtons(newFavorites);
    };

    useEffect(() => {
        axios.get("https://example-data.draftbit.com/books")
        .then(response => {
            setData(response.data)
            setLoading(false)
        })
        .catch(error => {
            setError(error.message)
            setLoading(false)
        })
    }, [])

    // Mettre à jour l'état des favoris une fois que les données sont chargées
    useEffect(() => {
        if (data) {
            setFavoriteButtons(new Array(data.length).fill(false));  // Remplir le tableau avec des "false"
        }
    }, [data]);  // Ce useEffect sera appelé à chaque fois que "data" est mis à jour

    console.log(data)

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1> 
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <h1>Le produit n'est pas trouvé...</h1>
            </div>
        )
    }

    return (
        <div className="container mt-4 d-flex justify-content-center">
            <div className="row justify-content-center gap-3">
                {data.map((item, i) => (
                    <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-center justify-content-center">
                        <div className="card text-center p-3 shadow position-relative" style={{ width: "100%", maxWidth: "220px" }}>
                            {/* Change la classe en fonction de l'état favori pour chaque bouton */}
                            <button
                                className={`btnFav btn ${favoriteButtons[i] ? 'btn-warning' : 'btn-outline-warning'} position-absolute`}
                                style={{ right: "5px", top: "5px" }}
                                onClick={() => handleFavoriteClick(i)} // Click pour ajouter/enlever des favoris
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
        </div>
    )
}
