import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import WordScrambleGame from './WordScrambleGame';
import WordSelection from './WordSelection';
import GuessInput from './GuessInput';

// Mock the child components
jest.mock('./WordSelection', () => {
  return jest.fn(() => null);
});
jest.mock('./GuessInput', () => {
  return jest.fn(({ onGuess, disabled }) => (
    <div>
      <input 
        data-testid="guess-input" 
        disabled={disabled}
        onChange={(e) => {}}
      />
      <button 
        data-testid="guess-button" 
        onClick={() => onGuess('test')}
        disabled={disabled}
      >
        Guess
      </button>
    </div>
  ));
});

describe('WordScrambleGame', () => {
  beforeEach(() => {
    WordSelection.mockImplementation(({ onWordSelected }) => {
      const mockWord = { word: 'apple', hint: 'A common fruit', difficulty: 1 };
      React.useEffect(() => {
        onWordSelected(mockWord);
      }, []);
      return null;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    render(<WordScrambleGame />);
    expect(screen.getByText('Word Scramble')).toBeInTheDocument();
  });

  it('displays the initial scrambled word', () => {
    render(<WordScrambleGame />);
    expect(screen.getByTestId('scrambled-word')).toBeInTheDocument();
  });

  it('handles correct guess', () => {
    render(<WordScrambleGame />);
    fireEvent.click(screen.getByTestId('guess-button'));
    expect(screen.getByText('Correct!')).toBeInTheDocument();
  });

  it('handles incorrect guess', () => {
    WordSelection.mockImplementation(({ onWordSelected }) => {
      const mockWord = { word: 'apple', hint: 'A common fruit', difficulty: 1 };
      React.useEffect(() => {
        onWordSelected(mockWord);
      }, []);
      return null;
    });
    
    GuessInput.mockImplementation(({ onGuess, disabled }) => (
      <div>
        <input data-testid="guess-input" disabled={disabled} />
        <button 
          data-testid="guess-button" 
          onClick={() => onGuess('wrong')}
          disabled={disabled}
        >
          Guess
        </button>
      </div>
    ));
    
    render(<WordScrambleGame />);
    fireEvent.click(screen.getByTestId('guess-button'));
    expect(screen.getByText('Incorrect, try again.')).toBeInTheDocument();
  });

  it('counts down timer', () => {
    jest.useFakeTimers();
    render(<WordScrambleGame />);
    
    expect(screen.getByText('30s')).toBeInTheDocument();
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(screen.getByText('29s')).toBeInTheDocument();
  });

  it('handles time running out', () => {
    jest.useFakeTimers();
    render(<WordScrambleGame />);
    
    act(() => {
      jest.advanceTimersByTime(30000);
    });
    
    expect(screen.getByText('Time is up!')).toBeInTheDocument();
  });

  it('shows and hides hint', () => {
    render(<WordScrambleGame />);
    fireEvent.click(screen.getByText(/Hint/i));
    expect(screen.getByText('A common fruit')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Hide Hint'));
    expect(screen.queryByText('A common fruit')).not.toBeInTheDocument();
  });

  it('disables input after correct guess', () => {
    render(<WordScrambleGame />);
    fireEvent.click(screen.getByTestId('guess-button'));
    expect(screen.getByTestId('guess-input')).toBeDisabled();
  });

  it('enables next word button after correct guess', () => {
    render(<WordScrambleGame />);
    fireEvent.click(screen.getByTestId('guess-button'));
    expect(screen.getByText('Next Word')).not.toBeDisabled();
  });
});
