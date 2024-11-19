// pages/hotel/[idOrSlug].tsx
import { GetServerSideProps } from 'next';
import React from 'react';
import PropertyDetails from '../../components/PropertyDetails';
import Gallery from '../../components/Gallery';
import Header from '../../components/Header'; // Import Header component
import Tabs from '../../components/Tabs';
import HotelDetails from '../../components/HotelDetails';
import Custom404 from '../../components/404';

interface Hotel {
    id: string;
    title: string;
    description: string;
    guestCount: number;
    bedroomCount: number;
    bathroomCount: number;
    amenities: string[];
    images: string[];
    address: string;
    latitude: number;
    longitude: number;
}
interface Bedroom {
    name: string;
    bedType: string;
}

interface HotelPageProps {
    hotel: Hotel | null;
    notFound?: boolean;
}

const HotelPage: React.FC<HotelPageProps> = ({ hotel, notFound }) => {
    // If hotel is not found, render the Custom404 component
    if (notFound || !hotel) {
        return <Custom404 />;
    }

    const bedrooms = Array.from({ length: hotel.bedroomCount }, (_, index) => ({
        name: `Bedroom ${index + 1}`,
        bedType: index === 0 ? "1 Queen Bed" : "1 Twin Bed",
    }));


    return (
        <>
            {/* Pass hotel info to Header */}
            <Header
                title={hotel.title}
                propertyInfo={{
                    title: hotel.title,
                    location: hotel.address,
                    rating: "9.8/10", // Example rating; replace with actual data if needed.
                    imageUrl: hotel.images[0] || "/img/hotel.jpg", // Use the first image or a default image
                    hotelId: hotel.id // Pass the hotel ID here for dynamic sharing link.
                }}
            />

            {/* Pass images directly to Gallery */}
            <Gallery images={hotel.images} title={hotel.title} />
            <Tabs />
            {/* Pass hotel data as props to PropertyDetails */}
            <PropertyDetails
                title={hotel.title}
                description={hotel.description}
                guestCount={hotel.guestCount}
                bedroomCount={hotel.bedroomCount}
                bathroomCount={hotel.bathroomCount}
                amenities={hotel.amenities}
                address={hotel.address}         // Pass address prop
                latitude={hotel.latitude}       // Pass latitude prop
                longitude={hotel.longitude}     // Pass longitude prop
            />
            <HotelDetails
                title={hotel.title}
                guestCount={hotel.guestCount}
                bedroomCount={hotel.bedroomCount}
                bathroomCount={hotel.bathroomCount}
                bedrooms={bedrooms} // Pass the created bedrooms array
                amenities={hotel.amenities}
                description={hotel.description}
                propertyInfo={"Example Property Info"} // Replace with actual property info
                homeHighlights={"Example Home Highlights"} // Replace with actual highlights
                kitchen={"Example Kitchen Info"} // Replace with actual kitchen details
                general={"General information about the property."} // Replace with actual general info
                faq={"Frequently asked questions."} // Replace with actual FAQ details
                parking={"Parking information."} // Replace with actual parking details
                locationHighlights={"Location highlights."} // Replace with actual location highlights
                thingsToDo={"Things to do nearby."} // Replace with actual things to do
                localFare={"Local dining options."} // Replace with actual local fare options
                airportInfo={"Airport information."} // Replace with actual airport info
                policies={["No smoking", "No pets allowed"]} // Example policies array
                propertyManagerName={"Evolve"} // Example manager name
                propertyManagerLogo={"/path/to/logo.png"} // Example logo path
            />

        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { idOrSlug } = context.params!;

    try {
        const res = await fetch(`http://localhost:5000/api/hotel/${idOrSlug}`);

        if (!res.ok) {
            // Return notFound: true to trigger the 404 page
            return {
                props: {
                    hotel: null,
                    notFound: true
                }
            };
        }

        const hotel = await res.json();

        return {
            props: {
                hotel,
                notFound: false
            }
        };
    } catch (error) {
        console.error('Error fetching hotel:', error);
        return {
            props: {
                hotel: null,
                notFound: true
            }
        };
    }
};

export default HotelPage;