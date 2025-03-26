import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./Navbar/Navbar";
import Header from "./Header/Header";
import Carousel from "./Carousel/Carousel";
import Footer from "./Footer/Footer";
import StoreProvider from "./StoreProvider";
import "bootstrap/dist/css/bootstrap.min.css"; 
import './globals.scss'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// carousel
const OPTIONS = {}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <StoreProvider>
              <Navbar/>
              <div className="d-flex justify-content-center">
                <Carousel  slides={SLIDES} options={OPTIONS} />
              </div>
                 {children}
              <Footer />
          </StoreProvider>
      </body>
    </html>
  );
}
