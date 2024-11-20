import { render, screen, fireEvent } from '@testing-library/react';
import BookingCard from '../BookingCard'; // Adjust the path as needed
import '@testing-library/jest-dom/extend-expect';

// Mocking localStorage
beforeEach(() => {
  // Mock the methods of localStorage
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => null); // Default mock implementation
});

describe('BookingCard', () => {
  it('renders booking card with initial values', () => {
    render(<BookingCard />);

    // Check default values
    expect(screen.getByLabelText(/Start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End date/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('2 travelers')).toBeInTheDocument();
    expect(screen.getByText('$134')).toBeInTheDocument();
    expect(screen.getByText('Non-refundable')).toBeInTheDocument();
    expect(screen.getByText('Your dates are available')).toBeInTheDocument();
  });

  it('updates travelers count correctly', () => {
    render(<BookingCard />);

    // Increase adults count
    const adultIncreaseButton = screen.getByText('+');
    fireEvent.click(adultIncreaseButton);

    // Check if adults count is updated to 3
    expect(screen.getByDisplayValue('3 travelers')).toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith('travelers_adults', '3');

    // Decrease children count
    const childrenDecreaseButton = screen.getByText('−');
    fireEvent.click(childrenDecreaseButton);

    // Check if children count is updated to 0
    expect(screen.getByDisplayValue('3 travelers')).toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith('travelers_children', '0');
  });

  it('calculates the total price correctly', () => {
    render(<BookingCard />);

    // Set start and end date
    const startDateInput = screen.getByLabelText(/Start date/i);
    const endDateInput = screen.getByLabelText(/End date/i);

    fireEvent.change(startDateInput, { target: { value: '2024-12-01' } });
    fireEvent.change(endDateInput, { target: { value: '2024-12-05' } });

    // Check if total price is updated (Base price = 134, for 4 nights = 134 * 4 = 536)
    expect(screen.getByText('$536')).toBeInTheDocument();
  });

  it('shows correct pet checkbox status', () => {
    render(<BookingCard />);

    const petCheckbox = screen.getByLabelText(/I am traveling with pets/i);

    // Initially unchecked
    expect(petCheckbox).not.toBeChecked();

    // Check the checkbox
    fireEvent.click(petCheckbox);
    expect(petCheckbox).toBeChecked();

    // Uncheck the checkbox
    fireEvent.click(petCheckbox);
    expect(petCheckbox).not.toBeChecked();
  });

  it('displays the correct total amount', () => {
    render(<BookingCard />);

    // Check if the default total amount is calculated correctly (134 * 4 = 536)
    expect(screen.getByText('$536')).toBeInTheDocument();
  });

  it('stores and loads travelers data from localStorage', () => {
    // Mock localStorage data
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'travelers_adults') return '3';  // Mock adult count as 3
      if (key === 'travelers_children') return '1';  // Mock children count as 1
      return null;
    });

    render(<BookingCard />);

    // Ensure that the values from localStorage are loaded correctly
    expect(screen.getByDisplayValue('4 travelers')).toBeInTheDocument(); // 3 adults + 1 child = 4 travelers
  });

  it('hides travelers content when "Done" button is clicked', () => {
    render(<BookingCard />);

    // Open travelers content
    const travelersInput = screen.getByDisplayValue('2 travelers');
    fireEvent.click(travelersInput);

    // Check if travelers content is visible
    expect(screen.getByText('Done')).toBeInTheDocument();

    // Close the travelers content
    const doneButton = screen.getByText('Done');
    fireEvent.click(doneButton);

    // Ensure travelers content is hidden
    expect(screen.queryByText('Done')).not.toBeInTheDocument();
  });

  it('displays the correct booking details', () => {
    render(<BookingCard />);

    // Check if booking details (e.g., price, non-refundable status, etc.) are rendered
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Non-refundable')).toBeInTheDocument();
    expect(screen.getByText('You will not be charged yet')).toBeInTheDocument();
  });
});
