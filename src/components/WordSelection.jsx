import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

const wordList = [
  { word: 'apple', hint: 'A common fruit' },
  { word: 'banana', hint: 'Yellow and curved fruit' },
  { word: 'computer', hint: 'Electronic device for computing' },
  { word: 'javascript', hint: 'Programming language of the web' },
  { word: 'react', hint: 'A popular frontend library' },
  { word: 'bridge', hint: 'Structure connecting two points' },
  { word: 'mountain', hint: 'A large natural elevation of the earth' },
  { word: 'river', hint: 'A natural flowing watercourse' },
  { word: 'ocean', hint: 'Large body of salt water' },
  { word: 'forest', hint: 'Large area covered chiefly with trees' }
];

const WordSelection = forwardRef(({ onWordSelected }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (wordList.length === 0) {
      onWordSelected(null);
      return;
    }
    onWordSelected(wordList[currentIndex]);
  }, [currentIndex, onWordSelected]);

  useImperativeHandle(ref, () => ({
    nextWord() {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % wordList.length);
    }
  }));

  return null; // No UI needed here now
});

export { wordList };
export default WordSelection;
