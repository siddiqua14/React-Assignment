// components/PropertyDetails.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBed,
    faBath,
    faUsers,
    faWifi,
    faCar,
    faTree,
    faCutlery,
    faSnowflake,
    faSoap, // For Washer
    faDrumstickBite, // For Barbecue grill
    faSwimmingPool // For Pool
} from "@fortawesome/free-solid-svg-icons"; // Import necessary icons
import styles from "../components/css/Header.module.css"; // Ensure you have this CSS module for styling
import BookingCard from './BookingCard';

interface PropertyDetailsProps {
    title: string;
    description: string;
    guestCount: number;
    bedroomCount: number;
    bathroomCount: number;
    amenities: string[];
    address: string; 
    latitude: number; 
    longitude: number; 
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
    title,
    description,
    guestCount,
    bedroomCount,
    bathroomCount,
    amenities,
    address,
    latitude, 
    longitude, 
}) => {
    // Map of amenities to their corresponding Font Awesome icons
    const amenityIcons: Record<string, JSX.Element> = {
        WiFi: <FontAwesomeIcon icon={faWifi} />,
        "Air Conditioning": <FontAwesomeIcon icon={faSnowflake} />,
        Pool: <FontAwesomeIcon icon={faTree} />,
        "Parking available": <FontAwesomeIcon icon={faCar} />,
        "Outdoor Space": <FontAwesomeIcon icon={faTree} />,
        Kitchen: <FontAwesomeIcon icon={faCutlery} />,
    };

    return (
        <div className={styles.propertyDetails}>
            <div className={styles.detailsLeft}>
                <a href="#" className={styles.backLink}>
                    Entire home
                </a>

                <h1 className={styles.listingTitle}>{title}</h1>
                <p>{description}</p>

                <div className={styles.rating}>
                    <span className={styles.ratingBadge}>9.8</span>
                    <span>Exceptional</span>
                </div>
                <div className={styles.ratingText}>
                    <a href="#reviews">See all reviews</a>
                </div>

                <div className={styles.propertyStats}>
                    <div className={styles.statItem}>
                        <FontAwesomeIcon icon={faBed} />
                        <span>{bedroomCount} bedrooms</span>
                    </div>
                    <div className={styles.statItem}>
                        <FontAwesomeIcon icon={faBath} />
                        <span>{bathroomCount} bathrooms</span>
                    </div>
                    <div className={styles.statItem}>
                        <FontAwesomeIcon icon={faUsers} />
                        <span>Sleeps {guestCount}</span>
                    </div>
                </div>
                {/* Amenities Section */}
                <h3 className={styles.title}>Popular amenities</h3>
                <div className={styles.propertyStats}>
                    {amenities.length > 0 ? (
                        amenities.map((amenity, index) => {
                            let icon;
                            switch (amenity) {
                                case "Barbecue grill":
                                    icon = <FontAwesomeIcon icon={faDrumstickBite} />;
                                    break;
                                case "Washer":
                                    icon = <FontAwesomeIcon icon={faSoap} />;
                                    break;
                                case "Kitchen":
                                    icon = <FontAwesomeIcon icon={faCutlery} />;
                                    break;
                                case "Parking available":
                                    icon = <FontAwesomeIcon icon={faCar} />;
                                    break;
                                case "Outdoor Space":
                                    icon = <FontAwesomeIcon icon={faTree} />;
                                    break;
                                case "WiFi":
                                    icon = <FontAwesomeIcon icon={faWifi} />;
                                    break;
                                case "Air Conditioning":
                                    icon = <FontAwesomeIcon icon={faSnowflake} />;
                                    break;
                                case "Pool":
                                    icon = <FontAwesomeIcon icon={faSwimmingPool} />; // Use the swimming pool icon here
                                    break;
                                default:
                                    icon = null; // Fallback if no matching amenity is found
                            }
                            return (
                                <div key={index} className={styles.statItem}>
                                    {icon}
                                    <span>{amenity}</span>
                                </div>
                            );
                        })
                    ) : (
                        <p>No amenities available.</p> // Fallback message if no amenities
                    )}
                </div>

                <div className={styles.explorerCard}>
                    <h3 className={styles.title}>Explore the area</h3>
                    <div className={styles.contentWrapper}>
                        {/* Map Section */}
                        <div className={styles.mapSection}>
                            <div className={styles.mapContainer}>
                                <img src="/img/map.webp" alt="Map of Juneau, Alaska" />
                            </div>
                            <div className={styles.mapInfo}>
                                {/* Display Address */}
                                <p>{address}</p>
                                {/* Display Coordinates */}
                                <p>Latitude: {latitude}, Longitude: {longitude}</p>
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

export default PropertyDetails;