// components/PropertyDetails.tsx
import React from 'react';
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
import styles from "./Header.module.css";


// Map of amenities to their corresponding Font Awesome icons
const amenityIcons: Record<string, JSX.Element> = {
    WiFi: <FontAwesomeIcon icon={faWifi} />,
    "Air Conditioning": <FontAwesomeIcon icon={faSnowflake} />,
    Pool: <FontAwesomeIcon icon={faTree} />,
    "Parking available": <FontAwesomeIcon icon={faCar} />,
    "Outdoor Space": <FontAwesomeIcon icon={faTree} />,
    Kitchen: <FontAwesomeIcon icon={faCutlery} />,
};


interface Bedroom {
    name: string;
    bedType: string;
}

interface HotelDetailsProps {
    title: string;
    guestCount: number;
    bedroomCount: number;
    bathroomCount: number;
    bedrooms: Bedroom[];
    amenities: string[];
    description: string;
    propertyInfo: string;
    homeHighlights: string;
    kitchen: string;
    general: string;
    faq: string;
    parking: string;
    locationHighlights: string;
    thingsToDo: string;
    localFare: string;
    airportInfo: string;
    policies: string[];
    propertyManagerName: string;
    propertyManagerLogo: string;
}

const HotelDetails: React.FC<HotelDetailsProps> = ({
    title,
    guestCount,
    bedroomCount,
    bathroomCount,
    bedrooms,
    amenities,
    description,
    propertyInfo,
    homeHighlights,
    kitchen,
    general,
    faq,
    parking,
    locationHighlights,
    thingsToDo,
    localFare,
    airportInfo,
    policies,
    propertyManagerName,
    propertyManagerLogo
}) => {
    return (
        <div className={styles.container}>
            {/* Rooms & Beds Section */}
            <section className={styles.roomsSection}>
                <h2>Rooms & beds</h2>
                <p className={styles.sleepsInfo}>
                    {bedroomCount} bedrooms (sleeps {guestCount})
                </p>
                <div className={styles.bedrooms}>
                    {bedrooms.map((bedroom, index) => (
                        <div className={styles.bedroom} key={index}>
                            <i className="fa-solid fa-bed"></i>
                            <h3>{bedroom.name}</h3>
                            <p>{bedroom.bedType}</p>
                        </div>
                    ))}
                </div>
                <section className={styles.bathroomSection}>
                    <i className="fa fa-bath" aria-hidden="true"></i>
                    <h2>
                        {bathroomCount} bathroom{bathroomCount > 1 ? 's' : ''}
                    </h2>
                    <p>Full Bathroom</p>
                </section>
            </section>

            {/* Spaces Section */}
            <section className={styles.spacesSection}>
                <h2>Spaces</h2>
                <div className={styles.spacesList}>
                    {/* Example spaces; you can modify this based on actual data */}
                    <div className={styles.spaceItem}>
                        <i className="fa-solid fa-house"></i>
                        <p>Deck or patio</p>
                    </div>
                    <div className={styles.spaceItem}>
                        <i className="fa-solid fa-kitchen-set"></i>
                        <p>Kitchen</p>
                    </div>
                    <div className={styles.spaceItem}>
                        <i className="fa-solid fa-house"></i>
                        <p>Balcony</p>
                    </div>
                    <div className={styles.spaceItem}>
                        <i className="fa fa-tree" aria-hidden="true"></i>
                        <p>Garden</p>
                    </div>
                </div>
                <a href="#" className={styles.seeAllLink}>
                    See all rooms and beds details
                </a>
            </section>


            {/* About Property Section */}


            <section className={styles.aboutProperty}>
                <h2>About this property</h2>
                <h3 className={styles.propertyTitle}>{title}</h3>
                <p className={styles.propertyDescription}>{description}</p>
                <p>-- THE PROPERTY --</p>
                <p>{propertyInfo}</p>

                {/* Render bedrooms as a list */}
                {bedrooms.length > 0 ? (
                    bedrooms.map((bedroom, index) => (
                        <span key={index}>
                            {bedroom.name}: {bedroom.bedType}
                            {index < bedrooms.length - 1 ? ', ' : ''} {/* Add comma between items */}
                        </span>
                    ))
                ) : (
                    <p>No bedroom information available.</p> // Fallback if no bedrooms
                )}

                <p>HOME HIGHLIGHTS: {homeHighlights}</p>
                <p>KITCHEN: {kitchen}</p>
                <p>GENERAL: {general}</p>
                <p>FAQ: {faq}</p>
                <p>PARKING: {parking}</p>

                {/* Location Section */}
                <br />
                <p>-- THE LOCATION --</p>
                <br />
                <p>GREAT OUTDOORS: {locationHighlights}</p>
                <p>THINGS TO DO: {thingsToDo}</p>
                <p>LOCAL FARE: {localFare}</p>
                <p>AIRPORT: {airportInfo}</p>

                {/* Rest Easy With Us Section */}
                <br />
                <p>-- REST EASY WITH US --</p>
                <br />
                <p>
                    Evolve makes it easy to find and book properties you'll never want to leave.
                    You can relax knowing that our properties will always be ready for you and
                    that we'll answer the phone 24/7. Even better, if anything is off about your stay,
                    we'll make it right. You can count on our homes and our people to make you feel welcome--because
                    we know what vacation means to you.
                </p>

                {/* POLICIES Section */}
                <br />
                <p>-- POLICIES --</p>
                <br />
                <ul>
                    {policies.map((policy, index) => (
                        // Ensure each policy is rendered correctly
                        <li key={index}>{policy}</li>
                    ))}
                </ul>

                {/* Property Manager Section */}
                <h3 className={styles.propertyTitle}>Property Manager</h3>
                <div className={styles.propertyManager}>
                    <div>
                        <img
                            src="/img/logo.PNG"
                            alt="Property Manager Logo"
                            className={styles.logo}
                            style={{ display: 'block' }}
                        />
                        {/* Manager Info */}
                        <div className={styles.managerInfo}>
                            <h2 style={{ marginTop: '10px' }}>{propertyManagerName}</h2>

                            {/* Languages Spoken by Property Manager */}
                            <p className={styles.languages}>
                                Languages<br />
                                English, French, German, Spanish
                            </p>
                        </div>
                    </div>
                </div>

                {/* See More Link */}
                <a href="#" className={styles.seeAll}>
                    See More
                </a>
            </section>

            {/* Amenities Section */}
            <section className="amenities">
                <h3 className={styles.title}>Amenities</h3>
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

                <a href="#" className="see-all">See all {amenities.length} amenities</a>
            </section>
            {/* Q&A Section */}
            <section className={styles.questionSection}>
                <h3>Have a question?</h3>
                <p>Get instant answers with AI-powered search of property information and reviews.</p>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Is there free parking?" />
                    <button type="submit" className={styles.searchButton}>
                        <FontAwesomeIcon icon={faCar} />
                    </button>
                </div>
                <button className={styles.betaTag}>Beta</button>
            </section>

            <section className={styles.rulesContainer}>
                {/* House Rules */}
                <div className={styles.rulesWrapper}>
                    <div className={styles.rulesHeadings}>
                        <h3>House Rules</h3>
                    </div>
                    <div className={styles.rulesContent}>
                        <div className={styles.houseRules}>
                            <p>Check in after 3:00 PM • Check out before 11:00 AM • Minimum age to rent: 25</p>
                            <div className={styles.rulesIcons}>
                                <div className={styles.ruleItem}>
                                    <i className="fa fa-child" aria-hidden="true"></i>
                                    <div>
                                        <strong>Children</strong><br />Children allowed: ages 0-17
                                    </div>
                                </div>
                                <div className={styles.ruleItem}>
                                    <i className="fa-solid fa-dog"></i>
                                    <div>
                                        <strong>Pets</strong><br />No pets allowed
                                    </div>
                                </div>
                                <div className={styles.ruleItem}>
                                    <i className="fa-solid fa-ban"></i>
                                    <div>
                                        <strong>Events</strong><br />No events allowed
                                    </div>
                                </div>
                                <div className={styles.ruleItem}>
                                    <i className="fa-solid fa-ban-smoking"></i>
                                    <div>
                                        <strong>Smoking</strong><br />Smoking is not permitted
                                    </div>
                                </div>
                            </div>
                            <a href="#" className={styles.seeMore}>See More</a>
                        </div>
                    </div>
                </div>

                {/* Damage and Incidentals */}
                <div className={styles.rulesWrapper}>
                    <div className={styles.rulesHeadings}>
                        <h3><span>Damage and</span><br /><span>incidentals</span></h3>
                    </div>
                    <div className={styles.rulesContent}>
                        <div className={styles.damageInfo}>
                            <p>You will be responsible for any damage to the rental property caused by you or your party during your stay.</p>
                        </div>
                    </div>
                </div>

                {/* Cancellation */}
                <div className={styles.rulesWrapper}>
                    <div className={styles.rulesHeadings}>
                        <h3>Cancellation</h3>
                    </div>
                    <div className={styles.rulesContent}>
                        <div className={styles.timeline}>
                            <div className={styles.timelineLine}></div>
                            <div className={styles.rangeLabel}>Full refund</div>
                            <div className={styles.rangeLabel}>No refund</div>
                            <ul className={styles.timelinePoints}>
                                <li className={styles.timelinePoint}>
                                    <div className={styles.pointMarker}></div>
                                    <div className={styles.pointDate}>Today</div>
                                </li>
                                <li className={styles.timelinePoint}>
                                    <div className={styles.pointMarker}></div>
                                    <div className={styles.pointDate}>Nov 4</div>
                                </li>
                                <li className={styles.timelinePoint}>
                                    <div className={styles.pointMarker}></div>
                                    <div className={styles.pointDate}>Check-in</div>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.refundContainer}>
                            <div className={styles.refundSection}>
                                <div className={styles.refundDate}>
                                    <p>Before<br />Nov 4</p>
                                </div>
                                <div className={styles.refundInfo}>
                                    <h4>Full refund</h4>
                                    <p>Cancel your reservation before Nov 4 at 11:59 PM, and you'll get a full refund.</p>
                                </div>
                            </div>
                            <div className={styles.refundSection}>
                                <div className={styles.refundDate}>
                                    <p>After<br />Nov 4</p>
                                </div>
                                <div className={styles.refundInfo}>
                                    <h4>No refund</h4>
                                    <p>After that, you won’t get a refund.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Important Information */}
                <div className={styles.rulesWrapper}>
                    <div className={styles.rulesHeadings}>
                        <h3>Important information</h3>
                    </div>
                    <div className={styles.rulesContent}>
                        <ul className={styles.infoList}>
                            <li><b>You need to know</b></li>
                            <li>Government-issued photo identification and a credit card, debit card, or cash deposit may be
                                required at check-in for incidental charges</li>
                            <li>Special requests are subject to availability upon check-in and may incur additional charges;
                                special requests cannot be guaranteed</li>
                            <li>Onsite parties or group events are strictly prohibited</li>
                            <li>Host has indicated there is a carbon monoxide detector on the property</li>
                            <li>Host has indicated there is a smoke detector on the property</li>
                            <li>Safety features at this property include a fire extinguisher and a first aid kit</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.rulesWrapper}>

                    <div className={styles.rulesHeadings}>
                        <h3>Frequently Asked Questions</h3>
                    </div>
                    <div className={styles.rulesContent}>
                        <ul className={styles.faqList}>
                            {[
                                "Is Juneau Vacation Home: Stunning View + Beach Access pet-friendly?",
                                "What time is check-in at Juneau Vacation Home: Stunning View + Beach Access?",
                                "What time is check-out at Juneau Vacation Home: Stunning View + Beach Access?",
                                "Where is Juneau Vacation Home: Stunning View + Beach Access located?",
                            ].map((question, index) => (
                                <li className={styles.faqItem} key={index}>
                                    <details>
                                        <summary>{question}</summary>
                                    </details>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
                {/* FAQ Section */}


                {/* Rating and Review Section */}
                <div className={`${styles.rulesWrapper} ${styles.reviewContainer}`}>
                    <div className={styles.rulesHeadings}>
                        <div className={styles.rating}>
                            <div className={styles.ratingValue}>9.8/10</div>
                            <div className={styles.ratingDetails}>
                                <p className={styles.exceptional}>Exceptional</p>
                                <p className={styles.reviewCount}>24 reviews</p>
                                <small className={styles.verifiedNote}>
                                    Reviews are verified unless labeled otherwise.
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className={styles.rulesContent}>
                        <div className={styles.reviewsSection}>
                            <h3>Recent Reviews</h3>
                            <div className={styles.reviewsContainer}>
                                <div className={styles.reviewsScroll}>
                                    {[
                                        {
                                            title: "10/10 Excellent",
                                            content:
                                                "A very cozy home for the two of us in a quiet area NW of town. Beautiful water view. We enjoyed the art, read up in it and visited the...",
                                            author: "Kyle G.",
                                            date: "Sep 25, 2024",
                                        },
                                        {
                                            title: "10/10 Excellent",
                                            content:
                                                "A very cozy home for the two of us in a quiet area NW of town. Beautiful water view. We enjoyed the art, read up in it and visited the...",
                                            author: "Kyle G.",
                                            date: "Sep 25, 2024",
                                        },
                                        {
                                            title: "10/10 Excellent",
                                            content:
                                                "A very cozy home for the two of us in a quiet area NW of town. Beautiful water view. We enjoyed the art, read up in it and visited the...",
                                            author: "Kyle G.",
                                            date: "Sep 25, 2024",
                                        },
                                        {
                                            title: "10/10 Excellent",
                                            content:
                                                "The cottage was just as the pictures and description stated. Nice quiet area and great view of the cove.",
                                            author: "Cindy B.",
                                            date: "Sep 23, 2024",
                                        },
                                    ].map((review, index) => (
                                        <div className={styles.reviewCard} key={index}>
                                            <h4>{review.title}</h4>
                                            <p>{review.content}</p>
                                            <small>Read more</small>
                                            <p>
                                                <strong>{review.author}</strong> <br />
                                                {review.date}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className={styles.viewAll}>See all 24 reviews</button>
                        </div>
                    </div>
                </div>

                <div className={styles.rulesWrapper}>
                    {/* About the Host Section */}
                    <div className={styles.rulesSection}>
                        <div className={styles.rulesHeadings}>
                            <h3>About the Host</h3>
                        </div>
                        <div className={styles.rulesContent}>
                            <div className={styles.houseRules}>
                                <span className={styles.hostName}>Hosted by Evolve</span>
                                <div className={styles.rulesIcons}>
                                    <div className={styles.ruleItem}>
                                        <p>Languages:</p>
                                        <div className={styles.languageList}>
                                            {["English", "French", "German", "Spanish"].map(
                                                (language, index) => (
                                                    <span className={styles.languageTag} key={index}>
                                                        {language}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Send a Message Section */}
                    <div className={styles.rulesSection}>
                        <div className={styles.rulesHeadings}>
                            <h3>Send a Message</h3>
                        </div>
                        <div className={styles.rulesContent}>
                            <button className={styles.viewAll}>See all 24 reviews</button>
                        </div>
                    </div>
                </div>

            </section>

        </div>
    );
};

export default HotelDetails;