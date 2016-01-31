function createGameOver(){
    game.stage.backgroundColor = '#ffffff';
    background = game.add.tileSprite(0, 0, 402, 626, "gameover");
    var final_score_text = game.add.text(game.world.width - 300, game.world.height - 120, 'score:', { font: "bold 32px brain_flowerregular", fill: '#000' });
    var final_score = game.add.text(game.world.width - 300, game.world.height - 110, score, { font: "bold 32px brain_flowerregular", fill: '#000' });
    var playButton = game.add.button(game.world.width - 300, game.world.height - 95,'play', playTutorial,this);
    playButton.anchor.setTo(0.5,0.5);
}

function playTutorial(){
		game.state.start("Tutorial");
}
