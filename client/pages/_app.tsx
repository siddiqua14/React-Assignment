import React from 'react';
import type { AppProps } from 'next/app';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/globals.css'; // Import global styles
import '../styles/media.css'; // Import media queries for responsiveness
import '../styles/Navbar.css'; // Import Navbar styles globally
import styles from '../styles/Header.module.css';
import Head from 'next/head';

import Navbar from '../components/Navbar'; // Import the Navbar component

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>Best Hotels | Travel Guide</title>
                <meta name="description" content="Explore the best hotels in New York City with our travel guide." />
                <meta property="og:title" content="Best Hotels in New York | Your Travel Guide" />
                <meta property="og:description" content="Discover top hotels in New York for your next stay." />
            </Head>
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