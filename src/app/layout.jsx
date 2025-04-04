'use client'

import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from "react";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";
import StoreProvider from "./StoreProvider";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import './globals.scss'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {


  
  return (
    <html lang="fr">
     
      <body
        className={`antialiased`}>
          <StoreProvider>
              <Navbar/>
              <Sidebar/>
                 {children}
              <Footer />
          </StoreProvider>
      </body>
    </html>
  );
}
