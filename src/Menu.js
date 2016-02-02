function createMenu(){
        game.stage.backgroundColor = '#ffffff';
        background = game.add.tileSprite(0, 0, 402, 626, "main");
		var playButton = game.add.button(game.world.width/2,game.world.height - 150,'play', playTutorial,this);
		playButton.anchor.setTo(0.5,0.5);
        music = game.add.audio('music');
        music.loop = true;
        music.play();
	}

function playTutorial(){
		game.state.start("Tutorial");
}
