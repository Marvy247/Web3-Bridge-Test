import React from 'react';
import { render } from '@testing-library/react';
import { wordList } from './WordSelection';
import WordSelection from './WordSelection';

describe('WordSelection', () => {
  it('exports wordList', () => {
    expect(wordList).toBeDefined();
    expect(wordList.length).toBeGreaterThan(0);
  });

  it('calls onWordSelected with initial word', () => {
    const mockOnWordSelected = jest.fn();
    render(<WordSelection onWordSelected={mockOnWordSelected} />);
    expect(mockOnWordSelected).toHaveBeenCalled();
  });

  it('filters words by difficulty', () => {
    const mockOnWordSelected = jest.fn();
    const ref = React.createRef();
    
    render(
      <WordSelection 
        ref={ref} 
        onWordSelected={mockOnWordSelected} 
      />
    );
    
    // Test difficulty filtering
    act(() => {
      ref.current.setDifficulty(1);
    });
    
    const easyWords = wordList.filter(w => w.difficulty <= 1);
    expect(mockOnWordSelected).toHaveBeenCalledWith(
      expect.objectContaining({ difficulty: 1 })
    );
  });
});