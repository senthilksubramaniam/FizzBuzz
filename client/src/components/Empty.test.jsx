import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import Empty from './Empty';

describe('Empty Component', () => {
    test('renders the correct message', () => {
        render(<Empty />);
        expect(screen.getByText('Select a Game from the left panel')).toBeInTheDocument();
    });
});
