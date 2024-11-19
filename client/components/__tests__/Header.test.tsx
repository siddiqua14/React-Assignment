import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';
import '@testing-library/jest-dom';

// Mock external dependencies
jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode, href: string }) => (
        <a href={href}>{children}</a>
    );
});

jest.mock('react-icons/fa', () => ({
    FaShareAlt: () => <div data-testid="share-icon">Share</div>
}));

// Mock ShareModal component
jest.mock('../Share', () => ({
    __esModule: true,
    default: ({ onClose, propertyInfo }: { onClose: () => void; propertyInfo: any }) => (
        <div data-testid="share-modal">
            <button onClick={onClose}>Close</button>
            <span>{propertyInfo.title}</span>
        </div>
    ),
}));

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: jest.fn(key => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe('Header Component', () => {
    const mockPropertyInfo = {
        title: 'Beautiful Beach House',
        location: 'Malibu, CA',
        rating: '4.5',
        imageUrl: 'https://example.com/beach-house.jpg',
        hotelId: 'beach-123',
    };

    beforeEach(() => {
        // Clear mocks before each test
        localStorageMock.clear();
        jest.clearAllMocks();
    });

    it('renders back link', () => {
        render(<Header />);
        const backLink = screen.getByText('See all properties');
        expect(backLink).toBeInTheDocument();
    });

    it('renders share button', () => {
        render(<Header />);
        const shareIcon = screen.getByTestId('share-icon');
        expect(shareIcon).toBeInTheDocument();
    });

    it('toggles save button state', () => {
        render(<Header />);
        const saveButton = screen.getByLabelText('Save property');

        // Initial state should be unsaved
        expect(saveButton).toHaveTextContent('Save');

        // Click to save
        fireEvent.click(saveButton);

        // Check localStorage was updated
        expect(localStorageMock.setItem).toHaveBeenCalledWith('property-saved', 'true');

        // Button should update to saved state
        expect(saveButton).toHaveTextContent('Saved');
    });

    it('loads saved state from localStorage', () => {
        // Preset localStorage to have saved state
        localStorageMock.getItem.mockReturnValueOnce('true');

        render(<Header />);

        const saveButton = screen.getByLabelText('Save property');

        // Button should be in saved state
        expect(saveButton).toHaveTextContent('Saved');
    });

    it('opens share modal when share button is clicked', () => {
        render(<Header propertyInfo={mockPropertyInfo} />);
    
        // Click share button using test ID
        const shareButton = screen.getByTestId('share-button');
        fireEvent.click(shareButton);
    
        // Verify share modal appears
        const shareModal = screen.getByTestId('share-modal');
        expect(shareModal).toBeInTheDocument();
        expect(shareModal).toHaveTextContent(mockPropertyInfo.title);
    });
    it('closes share modal when close button is clicked', () => {
        render(<Header propertyInfo={mockPropertyInfo} />);
    
        // Open the share modal
        const shareButton = screen.getByTestId('share-button');
        fireEvent.click(shareButton);
    
        // Close the modal
        const closeButton = screen.getByText(/close/i);
        fireEvent.click(closeButton);
    
        // Verify the modal is no longer in the DOM
        expect(screen.queryByTestId('share-modal')).not.toBeInTheDocument();
    });
});
