'use client'
import Carousel from "./Carousel/Carousel";
import Featured from "./Featured/Featured";

import Link from 'next/link';
import Image from "next/image";
import HighlightSection from './Choix/Choix';


const acceuil = ()=>{

    return(
        <>

  {/* Carrousel */}
  <div className="container my-4">
        <div className="d-flex justify-content-center">
          <Carousel />
        </div>
      </div>

      {/* Section Highlight */}
      <div className="container my-4">
        <HighlightSection />
      </div>

      {/* Section Featured */}
      <div className="container my-4">
        <Featured />
      </div>
        </>
    );
};
export default acceuil;