import { render, screen } from '@testing-library/react';
import HotelDetails from '../HotelDetails';  // Adjust the import based on the file path

describe('HotelDetails', () => {
    const mockProps = {
        title: "Sample Hotel",
        guestCount: 4,
        bedroomCount: 2,
        bathroomCount: 2,
        bedrooms: [
            { name: 'Bedroom 1', bedType: 'Queen Bed' },
            { name: 'Bedroom 2', bedType: 'Double Bed' }
        ],
        amenities: [
            'WiFi',
            'Air Conditioning',
            'Pool',
            'Parking available',
            'Outdoor Space',
            'Kitchen',
            'Barbecue grill',
            'Washer',
        ],
        description: "A beautiful hotel located in the heart of the city.",
        propertyInfo: "Property information goes here.",
        homeHighlights: "Home highlights go here.",
        kitchen: "Fully equipped kitchen.",
        general: "General information about the property.",
        faq: "Frequently asked questions here.",
        parking: "Free parking available.",
        locationHighlights: "Close to major attractions.",
        thingsToDo: "Many activities available nearby.",
        localFare: "Local restaurants and cafes.",
        airportInfo: "Airport information here.",
        policies: ["No pets allowed", "Check-in at 3 PM", "No smoking inside the property"],
        propertyManagerName: "John Doe",
        propertyManagerLogo: "/path/to/logo.png",
        spaces: ['Deck or patio', 'Kitchen', 'Balcony', 'Garden'],
    };
    it('renders Rooms & Beds section correctly', () => {
        render(<HotelDetails {...mockProps} />);

        // Check if the title and sleep info are rendered
        expect(screen.getByText('Rooms & beds')).toBeInTheDocument();
        expect(screen.getByText(/2 bedrooms \(sleeps 4\)/)).toBeInTheDocument();

        // Check each bedroom and bed type
        mockProps.bedrooms.forEach((bedroom) => {
            expect(screen.getByText(bedroom.name)).toBeInTheDocument();
            expect(screen.getByText(bedroom.bedType)).toBeInTheDocument();
        });

        // Check if the bathroom section is rendered correctly
        expect(screen.getByText(/2 bathrooms?/)).toBeInTheDocument();
        expect(screen.getByText('Full Bathroom')).toBeInTheDocument();
    });


    it('renders Spaces section correctly', () => {
        render(<HotelDetails {...mockProps} />);

        // Check if spaces section and its items are rendered
        expect(screen.getByText('Spaces')).toBeInTheDocument();
        mockProps.spaces.forEach((space) => {
            expect(screen.getByText(space)).toBeInTheDocument(); // Check if each space is in the document
        });
    });

    it('renders About Property section correctly', () => {
        render(<HotelDetails {...mockProps} />);

        // Check if the About Property section is rendered
        expect(screen.getByText('About this property')).toBeInTheDocument();
        expect(screen.getByText(mockProps.title)).toBeInTheDocument();
        expect(screen.getByText(mockProps.description)).toBeInTheDocument();
        expect(screen.getByText(mockProps.propertyInfo)).toBeInTheDocument();
        expect(screen.getByText(mockProps.homeHighlights)).toBeInTheDocument();
        expect(screen.getByText(mockProps.kitchen)).toBeInTheDocument(); // Check if kitchen is rendered
        expect(screen.getByText(mockProps.general)).toBeInTheDocument();
        expect(screen.getByText(mockProps.faq)).toBeInTheDocument();
        expect(screen.getByText(mockProps.parking)).toBeInTheDocument();
    });
    it('renders Policies section correctly', () => {
        render(<HotelDetails {...mockProps} />);

        // Check if policies are rendered correctly
        expect(screen.getByText('-- POLICIES --')).toBeInTheDocument();
        mockProps.policies.forEach((policy) => {
            expect(screen.getByText(policy)).toBeInTheDocument();
        });
    });

    it('renders Property Manager section correctly', () => {
        render(<HotelDetails {...mockProps} />);

        // Check if Property Manager section is rendered correctly
        expect(screen.getByText('Property Manager')).toBeInTheDocument();
        expect(screen.getByText(mockProps.propertyManagerName)).toBeInTheDocument();
        expect(screen.getByAltText('Property Manager Logo')).toBeInTheDocument();
    });

    it('renders Q&A section correctly', () => {
        render(<HotelDetails {...mockProps} />);

        // Check if Q&A section is rendered correctly
        expect(screen.getByText('Have a question?')).toBeInTheDocument();
        expect(screen.getByText('Get instant answers with AI-powered search of property information and reviews.')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Is there free parking?')).toBeInTheDocument();
    });
    it('renders amenities with correct icons', () => {
        render(<HotelDetails {...mockProps} />);

        // Check each amenity and its corresponding icon
        mockProps.amenities.forEach((amenity) => {
            const amenityElement = screen.getByText(amenity);
            expect(amenityElement).toBeInTheDocument();

            let icon;
            switch (amenity) {
                case "WiFi":
                    icon = screen.getByLabelText(/wifi/i);  // Use aria-label to query for WiFi icon
                    break;
                case "Air Conditioning":
                    icon = screen.getByLabelText(/snowflake/i);  // Use aria-label for Snowflake icon
                    break;
                case "Pool":
                    icon = screen.getByLabelText(/swimmingpool/i);  // Use aria-label for Swimming Pool icon
                    break;
                case "Parking available":
                    icon = screen.getByLabelText(/car/i);  // Use aria-label for Car icon
                    break;
                case "Outdoor Space":
                    icon = screen.getByLabelText(/tree/i);  // Use aria-label for Tree icon
                    break;
                case "Kitchen":
                    icon = screen.getByLabelText(/cutlery/i);  // Use aria-label for Cutlery icon
                    break;
                case "Barbecue grill":
                    icon = screen.getByLabelText(/drumstickbite/i);  // Use aria-label for Barbecue icon
                    break;
                case "Washer":
                    icon = screen.getByLabelText(/soap/i);  // Use aria-label for Soap icon (Washer)
                    break;
                default:
                    icon = null;
            }

            expect(icon).toBeInTheDocument();  // Ensure that the corresponding icon is present
        });
    });
});
