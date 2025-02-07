import { render, screen } from '@testing-library/react';
import  '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import Rules from './Rules';

describe('Rules Component', () => {
    test('renders a table with rules correctly', () => {
        const mockRules = [
            { divisibleBy: 3, replacement: 'Fizz', score: 1 },
            { divisibleBy: 5, replacement: 'Buzz', score: 2 },
            { divisibleBy: 15, replacement: 'FizzBuzz', score: 6 },
        ];

        render(<Rules rules={mockRules} />);

        expect(screen.getByText('DIVISIBLE BY')).toBeInTheDocument();
        expect(screen.getByText('REPLACEMENT')).toBeInTheDocument();
        expect(screen.getByText('SCORE')).toBeInTheDocument();

        mockRules.forEach(rule => {
            expect(screen.getByText(rule.divisibleBy.toString())).toBeInTheDocument();
            expect(screen.getByText(rule.replacement)).toBeInTheDocument();
            expect(screen.getByText(rule.score.toString())).toBeInTheDocument();
        });
    });

    test('renders empty table when no rules are provided', () => {
        render(<Rules rules={[]} />);

        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
        expect(screen.queryByText('Fizz')).not.toBeInTheDocument();
        expect(screen.queryByText('Buzz')).not.toBeInTheDocument();
    });
});
