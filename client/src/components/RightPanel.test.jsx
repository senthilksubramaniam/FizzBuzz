import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import RightPanel from './RightPanel';

describe('RightPanel Component', () => {
    let mockProps = {
        introductionDisplayed: true,
        onCreateGame: vi.fn(),
        onIntroductionNext: vi.fn(),
        games: [],
        createNewGame: false,
        onCancel: vi.fn(),
        selectedGame: null,
        handleGameActive: vi.fn(),
    };

    test('renders Empty component when no games are available and introduction is displayed', () => {
        const game = {
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
        mockProps = {
            introductionDisplayed: true,
            onCreateGame: vi.fn(),
            onIntroductionNext: vi.fn(),
            games: [game],
            createNewGame: false,
            onCancel: vi.fn(),
            selectedGame: null,
            handleGameActive: vi.fn(),
        };
        render(<RightPanel {...mockProps} />);
        expect(screen.getByText('Select a Game from the left panel',{ exact: false })).toBeInTheDocument();
    });

    test('renders CreateGame component when createNewGame is true', () => {
        render(<RightPanel {...mockProps} createNewGame={true} />);
        expect(screen.getByText('Author')).toBeInTheDocument();
    });

    test('renders Game component when a game is selected', () => {
        const selectedGame = {
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
        mockProps = {
            introductionDisplayed: true,
            onCreateGame: vi.fn(),
            onIntroductionNext: vi.fn(),
            games: [selectedGame],
            createNewGame: false,
            onCancel: vi.fn(),
            selectedGame: null,
            handleGameActive: vi.fn(),
        };
        render(<RightPanel {...mockProps} games={[selectedGame]} selectedGame={selectedGame} />);
        expect(screen.getByText('60',{ exact: false })).toBeInTheDocument();
    });

    test('renders Introduction component when introductionDisplayed is false', () => {
        render(<RightPanel {...mockProps} introductionDisplayed={false} />);
        expect(screen.getByText('FooBooLoo is a fun',{ exact: false })).toBeInTheDocument();
    });
});
