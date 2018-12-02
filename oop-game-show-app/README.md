# OOP Game Show App

This project is a browser-based, word guessing game. I've used JavaScript and OOP (Object Oriented Programming) to select a random, hidden phrase, which a player tries to guess, by clicking letters on an onscreen keyboard.

There are two classes 'Phrase' and 'Game' that help organize the code and create phrases.

The code chooses a random phrase, split the phrase into letters, and put those letters onto the gameboard.

Each time the player guesses a letter, the program compares the letter the player has chosen with the random phrase. If the letter is in the phrase, the game board displays the chosen letters on the screen.

A player continues to select letters until they guess they phrase (and win), or make five incorrect guesses (and lose).

If the player completes the phrase before they run out of guesses, a winning screen appears. If the player guesses incorrectly 5 times, a losing screen appears.

A player can guess a letter only once. After they’ve guessed a letter, the letter is disabled on the onscreen keyboard.
