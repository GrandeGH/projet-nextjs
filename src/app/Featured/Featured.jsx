"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link";
import "./Featured.scss"

export default function Featured() {
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://example-data.draftbit.com/books")
            .then(response => {
                // Trier les livres par rating décroissant et sélectionner les 2 meilleurs
                const sortedBooks = response.data.sort((a, b) => b.rating - a.rating).slice(0, 3);
                setFeaturedBooks(sortedBooks);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <h2>Chargement...</h2>;
    }

    if (error) {
        return <h2>Erreur : {error}</h2>;
    }

    return (
      
        <div className="container my-4">
        <h3 className="text-center mb-4">Les mieux notés</h3>
      
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {featuredBooks.map((book, index) => (
            <Link href={`/produits/${book.id}`} passHref>
            <div key={index} className="col">
              <div className="card h-100 text-center p-3 shadow-sm">
                {/* Image du livre */}
                <img
                  src={book.image_url}
                  alt={book.title}
                  className="card-img-top mx-auto d-block"                
                  />
                <div className="card-body">
                  <p className="card-title text-truncate fw-bold" style={{ maxWidth: "220px", margin: "auto" }}>
                    {book.title}
                  </p>
                  <p className="card-text">Note: ⭐ {book.rating}</p>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    
    );
}
