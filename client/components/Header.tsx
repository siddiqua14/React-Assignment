// components/Header.tsx
import React, { useState, useEffect } from 'react';
import { FaShareAlt } from 'react-icons/fa'; // Importing share icon
import styles from '../components/css/Header.module.css'; // Importing CSS module
import ShareModal from './Share';
import Link from 'next/link';

interface HeaderProps {
    title?: string;
    propertyInfo?: {
        title: string;
        location: string;
        rating: string;
        imageUrl: string; // Ensure this path is correct
        hotelId: string; // Add hotelId to property info
    };
}

const Header: React.FC<HeaderProps> = ({ title, propertyInfo }) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        // Check local storage for saved state
        const savedState = localStorage.getItem('property-saved');
        if (savedState === 'true') {
            setIsSaved(true);
        }
    }, []);

    const toggleSave = () => {
        const newSavedState = !isSaved;
        setIsSaved(newSavedState);

        // Save state to localStorage
        localStorage.setItem('property-saved', newSavedState.toString());
    };

    return (
        <main className={styles.mainContent}>
            <div className={styles.headerContainer}>
                <Link href="/properties" className={styles.backLink}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    <span className={styles.desktop}>See all properties</span>
                </Link>

                <div className={styles.actionButtons}>
                    <button
                        className={`${styles.btnSecondary}`}
                        onClick={() => setIsShareModalOpen(true)}
                        data-testid="share-button"
                    >
                        <FaShareAlt />
                        <span className="desktop-only">Share</span>
                    </button>
                    {/* Share Modal */}
                    {isShareModalOpen && propertyInfo && ( // Ensure propertyInfo is passed and not undefined
                        <ShareModal
                            onClose={() => setIsShareModalOpen(false)}
                            propertyInfo={{
                                title: propertyInfo.title,
                                location: propertyInfo.location,
                                rating: propertyInfo.rating,
                                imageUrl: propertyInfo.imageUrl, // Ensure this path is correct
                                hotelId: propertyInfo.hotelId // Pass hotelId for dynamic URL
                            }}
                        />
                    )}

                    <button
                        className={`${styles.save} ${isSaved ? styles.active : ''}`}
                        onClick={toggleSave}
                        aria-label="Save property"
                    >
                        {/* Heart icon SVG can be added here */}
                        <svg
                            className={`${styles.heartIcon} ${isSaved ? styles.active : ''}`}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span className="desktop-only">
                            {isSaved ? 'Saved' : 'Save'}
                        </span>
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Header;