import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import Header from './Header';

describe('Header Component', () => {
    test('renders logo image', () => {
        render(<Header />);
        const logo = screen.getByRole('img'); 
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', expect.stringContaining('logo.png'));
    });

    test('renders the header title', () => {
        render(<Header />);
        expect(screen.getByText('InfoTrack Online Game')).toBeInTheDocument();
    });
});
