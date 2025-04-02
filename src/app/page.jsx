'use client'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from "./Carousel/Carousel";
import Featured from "./Featured/Featured";

import Link from 'next/link';
import Image from "next/image";

// carousel
const OPTIONS = {}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


const acceuil = ()=>{
    const dispatch = useDispatch();
    // const { games, loading, error } = useSelector((state) => state.games);
 
    // useEffect(() => {
    //     dispatch(fetchGames());
    //   }, [dispatch]);
    
    return(
        <>
          
              <div className="d-flex justify-content-center">
                <Carousel slides={SLIDES} options={OPTIONS} />
              </div>
              <Featured/>
        </>
    );
};
export default acceuil;