import React, { useState, useEffect, useRef } from 'react';
import WordSelection from './WordSelection';
import GuessInput from './GuessInput';

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
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [guessDisabled, setGuessDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  const wordSelectionRef = useRef();

  useEffect(() => {
    if (!currentWordObj) {
      setScrambledWord('');
      setFeedback('No valid words available.');
      setTimerActive(false);
      return;
    }
    setScrambledWord(shuffleWord(currentWordObj.word));
    setFeedback('');
    setShowHint(false);
    setGuessDisabled(false);
    setTimeLeft(30);
    setTimerActive(true);
  }, [currentWordObj]);

  useEffect(() => {
    // Increase difficulty every 5 correct guesses
    const newDifficulty = Math.min(3, Math.floor(score / 50) + 1);
    if (newDifficulty !== difficulty) {
      setDifficulty(newDifficulty);
      if (wordSelectionRef.current) {
        wordSelectionRef.current.setDifficulty(newDifficulty);
      }
    }
  }, [score, difficulty]);

  useEffect(() => {
    if (!timerActive) return;

    if (timeLeft === 0) {
      setFeedback('Time is up! Click "Next Word" to continue.');
      setGuessDisabled(true);
      setTimerActive(false);
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, timerActive]);

  const handleGuess = (guess) => {
    if (guess.toLowerCase() === currentWordObj.word.toLowerCase()) {
      setFeedback('Correct! Click "Next Word" to continue.');
      setGuessDisabled(true);
      setTimerActive(false);
      setScore((prevScore) => prevScore + 10);
    } else {
      setFeedback('Incorrect, try again.');
    }
  };

  const handleNextWord = () => {
    if (wordSelectionRef.current) {
      wordSelectionRef.current.nextWord();
    }
  };

  // Enhanced hint system: limit number of hints per game and disable after 3 uses
  const [hintCount, setHintCount] = React.useState(0);
  const maxHints = 3;

  const handleToggleHint = () => {
    if (!showHint && hintCount >= maxHints) {
      setFeedback('No more hints available.');
      return;
    }
    if (!showHint) {
      setHintCount(hintCount + 1);
    }
    setShowHint(!showHint);
  };

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Word Scramble Game</h2>
      <p className="text-xl mb-2">Score: {score}</p>
      <p className="text-xl mb-2">Time Left: {timeLeft}s</p>
      <p className="text-2xl mb-2">Scrambled Word:</p>
      <p className="text-4xl font-mono mb-4">{scrambledWord}</p>
      <GuessInput onGuess={handleGuess} disabled={guessDisabled} />
      <button
        onClick={handleToggleHint}
        className="mb-4 text-sm text-blue-700 underline"
        disabled={hintCount >= maxHints && !showHint}
      >
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>
      {showHint && currentWordObj && (
        <p className="italic text-gray-700 mb-4">{currentWordObj.hint}</p>
      )}
      {feedback && <p className="font-semibold">{feedback}</p>}
      <button
        onClick={handleNextWord}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        disabled={!guessDisabled}
      >
        Next Word
      </button>
      <WordSelection ref={wordSelectionRef} onWordSelected={setCurrentWordObj} />
    </div>
  );
}

export default WordScrambleGame;
