import { GetServerSideProps } from 'next';
import React from 'react';

// Define the types for the hotel data (TypeScript)
interface Hotel {
    title: string;
    description: string;
    guestCount: number;
    bedroomCount: number;
    bathroomCount: number;
    amenities: string[];
    host: string;
    address: string;
    latitude: number;
    longitude: number;
    rooms: Array<{
        hotelSlug: string;
        roomSlug: string;
        roomImage: string[];
        roomTitle: string;
        bedroomCount: number;
    }>;
    id: string;
    slug: string;
    images: string[];
}

interface HotelPageProps {
    hotel: Hotel | null;
    error?: string;
}

const HotelPage = ({ hotel, error }: HotelPageProps) => {
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!hotel) {
        return <div>Hotel not found</div>;
    }

    return (
        <div>
            <h1>{hotel.title}</h1>
            <p>{hotel.description}</p>
            <p>Guest Count: {hotel.guestCount}</p>
            <p>Bedrooms: {hotel.bedroomCount}</p>
            <p>Bathrooms: {hotel.bathroomCount}</p>
            <p>Address: {hotel.address}</p>
            <h2>Amenities:</h2>
            <ul>
                {hotel.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                ))}
            </ul>
            <h2>Rooms:</h2>
            <ul>
                {hotel.rooms.map((room, index) => (
                    <li key={index}>
                        <h3>{room.roomTitle}</h3>
                        <img
                            src={room.roomImage[0]}
                            alt={`${room.roomTitle} Image`}
                            style={{ width: '200px' }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

// getServerSideProps to fetch hotel data based on the dynamic slug and id
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { slug, id } = params as { slug: string; id: string };

    try {
        const res = await fetch(`http://localhost:5000/api/hotel/${id}`);

        if (!res.ok) {
            throw new Error('Hotel not found');
        }

        const hotel = await res.json();

        // If the hotel slug doesn't match the URL slug, throw an error
        if (hotel.slug !== slug) {
            return { notFound: true };
        }

        return {
            props: { hotel },
        };
    } catch (error) {
        return {
            props: { error: 'Hotel not found' },
        };
    }
};

export default HotelPage;
