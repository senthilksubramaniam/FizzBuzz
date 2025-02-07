import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import Game from './Game';

describe('Game Component', () => {
    const mockSelectedGame = {
        id: 1,
        name: 'Sample Game',
        timeLimit: 60,
        range: 100,
        rules: [
            { divisibleBy: 3, replacement: 'Fizz', score: 1 },
            { divisibleBy: 5, replacement: 'Buzz', score: 1 },
            { divisibleBy: 15, replacement: 'FizzBuzz', score: 2 },
        ],
    };

    test('initially displays ViewGame component', () => {
        render(
            <Game
                selectedGame={mockSelectedGame}
                handleGameActive={() => {}}
                onStartGame={() => {}}
            />
        );
        
        // Check if all rule options are displayed
        mockSelectedGame.rules.forEach(rule => {
            expect(screen.getByText(rule.divisibleBy)).toBeInTheDocument();
        });

        // Check if the timer is displayed

        expect(screen.getByText(mockSelectedGame.timeLimit.toString())).toBeInTheDocument();
        expect(screen.getByText('SECONDS')).toBeInTheDocument();

        // Check if the Play button is rendered
        const playButton = screen.getByText('Play');
        expect(playButton).toBeInTheDocument();
    });


    test('transitions to PlayGame component when Play button is clicked', () => {
        const handleGameActiveMock = vi.fn();

        render(
            <Game
                selectedGame={mockSelectedGame}
                handleGameActive={handleGameActiveMock}
                onStartGame={() => {}}
            />
        );

        // Click the Play button
        const playButton = screen.getByText('Play');
        fireEvent.click(playButton);

        // Check if handleGameActive was called with true
        expect(handleGameActiveMock).toHaveBeenCalledWith(true);

        // Check if the PlayGame component is rendered
        expect(screen.getByText('CHECK')).toBeInTheDocument();
        expect(screen.getByText('NEXT')).toBeInTheDocument();
    });
});
