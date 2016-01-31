function preload() {
    game.load.image('play', 'assets/img/btn_play.png');
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
    game.load.image('main', 'assets/img/p1.png');
    game.load.image('heart', 'assets/img/corazon.png');
    game.load.image('tweet', 'assets/img/tweeter.png');
    game.load.image('tutorial', 'assets/img/p2.png');
    game.load.image('gameover', 'assets/img/gameover.png');
    game.load.audio('music', 'assets/sound/main.mp3');
}

function createMenu(){
        game.stage.backgroundColor = '#ffffff';
        background = game.add.tileSprite(0, 0, 402, 626, "main");
		var playButton = game.add.button(game.world.width/2,game.world.height - 150,'play', playTutorial,this);
		playButton.anchor.setTo(0.5,0.5);
        music = game.add.audio('music');
        // music.loop = true;
        // music.play();
	}

function playTutorial(){
		game.state.start("Tutorial");
}
