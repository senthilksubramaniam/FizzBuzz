import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import LeftPanel from './LeftPanel';

describe('LeftPanel Component', () => {
    const mockGames = [
        { id: 1, name: 'Game 1' },
        { id: 2, name: 'Game 2' },
    ];

    test('renders list of existing games', () => {
        render(
            <LeftPanel
                existingGames={mockGames}
                onCreatNewGame={() => {}}
                onGameSelected={() => {}}
                gameActive={false}
            />
        );

        mockGames.forEach((game) => {
            expect(screen.getByText(game.name)).toBeInTheDocument();
        });
    });

    test('calls onCreatNewGame when "+" button is clicked', () => {
        const onCreatNewGameMock = vi.fn();

        render(
            <LeftPanel
                existingGames={mockGames}
                onCreatNewGame={onCreatNewGameMock}
                onGameSelected={() => {}}
                gameActive={false}
            />
        );

        const createButton = screen.getByRole('button', { name: '+' });
        fireEvent.click(createButton);

        expect(onCreatNewGameMock).toHaveBeenCalledTimes(1);
    });

    test('calls onGameSelected with correct game when a game is clicked and no game is active', () => {
        const onGameSelectedMock = vi.fn();

        render(
            <LeftPanel
                existingGames={mockGames}
                onCreatNewGame={() => {}}
                onGameSelected={onGameSelectedMock}
                gameActive={false}
            />
        );

        const gameItem = screen.getByText('Game 1');
        fireEvent.click(gameItem);

        expect(onGameSelectedMock).toHaveBeenCalledTimes(1);
        expect(onGameSelectedMock).toHaveBeenCalledWith(mockGames[0]);
    });

    test('does not call onGameSelected when a game is clicked and a game is active', () => {
        const onGameSelectedMock = vi.fn();

        render(
            <LeftPanel
                existingGames={mockGames}
                onCreatNewGame={() => {}}
                onGameSelected={onGameSelectedMock}
                gameActive={true}
            />
        );

        const gameItem = screen.getByText('Game 1');
        fireEvent.click(gameItem);

        expect(onGameSelectedMock).not.toHaveBeenCalled();
    });
});
