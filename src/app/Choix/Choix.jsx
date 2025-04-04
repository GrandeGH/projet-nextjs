"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import "./Choix.scss";

export default function Choix() {
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        axios.get("https://example-data.draftbit.com/books")
            .then(response => {
                const chosenItems = response.data.slice(0, 6); // Sélectionne les 6 premiers éléments
                setSelectedItems(chosenItems);
            })
            .catch(error => console.error("Erreur lors du chargement :", error));
    }, []);

    return (
        <section className="choix-section container my-5">
            <h2 className="text-center mb-4">Sélection du Moment</h2>
            {selectedItems.length === 0 ? (
                <p className="text-center">Chargement...</p>
            ) : (
                <div className="row justify-content-center gap-4">
                {selectedItems.map((item, i) => (
                    <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <Link href={`/produits/${item.id}`} passHref>
                        <div className="card p-3 shadow-sm text-center">
                        <img src={item.image_url} alt={item.title} className="card-img-top mx-auto d-block" />
                        <h4 className="mt-2 text-truncate">{item.title}</h4>
                        <p className="rating">⭐ {item.rating}</p>
                        </div>
                    </Link>
                    </div>
                ))}
                </div>
            )}
        </section>
    );
}