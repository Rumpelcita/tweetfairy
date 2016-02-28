function createGameOver(){
    game.stage.backgroundColor = '#ffffff';
    background = game.add.tileSprite(0, 0, 402, 626, "gameover");
    //kongregate.stats.submit("HighScore",score);
    var final_score_text = game.add.text(game.world.width/2, game.world.height/2, 'score:' + score, { font: "bold 42px brain_flowerregular", fill: '#000' });
    final_score_text.anchor.setTo(0.5, 0.5);
    var playButton = game.add.button(game.world.width - 300, game.world.height - 115,'replay', replayTutorial,this);
    overmusic = game.add.audio('overmusic');
    overmusic.loop = true;
    overmusic.play();
    playButton.anchor.setTo(0.5,0.5);
}

function replayTutorial(){
        overmusic.stop();
        music.play();
        game.state.start("Tutorial");
}
