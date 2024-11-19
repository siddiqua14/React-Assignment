import React from 'react';
import { render, screen } from '@testing-library/react';
import HotelCard, { Hotel } from '../hotel';
import '@testing-library/jest-dom';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'; // Mock Next.js routing

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        const { src, alt } = props;
        return <img src={src} alt={alt} />;
    },
}));
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('HotelCard Component', () => {
    const mockHotel: Hotel = {
        id: '1',
        slug: 'hotel-slug',
        title: 'Luxury Hotel',
        description: 'This is a luxury hotel with amazing amenities.',
        images: ['https://example.com/image1.jpg'],
        guestCount: 4,
        bedroomCount: 2,
        bathroomCount: 2,
        amenities: ['WiFi', 'Pool', 'Parking', 'Air Conditioning'],
        host: 'John Doe',
        address: '123 Main St, Cityville',
        latitude: 0,
        longitude: 0,
        rooms: [],
    };

    it('renders the hotel title, address, and description', () => {
        render(<HotelCard hotel={mockHotel} />, { wrapper: MemoryRouterProvider });

        expect(screen.getByText('Luxury Hotel')).toBeInTheDocument();
        expect(screen.getByText('123 Main St, Cityville')).toBeInTheDocument();
        expect(screen.getByText('This is a luxury hotel with amazing amenities.')).toBeInTheDocument();
    });

    it('renders the main image if provided', () => {
        render(<HotelCard hotel={mockHotel} />, { wrapper: MemoryRouterProvider });

        const mainImage = screen.getByAltText('Luxury Hotel');
        expect(mainImage).toBeInTheDocument();
        expect(mainImage).toHaveAttribute('src', 'https://example.com/image1.jpg');
    });

    it('displays "No image available" when no image is provided', () => {
        const hotelWithoutImages = { ...mockHotel, images: undefined };
        render(<HotelCard hotel={hotelWithoutImages} />, { wrapper: MemoryRouterProvider });

        expect(screen.getByText('No image available')).toBeInTheDocument();
    });

    it('renders up to three amenities', () => {
        render(<HotelCard hotel={mockHotel} />, { wrapper: MemoryRouterProvider });

        expect(screen.getByText('WiFi')).toBeInTheDocument();
        expect(screen.getByText('Pool')).toBeInTheDocument();
        expect(screen.getByText('Parking')).toBeInTheDocument();
        expect(screen.queryByText('Air Conditioning')).not.toBeInTheDocument();
    });

    it('displays the correct guest, bedroom, and bathroom counts', () => {
        render(<HotelCard hotel={mockHotel} />, { wrapper: MemoryRouterProvider });

        expect(screen.getByText('4 guests • 2 bedrooms • 2 bathrooms')).toBeInTheDocument();
    });

    it('contains a link to the correct hotel details page', () => {
        render(<HotelCard hotel={mockHotel} />);
    
        // Check the link's href
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', `/hotel-details/hotel-slug/1`);
      });
});
