import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShareModal from '../Share';
import '@testing-library/jest-dom';

// Mock Next.js Image component
jest.mock('next/image', () => {
    return ({ src, alt }: { src: string, alt: string }) => (
        <img src={src} alt={alt} />
    );
});

// Mock window.open and navigator.clipboard
const mockClipboard = {
    writeText: jest.fn()
};

const mockPropertyInfo = {
    title: 'Beautiful Beach House',
    location: 'Malibu, CA',
    rating: '4.5',
    imageUrl: 'https://example.com/beach-house.jpg',
    hotelId: 'beach-123'
};

describe('ShareModal Component', () => {
    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();
        
        // Mock clipboard and window.open
        Object.defineProperty(navigator, 'clipboard', {
            value: mockClipboard,
            configurable: true
        });
        
        window.open = jest.fn();
        window.alert = jest.fn();
    });

    it('renders modal with property information', () => {
        render(<ShareModal onClose={jest.fn()} propertyInfo={mockPropertyInfo} />);
        
        // Check property details are displayed
        expect(screen.getByText('Beautiful Beach House')).toBeInTheDocument();
        expect(screen.getByText('Malibu, CA')).toBeInTheDocument();
        expect(screen.getByText('4.5')).toBeInTheDocument();
    });

    it('closes modal when close button is clicked', () => {
        const mockOnClose = jest.fn();
        render(<ShareModal onClose={mockOnClose} propertyInfo={mockPropertyInfo} />);
        
        const closeButton = screen.getByText('✕');
        fireEvent.click(closeButton);
        
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('handles platform sharing correctly', () => {
        render(<ShareModal onClose={jest.fn()} propertyInfo={mockPropertyInfo} />);
        
        const platforms = ['Messages', 'WhatsApp', 'Messenger', 'Facebook', 'X'];
        platforms.forEach(platform => {
            const platformButton = screen.getByText(platform);
            fireEvent.click(platformButton);
            
            expect(window.open).toHaveBeenCalled();
        });
    });

    it('handles Instagram platform with alert', () => {
        render(<ShareModal onClose={jest.fn()} propertyInfo={mockPropertyInfo} />);
        
        const instagramButton = screen.getByText('Instagram');
        fireEvent.click(instagramButton);
        
        expect(window.alert).toHaveBeenCalledWith(
            "Instagram does not support direct sharing via URL. Please copy the link."
        );
    });

    it('renders share options', () => {
        render(<ShareModal onClose={jest.fn()} propertyInfo={mockPropertyInfo} />);
        
        const platforms = ['Messages', 'WhatsApp', 'Messenger', 'Facebook', 'Instagram', 'X'];
        platforms.forEach(platform => {
            expect(screen.getByText(platform)).toBeInTheDocument();
        });
    });

    it('handles modal overlay click', () => {
        const mockOnClose = jest.fn();
        render(<ShareModal onClose={mockOnClose} propertyInfo={mockPropertyInfo} />);
        
        const overlay = screen.getByTestId('share-modal-overlay');
        fireEvent.click(overlay);
        
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});