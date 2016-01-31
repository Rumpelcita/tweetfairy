function createTutorial(){
        tweets = new Twitter();
        game.stage.backgroundColor = '#ffffff';
        background = game.add.tileSprite(0, 0, 402, 626, "tutorial");
        start_timer = game.time.create(false);
        start_timer.loop(4200, playTheGame, this);
        start_timer.start();
    }

function playTheGame(){
        game.state.start("Game");
    }
