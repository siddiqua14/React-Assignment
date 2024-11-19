// pages/index.tsx
import { useEffect, useState } from 'react';
import HotelCard, { Hotel } from '../../components/hotel';

const HomePage = (): JSX.Element => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHotels = async (): Promise<void> => {
            try {
                const response = await fetch('http://localhost:5000/api/hotel-details', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch hotels: ${response.statusText}`);
                }

                const data: Hotel[] = await response.json();
                setHotels(data);
            } catch (err) {
                setError('Failed to load hotels');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-white text-3xl font-bold mb-6">Hotel Listings</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotels.map((hotel) => (
                        <HotelCard key={hotel.id} hotel={hotel} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;