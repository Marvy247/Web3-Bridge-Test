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
    const scrambled = shuffleWord(currentWordObj.word);
    setScrambledWord(scrambled);
    setFeedback('');
    setShowHint(false);
    setGuessDisabled(false);
    setTimeLeft(30);
    setTimerActive(true);
  }, [currentWordObj]);

  useEffect(() => {
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

  const [hintCount, setHintCount] = useState(0);
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
    <div className="max-w-md mx-auto mt-40 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-4xl font-bold mb-4 text-blue-600">Word Scramble Game</h2>
      <p className="text-xl mb-2">Score: <span className="font-semibold">{score}</span></p>
      <p className="text-xl mb-2">Time Left: <span className="font-semibold">{timeLeft}s</span></p>
      <p className="text-2xl mb-2">Scrambled Word:</p>
      <p className="text-5xl font-mono mb-4 text-gray-800">{scrambledWord}</p>
      <GuessInput onGuess={handleGuess} disabled={guessDisabled} />
      <button
        onClick={handleToggleHint}
        className={`mb-4 text-sm ${showHint ? 'text-red-600' : 'text-blue-700'} underline`}
        disabled={hintCount >= maxHints && !showHint}
      >
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>
      {showHint && currentWordObj && (
        <p className="italic text-gray-700 mb-4">{currentWordObj.hint}</p>
      )}
      {feedback && <p className="font-semibold text-red-500">{feedback}</p>}
      <button
        onClick={handleNextWord}
        className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 ${!guessDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!guessDisabled}
      >
        Next Word
      </button>
      <WordSelection ref={wordSelectionRef} onWordSelected={setCurrentWordObj} />
    </div>
  );
}

export default WordScrambleGame;