// components/Navbar.tsx
import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import NavModal from './NavModal'; // Importing NavModal component
import { regionsWithCurrencies } from './constants'; // Importing regionsWithCurrencies
import styles from './Navbar.module.css'; // Assuming you're using CSS Modules

const Navbar: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentRegion, setCurrentRegion] = useState<string>('United States');
    const [currentCurrency, setCurrentCurrency] = useState<string>(regionsWithCurrencies['United States']);

    const handleSaveRegion = (region: string, currency: string) => {
        setCurrentRegion(region);
        setCurrentCurrency(currency);
    };

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles['navbar-container']}>
                    <div className={styles['navbar-left']}>
                        {/* Logo can go here */}
                    </div>
                    <div className={styles['navbar-right']}>
                        <input type="checkbox" id="nav-toggle" className={styles['nav-toggle']} />
                        <label htmlFor="nav-toggle" className={styles['nav-toggle-label']}>
                            <FaUser />
                        </label>
                        <ul className={styles['nav-links']}>
                            <li>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="px-3 py-2 text-gray-600 hover:text-gray-900 flex items-center"
                                    aria-label="Change region"
                                >
                                    <span className="mr-2">🌍</span>
                                    <span>{currentRegion}</span>
                                </button>
                            </li>
                            <li><a href="#" className={styles['nav-link']}>Trip Boards</a></li>
                            <li><a href="#" className={styles['nav-link']}>List your property</a></li>
                            <li><a href="#" className={styles['nav-link']}>Help</a></li>
                            <li><a href="#" className={styles['nav-link']}>My trips</a></li>
                            <li><a href="#" className={`${styles['nav-link']} ${styles.signIn}`}>Sign in</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Include the NavModal component */}
            <NavModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveRegion}
                currentRegion={currentRegion}
            />
        </>
    );
};

export default Navbar;