import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GuessInput from './GuessInput';

describe('GuessInput', () => {
  it('renders without crashing', () => {
    const mockOnGuess = jest.fn();
    render(<GuessInput onGuess={mockOnGuess} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onGuess with input value', () => {
    const mockOnGuess = jest.fn();
    render(<GuessInput onGuess={mockOnGuess} />);
    
    fireEvent.change(screen.getByRole('textbox'), { 
      target: { value: 'test' } 
    });
    fireEvent.click(screen.getByRole('button'));
    
    expect(mockOnGuess).toHaveBeenCalledWith('test');
  });

  it('disables input when disabled prop is true', () => {
    render(<GuessInput onGuess={() => {}} disabled={true} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows error when submitting empty guess', () => {
    const mockOnGuess = jest.fn();
    render(<GuessInput onGuess={mockOnGuess} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(screen.getByText('Input cannot be empty')).toBeInTheDocument();
    expect(mockOnGuess).not.toHaveBeenCalled();
  });
});