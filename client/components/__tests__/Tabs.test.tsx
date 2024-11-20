import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tabs from '../Tabs';

describe('Tabs Component', () => {
    test('renders all tabs correctly', () => {
        render(<Tabs />);

        const overviewTab = screen.getByText('Overview');
        const amenitiesTab = screen.getByText('Amenities');
        const policiesTab = screen.getByText('Policies');

        expect(overviewTab).toBeInTheDocument();
        expect(amenitiesTab).toBeInTheDocument();
        expect(policiesTab).toBeInTheDocument();
    });

    test('displays the correct content when a tab is clicked', () => {
        render(<Tabs />);

        const overviewTab = screen.getByText('Overview');
        const amenitiesTab = screen.getByText('Amenities');
        const policiesTab = screen.getByText('Policies');

        // Initially, the "Overview" tab should be active
        expect(overviewTab).toHaveClass('active');
        expect(amenitiesTab).not.toHaveClass('active');
        expect(policiesTab).not.toHaveClass('active');

        // Click "Amenities" tab and verify the state changes
        fireEvent.click(amenitiesTab);
        expect(amenitiesTab).toHaveClass('active');
        expect(overviewTab).not.toHaveClass('active');
        expect(policiesTab).not.toHaveClass('active');

        // Click "Policies" tab and verify the state changes
        fireEvent.click(policiesTab);
        expect(policiesTab).toHaveClass('active');
        expect(overviewTab).not.toHaveClass('active');
        expect(amenitiesTab).not.toHaveClass('active');
    });
});
