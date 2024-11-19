import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../Navbar';

import { regionsWithCurrencies } from '../constants';

// Mock the NavModal component
jest.mock('../NavModal', () => ({
    __esModule: true,
    default: jest.fn(({ isOpen, onClose, onSave }) => (
        isOpen ? (
            <div data-testid="nav-modal">
                <h2>Choose a Region</h2>
                <button onClick={() => onSave('Canada', regionsWithCurrencies['Canada'])}>
                    Save Canada
                </button>
                <button onClick={onClose}>Close</button>
            </div>
        ) : null
    )),
}));

describe('Navbar Component', () => {
    it('opens modal when the region button is clicked', () => {
        render(<Navbar />);

        // Find and click the region button
        const regionButton = screen.getByRole('button', { name: /change region/i });
        fireEvent.click(regionButton);

        // Assert that the modal is displayed
        const modal = screen.getByTestId('nav-modal');
        expect(modal).toBeInTheDocument();
        expect(modal).toHaveTextContent('Choose a Region');
    });

    it('closes modal when the close button is clicked', () => {
        render(<Navbar />);

        // Open the modal
        const regionButton = screen.getByRole('button', { name: /change region/i });
        fireEvent.click(regionButton);

        // Close the modal
        const closeButton = screen.getByText('Close');
        fireEvent.click(closeButton);

        // Assert that the modal is no longer displayed
        expect(screen.queryByTestId('nav-modal')).not.toBeInTheDocument();
    });

    it('updates region and currency when handleSaveRegion is called', () => {
        render(<Navbar />);

        // Open the modal
        const regionButton = screen.getByRole('button', { name: /change region/i });
        fireEvent.click(regionButton);

        // Trigger the Save action in the modal
        const saveCanadaButton = screen.getByText('Save Canada');
        fireEvent.click(saveCanadaButton);

        // Assert that the region and currency were updated
        expect(screen.getByText('Canada')).toBeInTheDocument();
    });
});
