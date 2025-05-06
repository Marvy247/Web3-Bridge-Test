import React, { useState, useEffect } from 'react';
import WordSelection from './WordSelection';

// Utility function to shuffle letters of a word
function shuffleWord(word) {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

function WordScrambleGame() {
  const [currentWordObj, setCurrentWordObj] = useState(null);
  const [scrambledWord, setScrambledWord] = useState('');
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!currentWordObj) {
      setScrambledWord('');
      setFeedback('No valid words available.');
      return;
    }
    setScrambledWord(shuffleWord(currentWordObj.word));
    setGuess('');
    setFeedback('');
    setShowHint(false);
  }, [currentWordObj]);

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guess.trim()) {
      setFeedback('Please enter a non-empty guess.');
      return;
    }
    if (guess.trim().toLowerCase() === currentWordObj.word.toLowerCase()) {
      setFeedback('Correct! Click "Next Word" to continue.');
    } else {
      setFeedback('Incorrect, try again.');
    }
  };

  const toggleHint = () => {
    setShowHint((prev) => !prev);
  };

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Word Scramble Game</h2>
      <p className="text-2xl mb-2">Scrambled Word:</p>
      <p className="text-4xl font-mono mb-4">{scrambledWord}</p>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={guess}
          onChange={handleGuessChange}
          placeholder="Enter your guess"
          className="border p-2 rounded w-full text-center"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Guess
        </button>
      </form>
      <button
        onClick={toggleHint}
        className="mb-4 text-sm text-blue-700 underline"
      >
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>
      {showHint && currentWordObj && (
        <p className="italic text-gray-700 mb-4">{currentWordObj.hint}</p>
      )}
      {feedback && <p className="font-semibold">{feedback}</p>}
      <WordSelection onWordSelected={setCurrentWordObj} />
    </div>
  );
}

export default WordScrambleGame;
