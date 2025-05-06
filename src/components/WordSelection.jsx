import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

const wordList = [
  { word: 'apple', hint: 'A common fruit', difficulty: 1 },
  { word: 'banana', hint: 'Yellow and curved fruit', difficulty: 1 },
  { word: 'computer', hint: 'Electronic device for computing', difficulty: 2 },
  { word: 'javascript', hint: 'Programming language of the web', difficulty: 3 },
  { word: 'react', hint: 'A popular frontend library', difficulty: 2 },
  { word: 'bridge', hint: 'Structure connecting two points', difficulty: 2 },
  { word: 'mountain', hint: 'A large natural elevation of the earth', difficulty: 3 },
  { word: 'river', hint: 'A natural flowing watercourse', difficulty: 1 },
  { word: 'ocean', hint: 'Large body of salt water', difficulty: 1 },
  { word: 'forest', hint: 'Large area covered chiefly with trees', difficulty: 2 }
];

const WordSelection = forwardRef(({ onWordSelected }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [difficulty, setDifficulty] = useState(1);

  useEffect(() => {
    if (wordList.length === 0) {
      onWordSelected(null);
      return;
    }
    // Filter words by difficulty
    const filteredWords = wordList.filter((w) => w.difficulty <= difficulty);
    if (filteredWords.length === 0) {
      onWordSelected(null);
      return;
    }
    // Adjust currentIndex if out of bounds
    const index = currentIndex % filteredWords.length;
    onWordSelected(filteredWords[index]);
  }, [currentIndex, difficulty, onWordSelected]);

  useImperativeHandle(ref, () => ({
    nextWord() {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    },
    setDifficulty(newDifficulty) {
      setDifficulty(newDifficulty);
      setCurrentIndex(0); // reset index when difficulty changes
    }
  }));

  return null; // No UI needed here now
});

export { wordList };
export default WordSelection;
