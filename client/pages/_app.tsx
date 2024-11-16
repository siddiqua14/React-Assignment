import React from 'react';
import type { AppProps } from 'next/app';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/globals.css'; // Import global styles
import '../styles/media.css'; // Import media queries for responsiveness
import '../styles/Navbar.css'; // Import Navbar styles globally
import '../styles/Header.module.css';


import Navbar from '../components/Navbar'; // Import the Navbar component
import Header from '../components/Header';
const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Navbar /> {/* Include the Navbar component here */}
            <Header />
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;