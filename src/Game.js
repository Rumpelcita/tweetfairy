function create(){

    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(game.world.width/2, game.world.height - 230, 'fairy');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 0;

    cursors = game.input.keyboard.createCursorKeys();
}

function update(){

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

//        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

//        player.animations.play('right');
    }
}

function render(){

}

function menu(){
    music.stop();
    game.state.start("Menu");
}

var game = new Phaser.Game(360, 625, Phaser.AUTO, '');
game.state.add("Menu", { preload: preload, create: createMenu } );
game.state.add("Game",{ create: create, update: update, render: render });
game.state.start("Menu");
