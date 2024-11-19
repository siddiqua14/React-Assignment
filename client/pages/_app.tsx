import React from 'react';
import type { AppProps } from 'next/app';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/globals.css'; // Import global styles
import '../styles/media.css'; // Import media queries for responsiveness
import '../styles/Navbar.css'; // Import Navbar styles globally
import styles from '../styles/Header.module.css';


import Navbar from '../components/Navbar'; // Import the Navbar component
import Header from '../components/Headerold';
import Gallery from '../components/GalleryContainer';
import Tabs from '../components/Tabs';
import Property from '../components/Propert';
const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Navbar /> {/* Include the Navbar component here */}
            <main className={styles.mainContent}>
            
                {/* Include the Navbar component here
                <Header />
                <Gallery />
                <Tabs/>
                <Property/> */}
               
            </main>
           
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;