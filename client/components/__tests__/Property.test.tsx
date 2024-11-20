import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyDetails from '../PropertyDetails'; // Adjust the path as needed
import BookingCard from '../BookingCard'; // Adjust path if necessary

// Mock FontAwesomeIcon
jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: ({ icon }: { icon: any }) => <span>{icon.iconName}</span>,
}));

jest.mock('../BookingCard', () => {
    return function DummyBookingCard() {
        return <div>BookingCard Component</div>;
    };
});

describe('PropertyDetails Component', () => {
    const mockProps = {
        title: 'Beautiful Beach House',
        description: 'A lovely beach house with amazing ocean views.',
        guestCount: 6,
        bedroomCount: 3,
        bathroomCount: 2,
        amenities: ['WiFi', 'Air Conditioning', 'Pool', 'Barbecue grill', 'Parking available'],
        address: '123 Beachside Ave, Ocean City, USA',
        latitude: 38.12345,
        longitude: -77.12345,
    };

    test('renders property title and description correctly', () => {
        render(<PropertyDetails {...mockProps} />);

        const title = screen.getByText(mockProps.title);
        const description = screen.getByText(mockProps.description);

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    });

    test('renders amenities with correct icons', () => {
        render(<PropertyDetails {...mockProps} />);

        // Check each amenity and its corresponding icon
        mockProps.amenities.forEach((amenity) => {
            const amenityElement = screen.getByText(amenity);
            expect(amenityElement).toBeInTheDocument();

            const icon = screen.getByTestId('wifi-icon');
            expect(icon).toBeInTheDocument();
        });
    });


    test('displays guest, bedroom, and bathroom counts', () => {
        render(<PropertyDetails {...mockProps} />);

        const guestCount = screen.getByText(`Sleeps ${mockProps.guestCount}`);
        const bedroomCount = screen.getByText(`${mockProps.bedroomCount} bedrooms`);
        const bathroomCount = screen.getByText(`${mockProps.bathroomCount} bathrooms`);

        expect(guestCount).toBeInTheDocument();
        expect(bedroomCount).toBeInTheDocument();
        expect(bathroomCount).toBeInTheDocument();
    });

    test('displays the correct map information and locations list', () => {
        render(<PropertyDetails {...mockProps} />);

        // Check for map-related info
        const mapImage = screen.getByAltText('Map of Juneau, Alaska');
        const address = screen.getByText(mockProps.address);
        const coordinates = screen.getByText(`Latitude: ${mockProps.latitude}, Longitude: ${mockProps.longitude}`);

        expect(mapImage).toBeInTheDocument();
        expect(address).toBeInTheDocument();
        expect(coordinates).toBeInTheDocument();

        // Check for locations list
        mockProps.amenities.forEach((amenity) => {
            const locationLink = screen.getByText('See more about this area ›');
            expect(locationLink).toBeInTheDocument();
        });
    });

    test('handles missing amenities', () => {
        const propsWithNoAmenities = { ...mockProps, amenities: [] };

        render(<PropertyDetails {...propsWithNoAmenities} />);

        const noAmenitiesMessage = screen.getByText('No amenities available.');
        expect(noAmenitiesMessage).toBeInTheDocument();
    });

    test('renders BookingCard', () => {
        render(<PropertyDetails {...mockProps} />);

        const bookingCard = screen.getByText('BookingCard Component');
        expect(bookingCard).toBeInTheDocument();
    });
});
