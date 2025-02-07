import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import ViewGame from './ViewGame';

const mockSelectedGame = {
    timeLimit: 60,
    rules: [
        { divisibleBy: 3, replacement: 'Fizz', score: 1 },
        { divisibleBy: 5, replacement: 'Buzz', score: 2 },
        { divisibleBy: 15, replacement: 'FizzBuzz', score: 6 },
    ],
};

describe('ViewGame Component', () => {
    test('renders Timer with correct time limit', () => {
        render(<ViewGame selectedGame={mockSelectedGame} />);
        expect(screen.getByText(mockSelectedGame.timeLimit.toString())).toBeInTheDocument();
        expect(screen.getByText('SECONDS')).toBeInTheDocument();
    });

    test('renders Rules component with correct rules', () => {
        render(<ViewGame selectedGame={mockSelectedGame} />);
        
        mockSelectedGame.rules.forEach(rule => {
            expect(screen.getByText(rule.divisibleBy.toString())).toBeInTheDocument();
            expect(screen.getByText(rule.replacement)).toBeInTheDocument();
            expect(screen.getByText(rule.score.toString())).toBeInTheDocument();
        });
    });
});
