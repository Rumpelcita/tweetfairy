function preload() {
    game.load.image('play', 'assets/img/play.png');
    game.load.spritesheet('fairy', 'assets/img/fairy.png', 128, 128);
    game.load.image('heal_1', 'assets/img/items/muffin.png');
    game.load.image('heal_2', 'assets/img/items/caramelos.png');
    game.load.image('heal_3', 'assets/img/items/chupetin.png');
    game.load.image('attack_1', 'assets/img/items/edesur.png');
    game.load.image('attack_2', 'assets/img/items/manaos.png');
    game.load.image('attack_3', 'assets/img/items/pitusas.png');
    game.load.image('buff_1', 'assets/img/items/gatobeja.png');
    game.load.image('buff_2', 'assets/img/items/gatomice.png');
    game.load.image('buff_3', 'assets/img/items/gatotaza.png');
    game.load.image('background', 'assets/img/fondo.png');
    game.load.image('heart', 'assets/img/corazon.png');
    game.load.audio('music', 'assets/sound/main.mp3');
}

function createMenu(){
        var style = { font: "bold 32px brain_flowerregular", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        var styleInfo = { font: "bold 16px brain_flowerregular", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        var gameTitle = game.add.text(175, 160, "Tweetfairy", style);
		gameTitle.anchor.setTo(0.5,0.5);
        var gameInfo = game.add.text(175, 275, "Use the arrows to move", styleInfo);
        gameInfo.anchor.setTo(0.5,0.5);
		var playButton = game.add.button(160,320,'play', playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
        music = game.add.audio('music');
        // music.loop = true;
        // music.play();
	}

function playTheGame(){
		game.state.start("Game");
	}
