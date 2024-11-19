import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../components/css/Header.module.css';

interface GalleryProps {
    images: string[];
    title: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, title }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Format images array to include titles
    const formattedImages = images.map((url, index) => ({
        url,
        title: `${title} - Image ${index + 1}`
    }));

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
        if (currentImageIndex < formattedImages.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    // Only render if we have images
    if (!formattedImages.length) return null;

    return (
        <div className={styles.galleryContainer}>
            <div className={styles.galleryGrid}>
                {/* Main Image */}
                <div className={`${styles.mainImage} ${styles.imageContainer}`}>
                    <Image
                        src={formattedImages[0].url}
                        alt={formattedImages[0].title}
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                    <div
                        className={`${styles.morePhotos} ${styles.mobileMore}`}
                        onClick={() => openModal(0)}
                    >
                        <i className="fa-regular fa-images"></i> {formattedImages.length}+
                    </div>
                    <div className={styles.dotsIndicator}></div>
                </div>

                {/* First Column of Thumbnails */}
                <div className={styles.thumbnailColumn}>
                    {formattedImages.slice(1, 3).map((image, index) => (
                        <div
                            key={index}
                            className={`${styles.thumbnail} ${styles.imageContainer}`}
                            onClick={() => openModal(index + 1)}
                        >
                            <Image
                                src={image.url}
                                alt={image.title}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Second Column of Thumbnails */}
                <div className={styles.thumbnailColumn}>
                    {formattedImages.slice(3, 5).map((image, index) => (
                        <div
                            key={index}
                            className={`${styles.thumbnail} ${styles.imageContainer}`}
                            onClick={() => openModal(index + 3)}
                        >
                            <Image
                                src={image.url}
                                alt={image.title}
                                layout="fill"
                                objectFit="cover"
                            />
                            {index === 1 && formattedImages.length > 5 && (
                                <div className={styles.morePhotos}>
                                    <i className="fa-regular fa-images"></i> {formattedImages.length - 5}+
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for fullscreen view */}
            {isModalOpen && (
                <div className={styles.modal}>
                    <span className={styles.close} onClick={closeModal}>&times;</span>
                    <div className={styles.modalContent}>
                        <Image
                            src={formattedImages[currentImageIndex].url}
                            alt={formattedImages[currentImageIndex].title}
                            layout="fill"
                            objectFit="contain"
                        />
                        <button
                            className={`${styles.navBtn} ${styles.prev}`}
                            onClick={showPrevImage}
                            disabled={currentImageIndex === 0}
                        >
                            &#10094;
                        </button>
                        <button
                            className={`${styles.navBtn} ${styles.next}`}
                            onClick={showNextImage}
                            disabled={currentImageIndex === formattedImages.length - 1}
                        >
                            &#10095;
                        </button>
                        <div className={styles.galleryInfo}>
                            <div className={styles.imageTitle}>
                                {formattedImages[currentImageIndex].title}
                            </div>
                            <div className={styles.imageCount}>
                                {currentImageIndex + 1}/{formattedImages.length}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;