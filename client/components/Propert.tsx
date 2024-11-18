// components/PropertyDetails.tsx
import React from 'react';
import styles from './Header.module.css'; // Create this CSS module for styling
import BookingCard from './BookingCard';
const Property: React.FC = () => {
    return (
        <div className={styles.propertyDetails}>
            <div className={styles.detailsLeft}>
                <a href="#" className={styles.backLink}>Entire home</a>

                <h1 className={styles.listingTitle}>Juneau Vacation Home: Stunning View + Beach Access</h1>
                <div className={styles.rating}>
                    <span className={styles.ratingBadge}>9.8</span>
                    <span>Exceptional</span>
                </div>
                <div className={styles.ratingText}>
                    <a href="#reviews">See all 24 reviews  </a>
                </div>

                <div className={styles.propertyStats}>
                    <div className={styles.statItem}>
                        <i className="fa fa-bed" aria-hidden="true"></i>
                        <span>2 bedrooms</span>
                    </div>
                    <div className={styles.statItem}>
                        <i className="fa fa-bath" aria-hidden="true"></i>
                        <span>1 bathroom</span>
                    </div>
                    <div className={styles.statItem}>
                        <i className="fa fa-users" aria-hidden="true"></i>
                        <span>Sleeps 4</span>
                    </div>
                    <div className={styles.statItem}>
                        <i className="fa fa-home" aria-hidden="true"></i>
                        <span>1155 sq ft</span>
                    </div>
                </div>

                <h3 className={styles.title}>Popular amenities</h3>
                <div className={styles.propertyStats}>
                    <div className={styles.statItem}>
                        <i className="fas fa-drumstick-bite"></i>
                        <span>Barbecue grill</span>
                    </div>

                    <div className={styles.statItem}>
                        <i className="fa-solid fa-soap"></i>
                        <span>Washer</span>
                    </div>
                    <div className={styles.statItem}>
                        <i className="fa fa-cutlery" aria-hidden="true"></i>
                        <span>Kitchen</span>
                    </div>
                    <div className={styles.statItem}>
                        <i className="fa fa-car" aria-hidden="true"></i>
                        <span>Parking available</span>
                    </div>
                    <div className={styles.statItem}>
                        <i className="fas fa-tree"></i>
                        <span>Outdoor Space</span>
                    </div>
                    <div className={styles.statItem}>
                        <i className="fa fa-wifi" aria-hidden="true"></i>
                        <span>WiFi</span>
                    </div>

                </div>

                <div className={styles.explorerCard}>
                    <h3 className={styles.title}>Explore the area</h3>
                    <div className={styles.contentWrapper}>
                        <div className={styles.mapSection}>
                            <div className={styles.mapContainer}>
                                <img src="./img/map.webp" alt="Map of Juneau, Alaska" />
                            </div>
                            <div className={styles.mapInfo}>
                                <p>Juneau, Alaska</p>
                                <a href="#" className={styles.mapLink}>View in a map</a>
                            </div>
                        </div>

                        {/* Locations List */}
                        <div className={styles.locationsList}>
                            {[
                                { name: 'Auke Bay', time: '6 min drive' },
                                { name: 'University of Alaska-Southeast', time: '10 min drive' },
                                { name: 'Mendenhall Golf Course', time: '14 min drive' },
                                { name: 'Juneau, AK (JNU-Juneau Intl.)', time: '14 min drive' },
                            ].map((location, index) => (
                                <div key={index} className={styles.locationItem}>
                                    <div className={styles.locationIcon}><i className="fa-solid fa-location-dot"></i></div>
                                    <div className={styles.locationDetails}>
                                        <span className={styles.locationName}>{location.name}</span>
                                        <span className={styles.driveTime}>{location.time}</span>
                                    </div>
                                </div>
                            ))}
                            {/* See more link */}
                            <a href="#" className={styles.seeMore}>See more about this area ›</a>
                        </div>

                    </div>
                </div>
               
            </div>
            <BookingCard />
        </div>
    );
};

export default Property;