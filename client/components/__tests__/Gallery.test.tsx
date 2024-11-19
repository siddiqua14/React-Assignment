import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Gallery from '../Gallery';

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
      const { src, alt } = props;
      return <img src={src} alt={alt} />;
    },
  }));

describe('Gallery Component', () => {
    const mockImages = [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg',
        'https://example.com/image4.jpg',
        'https://example.com/image5.jpg',
        'https://example.com/image6.jpg',
    ];
    const title = 'Test Gallery';

    it('renders nothing when no images are provided', () => {
        const { container } = render(<Gallery images={[]} title={title} />);
        expect(container.firstChild).toBeNull();
    });

    it('renders the main image when images are provided', () => {
        render(<Gallery images={mockImages} title={title} />);
        
        // Check main image is rendered
        const mainImage = screen.getByAltText(`${title} - Image 1`);
        expect(mainImage).toBeInTheDocument();
    });

    it('displays the correct number of images', () => {
        render(<Gallery images={mockImages} title={title} />);
        
        // Check more photos indicator
        const morePhotosIndicator = screen.getByText(`${mockImages.length}+`);
        expect(morePhotosIndicator).toBeInTheDocument();
    });

    it('opens modal when more photos indicator is clicked', () => {
        const { container } = render(<Gallery images={mockImages} title={title} />);
        
        // Find and click more photos indicator
        const morePhotosIndicator = screen.getByText(`${mockImages.length}+`);
        fireEvent.click(morePhotosIndicator);

        // You would typically add assertions about modal state here
        // Note: This requires completing the modal implementation in the component
    });
    it('displays correct image count in modal', () => {
        render(<Gallery images={mockImages} title={title} />);
        
        // Open modal
        const morePhotosIndicator = screen.getByText(`${mockImages.length}+`);
        fireEvent.click(morePhotosIndicator);

        // Check image count display
        const imageCount = screen.getByText('1/3');
        expect(imageCount).toBeInTheDocument();
    });
    it('navigates between images in modal', () => {
        render(<Gallery images={mockImages} title={title} />);
        
        // Open modal
        const morePhotosIndicator = screen.getByText(`${mockImages.length}+`);
        fireEvent.click(morePhotosIndicator);

        // Navigate to next image
        const nextButton = screen.getByText('❯');
        fireEvent.click(nextButton);

        // Check second image is displayed
        const secondImageTitle = screen.getByText(`${title} - Image 2`);
        expect(secondImageTitle).toBeInTheDocument();
        
        const imageCount = screen.getByText('2/3');
        expect(imageCount).toBeInTheDocument();
    });
    it('disables previous button on first image', () => {
        render(<Gallery images={mockImages} title={title} />);
        
        // Open modal
        const morePhotosIndicator = screen.getByText(`${mockImages.length}+`);
        fireEvent.click(morePhotosIndicator);

        // Check previous button is disabled
        const prevButton = screen.getByText('❮');
        expect(prevButton).toBeDisabled();
    });

    it('disables next button on last image', () => {
        render(<Gallery images={mockImages} title={title} />);
        
        // Open modal
        const morePhotosIndicator = screen.getByText(`${mockImages.length}+`);
        fireEvent.click(morePhotosIndicator);

        // Navigate to last image
        const nextButton = screen.getByText('❯');
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);

        // Check next button is disabled
        expect(nextButton).toBeDisabled();
    });
    it('renders nothing when no images are provided', () => {
        const { container } = render(<Gallery images={[]} title={title} />);
        expect(container.firstChild).toBeNull();
    });
    it('opens modal when thumbnail is clicked', () => {
        render(<Gallery images={mockImages} title={title} />);
        
        // Click on the second image thumbnail
        const thumbnail = screen.getByAltText('Thumbnail 1');
        fireEvent.click(thumbnail);
        
        // Check if modal opens and displays the correct image
        const modalImage = screen.getByAltText('Image 2');
        expect(modalImage).toBeInTheDocument();
    });

    it('closes modal when close button is clicked', () => {
        render(<Gallery images={mockImages} title={title} />);
        
        // Open modal by clicking on a thumbnail
        const thumbnail = screen.getByAltText('Thumbnail 1');
        fireEvent.click(thumbnail);
        
        // Close modal
        const closeButton = screen.getByText(/close/i);
        fireEvent.click(closeButton);

        // Verify the modal is closed
        expect(screen.queryByTestId('image-modal')).not.toBeInTheDocument();
    });

});