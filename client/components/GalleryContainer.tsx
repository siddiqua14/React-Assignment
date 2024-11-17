// components/Header.tsx
import React, { useState } from 'react';
import styles from './Header.module.css'; // Importing CSS module

const images = [
    { url: './img/hotel.jpg', title: 'Beautiful lakefront view with private deck' },
    { url: './img/hotel1.png', title: 'Cozy cottage exterior with charming red door' },
    { url: './img/hotel2.png', title: 'Spacious living room with panoramic views' },
    { url: './img/hotel3.png', title: 'Spacious living room with panoramic views' },
    { url: './img/hotel5.jpeg', title: 'Master bedroom with ensuite' }
];

const Gallery: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openModal = (index: number) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const showPrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const showNextImage = () => {
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    return (
        <div className={styles.galleryContainer}>
            <div className={styles.galleryGrid}>
            
                <div className={`${styles.mainImage} ${styles.imageContainer}`} >
                    <img src={images[0].url} alt={images[0].title} />
                    <div className={`${styles.morePhotos} ${styles.mobileMore}`}  onClick={() => openModal(0)}>
                        <i className="fa-regular fa-images"></i> 30+
                    </div>
                    <div className={styles.dotsIndicator}></div>
                </div>

                <div className={styles.thumbnailColumn}>
                    {images.slice(1, 3).map((image, index) => (
                        <div key={index} className={`${styles.thumbnail} ${styles.imageContainer}`}>
                            <img src={image.url} alt={image.title} />
                        </div>
                    ))}
                </div>

                <div className={styles.thumbnailColumn}>
                    {images.slice(3).map((image, index) => (
                        <div key={index} className={`${styles.thumbnail} ${styles.imageContainer}`}>
                            <img src={image.url} alt={image.title} />
                            {index === 1 && (
                                <div className={styles.morePhotos} onClick={() => openModal(3)}>
                                    <i className="fa-regular fa-images"></i> 30+
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
    <div className={styles.modal}>
        <span className={styles.close} onClick={closeModal}>&times;</span>
        <div className={styles.modalContent}>
            <img src={images[currentImageIndex].url} alt={images[currentImageIndex].title} />
            <button 
                className={`${styles.navBtn} ${styles.prev}`} 
                onClick={showPrevImage} 
                disabled={currentImageIndex === 0} // Disable if it's the first image
            >
                &#10094;
            </button>
            <button 
                className={`${styles.navBtn} ${styles.next}`} 
                onClick={showNextImage} 
                disabled={currentImageIndex === images.length - 1} // Disable if it's the last image
            >
                &#10095;
            </button>
            <div className={styles.galleryInfo}>
                <div className={styles.imageTitle}>{images[currentImageIndex].title}</div>
                <div className={styles.imageCount}>{currentImageIndex + 1}/{images.length}</div>
            </div>
        </div>
    </div>
)}
        </div>
    );
};

export default Gallery;