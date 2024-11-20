import { render, screen, fireEvent } from '@testing-library/react';
import NavModal from '../NavModal'; 
import '@testing-library/jest-dom';

// Mock constants
jest.mock('../constants', () => ({
    regionsWithCurrencies: {
        USA: 'USD',
        Canada: 'CAD',
        UK: 'GBP',
    },
}));

describe('NavModal Component', () => {
    const onCloseMock = jest.fn();
    const onSaveMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly when open', () => {
        render(
            <NavModal
                isOpen={true}
                onClose={onCloseMock}
                onSave={onSaveMock}
                currentRegion="USA"
            />
        );

        expect(screen.getByText('Display settings')).toBeInTheDocument();
        expect(screen.getByLabelText('Region')).toBeInTheDocument();
        expect(screen.getByLabelText('Currency')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('does not render when closed', () => {
        render(
            <NavModal
                isOpen={false}
                onClose={onCloseMock}
                onSave={onSaveMock}
                currentRegion="USA"
            />
        );

        expect(screen.queryByText('Display settings')).not.toBeInTheDocument();
    });

    it('closes the modal when the close button is clicked', () => {
        render(
            <NavModal
                isOpen={true}
                onClose={onCloseMock}
                onSave={onSaveMock}
                currentRegion="USA"
            />
        );

        const closeButton = screen.getByRole('button', { name: 'Close modal' });
        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('updates region and currency when a new region is selected', () => {
        render(
            <NavModal
                isOpen={true}
                onClose={onCloseMock}
                onSave={onSaveMock}
                currentRegion="USA"
            />
        );

        const regionSelect = screen.getByLabelText('Region') as HTMLSelectElement;
        const currencyInput = screen.getByLabelText('Currency') as HTMLInputElement;

        expect(regionSelect.value).toBe('USA');
        expect(currencyInput.value).toBe('USD');

        fireEvent.change(regionSelect, { target: { value: 'Canada' } });

        expect(regionSelect.value).toBe('Canada');
        expect(currencyInput.value).toBe('CAD');
    });

    it('calls onSave with the selected region and currency when Save is clicked', () => {
        render(
            <NavModal
                isOpen={true}
                onClose={onCloseMock}
                onSave={onSaveMock}
                currentRegion="USA"
            />
        );

        const saveButton = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveButton);

        expect(onSaveMock).toHaveBeenCalledWith('USA', 'USD');
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('displays a warning about changing rewards programs', () => {
        render(
            <NavModal
                isOpen={true}
                onClose={onCloseMock}
                onSave={onSaveMock}
                currentRegion="USA"
            />
        );

        expect(screen.getByText(/Changing your region could change your rewards program/)).toBeInTheDocument();
        expect(screen.getByText(/To stay with your current rewards program/)).toBeInTheDocument();
    });
});
