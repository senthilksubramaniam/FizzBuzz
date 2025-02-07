import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import CreateGame from './CreateGame';

vi.mock('../services/gameService', () => ({
    createGame: vi.fn().mockResolvedValue(true),
  }));

  const renderComponent = (props = {}) => {
    const defaultProps = {
      existingGames: [],
      onCreateGame: vi.fn(),
      onCancel: vi.fn(),
      createNewGame: true,
    };
    return render(<CreateGame {...defaultProps} {...props} />);
  };
  

  describe('CreateGame Component', () => {
    
    test('renders all input fields', () => {
        renderComponent();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Author')).toBeInTheDocument();
        expect(screen.getByText('Time Limit (seconds)')).toBeInTheDocument();
        expect(screen.getByText('Range for the system generated number')).toBeInTheDocument();
        expect(screen.getByText('Divisible By')).toBeInTheDocument();
        expect(screen.getByText('Replacement')).toBeInTheDocument();
        expect(screen.getByText('Score')).toBeInTheDocument();
      });

      test('allows adding a new rule', () => {
        renderComponent();
        fireEvent.change(screen.getByLabelText('Divisible By'), { target: { value: '3' } });
        fireEvent.change(screen.getByLabelText('Replacement'), { target: { value: 'FOO' } });
        fireEvent.change(screen.getByLabelText('Score'), { target: { value: '10' } });
        fireEvent.click(screen.getByText('+'));
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('FOO')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
      });
      
      test('displays error when required fields are missing', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Save'));
        expect(screen.getByText('All fields are required and at least three rule must be added.')).toBeInTheDocument();
      });
      
      
  });
  