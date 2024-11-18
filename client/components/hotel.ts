// types/hotel.ts (or wherever you define types)
export interface Hotel {
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