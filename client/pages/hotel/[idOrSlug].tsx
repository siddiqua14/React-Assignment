// pages/hotel/[idOrSlug].tsx
import { GetServerSideProps } from 'next';
import React from 'react';
import PropertyDetails from '../../components/PropertyDetails';
import Gallery from '../../components/Gallery';
import Header from '../../components/Header'; // Import Header component
import Tabs from '../../components/Tabs';


interface Hotel {
    id: string;
    title: string;
    description: string;
    guestCount: number; 
    bedroomCount: number;
    bathroomCount: number;
    amenities: string[];
    images: string[];
    address: string; // Add address field
    latitude: number; // Add latitude field
    longitude: number; // Add longitude field
}

interface HotelPageProps {
    hotel: Hotel | null;
}

const HotelPage: React.FC<HotelPageProps> = ({ hotel }) => {
    if (!hotel) {
        return <div>Hotel not found</div>;
    }

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
            <Tabs/>
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
            

        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { idOrSlug } = context.params!;
    
    try {
        const res = await fetch(`http://localhost:5000/api/hotel/${idOrSlug}`);
        
        if (!res.ok) {
            return { props: { hotel: null } };
        }
        
        const hotel = await res.json();
        
        return { props: { hotel } };
    } catch (error) {
        console.error('Error fetching hotel:', error);
        return { props: { hotel: null } };
    }
};

export default HotelPage;