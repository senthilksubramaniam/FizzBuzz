import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import PlayGame from './PlayGame';

describe('PlayGame Component', () => {
    const mockSelectedGame = {
        timeLimit: 10,
        range: 100,
        rules: [
            { divisibleBy: 3, replacement: 'Fizz', score: 1 },
            { divisibleBy: 6, replacement: 'Buzz', score: 1 },
            { divisibleBy: 15, replacement: 'FizzBuzz', score: 2 },
        ],
    };

    test('renders initial game state correctly', () => {
        render(<PlayGame selectedGame={mockSelectedGame} onGameActive={() => {}} />);
        expect(screen.getByText('10')).toBeInTheDocument();
        mockSelectedGame.rules.forEach(rule => {
            expect(screen.getByText(rule.divisibleBy)).toBeInTheDocument();
        });
    });

    test('handles user interactions and game progression', () => {
        vi.useFakeTimers();
        const mockOnGameActive = vi.fn();

        render(<PlayGame selectedGame={mockSelectedGame} onGameActive={mockOnGameActive} />);

        
        const firstRuleCheckbox = screen.getByLabelText('3');
        fireEvent.click(firstRuleCheckbox);
        expect(firstRuleCheckbox).toBeChecked();

        
        const checkButton = screen.getByText('CHECK');
        fireEvent.click(checkButton);

       
        const nextButton = screen.getByText('NEXT');
        fireEvent.click(nextButton);

        
        act(() => {
            vi.advanceTimersByTime(5000);
        });
       
        expect(screen.getByText('5')).toBeInTheDocument();

       
        act(() => {
            vi.advanceTimersByTime(5000);
        });
              
        vi.useRealTimers();
    });
});
