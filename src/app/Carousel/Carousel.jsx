"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel, Spinner } from "react-bootstrap";
import Link from "next/link";
import './Carousel.scss'

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://example-data.draftbit.com/books?_limit=10")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          // Mélanger les données et récupérer 5 produits aléatoires
          const shuffled = response.data.sort(() => 0.1 - Math.random()).slice(0, 5);
          setProducts(shuffled);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des produits :", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status" />
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="carousel-container mb-3 mt-5">
    <Carousel>
      {products.map((product) => (
        <Carousel.Item key={product.id}>
          <div className="carousel-item-content">
            <div className="card">
              <img
                src={product.image_url}
                alt={product.title}
                className="carousel-image"
              />
            </div>
            <div className="carousel-text">
              <h4 className="carousel-title">{product.title}</h4>
              <p className="carousel-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut orci lorem. Curabitur sit amet nulla ut.
              </p>
              <p className="carousel-rating">Note: ⭐ {product.rating}</p>
              <Link href={`/produits/${product.id}`} passHref>
                <button className="btn btn-primary">
                  Voir le produit
                </button>
              </Link>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  </div>
  );
}
