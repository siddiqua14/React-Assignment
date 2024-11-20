import { render, screen, fireEvent, act } from '@testing-library/react';
import { useRouter } from 'next/router';
import Custom404 from '../404'; // Update the path if necessary
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Custom404 Component', () => {
    const pushMock = jest.fn();
    const backMock = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
            back: backMock,
        });
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    it('renders the 404 page with a countdown', () => {
        render(<Custom404 />);

        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText('Page Not Found')).toBeInTheDocument();
        expect(screen.getByText(/Redirecting to home in/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /← Go Back/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /🏠 Home Page/i })).toBeInTheDocument();
    });

    it('reduces the countdown and redirects to home when it ends', () => {
        render(<Custom404 />);

        // Initial countdown value
        expect(screen.getByText(/Redirecting to home in 10 seconds/)).toBeInTheDocument();

        // Advance time to countdown to 0
        act(() => {
            jest.advanceTimersByTime(10000); // 10 seconds
        });

        // Expect the router to push to the home page
        expect(pushMock).toHaveBeenCalledWith('/');
    });

    it('navigates back when the "Go Back" button is clicked', () => {
        render(<Custom404 />);

        const goBackButton = screen.getByRole('button', { name: /← Go Back/i });
        fireEvent.click(goBackButton);

        expect(backMock).toHaveBeenCalled();
    });

    it('navigates to home when the "Home Page" button is clicked', () => {
        render(<Custom404 />);

        const homePageButton = screen.getByRole('button', { name: /🏠 Home Page/i });
        fireEvent.click(homePageButton);

        expect(pushMock).toHaveBeenCalledWith('/');
    });
});
