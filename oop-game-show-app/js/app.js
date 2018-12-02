// Resets the game to its default state
const resetDisplay = (gameClass) => {
	$("#overlay").hide();
	$("#phrase ul").empty();
	$("#scoreboard .tries img").attr("src", "images/liveHeart.png");
	$("#qwerty .key").removeClass("chosen wrong");
}

// The letter will get with the `chosen` class added if it is right and the `wrong` class added if it is incorrect
const markButton = (phraseClass, gameClass, event) => {
	const selectedLetter = $(event).text();
	gameClass.handleInteraction(phraseClass, event);
	if(phraseClass.checkLetter(selectedLetter)) {
		$(event).addClass("chosen");
	} else if(!$(event).hasClass("wrong")) {
		$(event).addClass("wrong");
	}
}

// Resets the game after the `btn__reset` button is clicked
$(".start #btn__reset").click((event) => {
	const game = new Game(0);
	resetDisplay(game);
	phrase = game.startGame(game);

	$(window).keypress((event) => {
		const keyPressed = String.fromCharCode(event.keyCode);
		markButton(phrase, game, `#qwerty .key:contains(${keyPressed})`);
	});

	$("#qwerty .key").click((event) => {
		markButton(phrase, game, event.target);
	});
});