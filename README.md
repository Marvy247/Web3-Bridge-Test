# Word Scramble Game

## Running the Game
1. Clone the repository.
2. Install dependencies using `npm install` or `yarn install`.
3. Start the development server with `npm run dev` or `yarn dev`.
4. Open your browser and navigate to `http://localhost:3000` to play the game.

## Description
This is a Word Scramble Game built with React. The objective of the game is to unscramble the letters of a scrambled word and guess the correct word before time runs out. The game provides hints and tracks your score as you play.

## How to Play
1. When the game starts, a scrambled word will be displayed.
2. Type your guess into the input box and submit it.
3. If your guess is correct, you earn 10 points and can proceed to the next word.
4. If your guess is incorrect, you can try again until the timer runs out.
5. You can use hints to help you guess the word, but hints are limited to 3 uses per game.
6. The game includes a timer that counts down from 30 seconds for each word. If the timer reaches zero, you must move on to the next word.
7. The difficulty of the words increases as you score more points, introducing longer and less common words.

## Optional Features
- **Score Tracking:** You earn 10 points for each correct guess. Your current score is displayed on the screen.
- **Increasing Difficulty:** Every 5 correct guesses, the difficulty level increases, presenting longer and less common words.
- **Timer Challenge:** Each word has a 30-second timer to encourage quick thinking and guessing.

## License
This project is open source and available under the MIT License.
