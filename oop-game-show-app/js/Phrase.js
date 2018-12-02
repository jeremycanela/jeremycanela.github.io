class Phrase {
	// Stores the displayed phrase
	constructor(phrase) {
		this.phrase = phrase.toLowerCase()
	}

	// Implements each individual letter and space characters
	addPhraseToDisplay() {
		const phraseLength = this.phrase.length;

		for(let i = 0; i < phraseLength; i++) {
			if(this.phrase[i] !== " ") { 
				$("#phrase ul").append(`<li class="hide letter ${this.phrase[i].toLowerCase()}">${this.phrase[i].toLowerCase()}</li>`);
			} else {
				$("#phrase ul").append(`<li class="hide space"></li>`);
			}
		}
	}

	// Checks if the letter provided is in the phrase, and returns true if so
	checkLetter(letter) {
		for(let i = 0; i < this.phrase.length; i++) {
			if(letter === this.phrase[i]) {
				return true;
			}
		}
	}

	// Highlights the corresponding letter on the phrase
	showMatchedLetter(event) {
		const selectedLetter = $(event).text();
		for(let i = 0; i < $("#phrase ul li").length; i++) {
			if($(`#phrase ul li:eq(${i})`).text() === selectedLetter) {
				$(`#phrase ul li:eq(${i})`).removeClass("hide").addClass("show");
			}
		}
	}
}