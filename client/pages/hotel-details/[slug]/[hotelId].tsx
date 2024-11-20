// pages/hotel-details/[slug]/[hotelId].tsx
import { GetServerSideProps } from 'next';
import React from 'react';
import PropertyDetails from '../../../components/PropertyDetails';
import Gallery from '../../../components/Gallery';
import Header from '../../../components/Header'; // Import Header component
import Tabs from '../../../components/Tabs';
import HotelDetails from '../../../components/HotelDetails';
import Custom404 from '../../../components/404';


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
            
            <Header
                title={hotel.title}
                propertyInfo={{
                    title: hotel.title,
                    location: hotel.address,
                    rating: "9.8/10",
                    imageUrl: hotel.images[0] || "/img/hotel.jpg", 
                    hotelId: hotel.id 
                }}
            />

            <Gallery images={hotel.images} title={hotel.title} />
            <Tabs />
           
            <PropertyDetails
                title={hotel.title}
                description={hotel.description}
                guestCount={hotel.guestCount}
                bedroomCount={hotel.bedroomCount}
                bathroomCount={hotel.bathroomCount}
                amenities={hotel.amenities}
                address={hotel.address}         
                latitude={hotel.latitude}      
                longitude={hotel.longitude}     
            />
            <HotelDetails
                title={hotel.title}
                guestCount={hotel.guestCount}
                bedroomCount={hotel.bedroomCount}
                bathroomCount={hotel.bathroomCount}
                bedrooms={bedrooms} 
                amenities={hotel.amenities}
                description={hotel.description}
                propertyInfo={"Example Property Info"} 
                homeHighlights={"Example Home Highlights"} 
                kitchen={"Example Kitchen Info"} 
                general={"General information about the property."} 
                faq={"Frequently asked questions."} 
                parking={"Parking information."} 
                locationHighlights={"Location highlights."} 
                thingsToDo={"Things to do nearby."} 
                localFare={"Local dining options."} 
                airportInfo={"Airport information."} 
                policies={["No smoking", "No pets allowed"]} 
                propertyManagerName={"Evolve"} 
                propertyManagerLogo={"/path/to/logo.png"} 
            />

        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug, hotelId } = context.params!;


    try {
        const res = await fetch(`http://localhost:5000/api/hotel-details/${slug}/${hotelId}`);


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