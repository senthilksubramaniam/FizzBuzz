import { render, screen, fireEvent, act } from '@testing-library/react';
import  '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import Introduction from './Introduction';

describe('Introduction Component', () => {
    test('renders introduction text correctly', () => {
        render(<Introduction onClickNext={() => {}} />);
        expect(screen.getByText(/FooBooLoo is a fun and interactive number replacement game./)).toBeInTheDocument();
        expect(screen.getByText(/A game will have a minimum of three sets of rules./)).toBeInTheDocument();
    });

    
    test('calls onClickNext when Next button is clicked', () => {
        const onClickNextMock = vi.fn();
        render(<Introduction onClickNext={onClickNextMock} />);

        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);

        expect(onClickNextMock).toHaveBeenCalledTimes(1);
    });
});
