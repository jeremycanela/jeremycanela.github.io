class Game {
	// Stores the number of misses and an array of all the phrases
	constructor(missed) {
		this.missed = missed,
		this.phrases = ["Rain on Your Parade", "Raining Cats and Dogs", "An Arm and a Leg", "Cut To The Chase", "A Piece of Cake"]
	}

	// Returns a random phrase from `this` class
	getRandomPhrase() {
		const randomPhraseIndex = Math.ceil(Math.random() * this.phrases.length) - 1;
		return this.phrases[randomPhraseIndex];
	}

	// Checks if all the corresponding letters are selected, and returns `true` if so
	checkForWin(phraseClass) {
		if($("#phrase ul .show, #phrase ul .space").length === phraseClass.phrase.length && this.missed < 5) {
			return true;
		} else {
			return false;
		}
	}

	/*	- Displays a `success` message if the player has won, and a `failed` message otherwise
		- Resets `misses` to 0 */
	gameOver(phraseClass, message) {
		$("#overlay").show().find("#game-over-message").text(message);
		this.missed = 0;
		$("#btn__reset").text("Reset game");
	}

	// Increments `misses` every time the player guesses an incorrect letter 
	removeLife() {
		$(`#scoreboard .tries:eq(${this.missed})`).find("img").attr("src", "images/lostHeart.png");
		this.missed += 1;
	}

	/*	- Checks if the selected letter is in the phrase
		- Highlights the corresponding letter on the phrase through the `showMatchedLetter` method
		- Removes lives to incorrect selections
		- Checks for a win or loss and ends the game correspondingly */
	handleInteraction(phraseClass, event) {
		const selectedLetter = $(event).text();
		if(phraseClass.checkLetter(selectedLetter)) {
			phraseClass.showMatchedLetter(event);
		} else if(!$(event).hasClass("wrong")) {
			this.removeLife();
		}

		if(this.checkForWin(phraseClass)) {
			this.gameOver(phrase, "You've Won!");
		} else if(this.missed === 5) {
			this.gameOver(phrase, "You've Lost!");
		}
	}

	// Creates a new instance of the `Phrase` class
	startGame(gameClass) {
		let phrase = new Phrase(gameClass.getRandomPhrase());
		phrase.addPhraseToDisplay();
		return phrase;
	}
}