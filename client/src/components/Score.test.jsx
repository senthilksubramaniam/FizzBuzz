import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import Score from './Score'; 

describe('Score Component', () => {
    test('renders score details correctly', () => {
        const mockScore = {
            questions:7,
            correct: 5,
            incorrect: 2,
            score: 10,
            bonus: 3,
            total: 13,
        };

        render(<Score score={mockScore} onClose={() => {}} />);
        expect(screen.getByText('Right answer : 5')).toBeInTheDocument();
        expect(screen.getByText('Wrong answer : 2')).toBeInTheDocument();
        expect(screen.getByText('Score : 10')).toBeInTheDocument();
        expect(screen.getByText('Bonus : 3')).toBeInTheDocument();
        expect(screen.getByText('Total Score : 13')).toBeInTheDocument();
    });

    test('calls onClose when the close button is clicked', () => {
        const onCloseMock = vi.fn();
        const mockScore = { correct: 1, incorrect: 1, score: 5, bonus: 1, total: 6 };

        render(<Score score={mockScore} onClose={onCloseMock} />);

        const closeButton = screen.getByText('Close');
        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
