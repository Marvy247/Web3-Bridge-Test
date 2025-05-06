import React, { useState } from 'react';

function GuessInput({ onGuess, disabled }) {
  const [guess, setGuess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setGuess(e.target.value);
    if (e.target.value.trim() === '') {
      setError('Input cannot be empty');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.trim() === '') {
      setError('Input cannot be empty');
      return;
    }
    onGuess(guess.trim());
    setGuess('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={guess}
        onChange={handleChange}
        placeholder="Enter your guess"
        className="border p-2 rounded w-full text-center"
        disabled={disabled}
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={disabled}
      >
        Guess
      </button>
      {error && <p className="text-red-600 mt-1">{error}</p>}
    </form>
  );
}

export default GuessInput;
