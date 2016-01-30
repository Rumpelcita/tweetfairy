function create(){

}

function update(){

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
