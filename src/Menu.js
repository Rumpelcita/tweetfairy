function preload() {
    game.load.image('play', 'assets/img/play.png');
    game.load.image('fairy', 'assets/img/pc.png');
    game.load.audio('music', 'assets/sound/main.mp3');
}

function createMenu(){
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        var styleInfo = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        var gameTitle = game.add.text(175, 160, "Tweetfairy", style);
		gameTitle.anchor.setTo(0.5,0.5);
        var gameInfo = game.add.text(175, 275, "Use the arrows to move", styleInfo);
        gameInfo.anchor.setTo(0.5,0.5);
		var playButton = game.add.button(160,320,'play', playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
        music = game.add.audio('music');
        music.loop = true;
        music.play();
	}

function playTheGame(){
		game.state.start("Game");
	}
