import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface Hotel {
    id: string;
    slug: string;
    title: string;
    description: string;
    images?: string[];
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
}


const HotelCard = ({ hotel }: { hotel: Hotel }): JSX.Element => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href={`/hotel-details/${hotel.slug || hotel.id}/${hotel.id}`}>
                <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Hotel Main Image */}
                    <div className="relative h-48 w-full">
                        {hotel.images?.[0] ? (
                            <Image
                                src={hotel.images[0]} // Use the first image from the array
                                alt={hotel.title}
                                className="object-cover"
                                layout="fill"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                <span className="text-gray-400">No image available</span>
                            </div>
                        )}
                    </div>

                    {/* Hotel Details */}
                    <div className="p-4">
                        <h2 className="text-xl font-bold text-white mb-2">{hotel.title}</h2>
                        <p className="text-sm text-gray-300 mb-2">{hotel.address}</p>
                        <p className="text-sm text-gray-400 line-clamp-2">{hotel.description}</p>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {hotel.amenities.slice(0, 3).map((amenity) => (
                                <span
                                    key={amenity}
                                    className="text-sm bg-gray-700 text-white px-2 py-1 rounded-full"
                                >
                                    {amenity}
                                </span>
                            ))}
                        </div>

                        {/* Guest Count and Beds/Baths */}
                        <div className="mt-4 text-gray-300">
                            {hotel.guestCount} guests • {hotel.bedroomCount} bedrooms • {hotel.bathroomCount} bathrooms
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default HotelCard;
