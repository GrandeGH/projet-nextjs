'use client'

import { useEffect, useState } from "react"
import { useParams } from 'next/navigation'
import axios from "axios"
import './détails.scss'



export default function Details() {
    const { id } = useParams()
    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    
    // const router = useRouter();


useEffect(() => {
    axios.get(`https://example-data.draftbit.com/books/${id}`)
    .then((reponse) => { 
        setBook(reponse.data),
        setLoading(false);
        
        })
        .catch((error) => { 
            console.log(error),
            setError(true);
            setLoading(false);
        });
    }, [id])
    console.log(book)
    if(loading) {
        return (
            <div>
                <h1>Chargement...</h1> 
            </div>
        )
    }
    if(error) {
        return (
            <div>
                <h1>Le produit introuvable...</h1>
            </div>
        )
    }

    return(
        <>
  
        <section className="container mt-5">
            <h3 className="titreDetails mb-4 text-center">{book.title}</h3>

            <div className="row g-5">
                <div className="col-md-4 d-flex justify-content-center">
                    <img 
                        src={book.image_url} 
                        alt={book.title} 
                    />
                </div>
                <div className="col-md-8">
                    <p><strong>Auteur :</strong> {book.authors}</p>
                    <p><strong>Genre(s) :</strong> {book.genres}</p>
                    <p><strong>Nombre de pages :</strong> {book.num_pages}</p>
                    <p><strong>Format :</strong> {book.format}</p>
                </div>
            </div>
            <div className="my-5">
                <p className="description">Description</p>
                <p className="text-justify">{book.description || "Aucune description disponible."}</p>
            </div>
        </section>
        </>
    )

}