import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Gallery from '../Gallery';

const mockImages = [
    '/image1.jpg',
    '/image2.jpg',
    '/image3.jpg',
    '/image4.jpg',
    '/image5.jpg',
    '/image6.jpg',
];

describe('Gallery Component', () => {
    it('renders without crashing', () => {
        render(<Gallery images={mockImages} title="Test Gallery" />);
        expect(screen.getByAltText('Test Gallery - Image 1')).toBeInTheDocument();
    });

    it('renders thumbnails correctly', () => {
        render(<Gallery images={mockImages} title="Test Gallery" />);
        const thumbnails = screen.getAllByRole('img');
        expect(thumbnails.length).toBe(mockImages.length);
    });

    it('opens modal on clicking an image', () => {
        render(<Gallery images={mockImages} title="Test Gallery" />);
        const mainImage = screen.getByAltText('Test Gallery - Image 1');
        fireEvent.click(mainImage);
        expect(screen.getByText('1/6')).toBeInTheDocument();
    });

    it('closes modal when close button is clicked', () => {
        render(<Gallery images={mockImages} title="Test Gallery" />);
        const mainImage = screen.getByAltText('Test Gallery - Image 1');
        fireEvent.click(mainImage);

        const closeButton = screen.getByText('×');
        fireEvent.click(closeButton);
        expect(screen.queryByText('1/6')).not.toBeInTheDocument();
    });

    it('navigates to the next image in the modal', () => {
        render(<Gallery images={mockImages} title="Test Gallery" />);
        const mainImage = screen.getByAltText('Test Gallery - Image 1');
        fireEvent.click(mainImage);

        const nextButton = screen.getByText('›');
        fireEvent.click(nextButton); // Move to the second image
        expect(screen.getByText('2/6')).toBeInTheDocument();
    });

    it('navigates to the previous image in the modal', () => {
        render(<Gallery images={mockImages} title="Test Gallery" />);
        const mainImage = screen.getByAltText('Test Gallery - Image 1');
        fireEvent.click(mainImage);

        const nextButton = screen.getByText('›');
        fireEvent.click(nextButton); // Move to the second image
        const prevButton = screen.getByText('‹');
        fireEvent.click(prevButton); // Move back to the first image
        expect(screen.getByText('1/6')).toBeInTheDocument();
    });

    it('disables "previous" button on the first image', () => {
        render(<Gallery images={mockImages} title="Test Gallery" />);
        const mainImage = screen.getByAltText('Test Gallery - Image 1');
        fireEvent.click(mainImage);

        const prevButton = screen.getByText('‹');
        expect(prevButton).toHaveAttribute('disabled');
    });

    it('disables "next" button on the last image', () => {
        render(<Gallery images={mockImages} title="Test Gallery" />);
        const mainImage = screen.getByAltText('Test Gallery - Image 1');
        fireEvent.click(mainImage);

        const nextButton = screen.getByText('›');
        for (let i = 1; i < mockImages.length; i++) {
            fireEvent.click(nextButton);
        }
        expect(nextButton).toHaveAttribute('disabled');
    });

    it('renders "more photos" overlay on the last thumbnail when extra images exist', () => {
        render(<Gallery images={mockImages} title="Test Gallery" />);
        const morePhotos = screen.getByText('+1');
        expect(morePhotos).toBeInTheDocument();
    });
});
