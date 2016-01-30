function create(){

    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(game.world.width/2, game.world.height - 230, 'fairy');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 0;
    player.body.collideWorldBounds = true;

    player.current_health = 125;
    player.max_health = 125;
    health_text = game.add.text(16, 16, 'health:' + player.current_health + '/' + player.max_health, { fontSize: '32px', fill: '#fff' });

    spells = game.add.group();
    game.physics.enable(spells);
    spells.max = 9;
    spells.enableBody = true;

    timer = game.time.create(false);
    timer.loop(1500, spawnSpells, this);
    timer.start();

    cursors = game.input.keyboard.createCursorKeys();
}

function update(){
    spells.forEach(function(spell){
        if (spell.inWorld == false){
            spell.kill();
        }
    });

    if (timer.delay > 100){
        timer.delay -= 5;
    }

    console.log(timer);

    game.physics.arcade.overlap(player, spells, fairyStatus, null, this);

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
    game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
}

function menu(){
    game.state.start("Menu");
}

function spawnSpells(){
    var spell_types = {
        1 : 'heal',
        2 : 'attack',
        3 : 'buff'
    }
    if (spells.countLiving() < spells.max) {
        var spell_type = Math.floor((Math.random() * 3) + 1);
        var spell = game.add.sprite(Math.floor((Math.random() * 400) + 15), game.world.height - 600, spell_types[spell_type]);
        spell.spell_type = spell_types[spell_type];
        game.physics.enable(spell);
        spell.body.gravity.y = 125;
        spells.add(spell);
    }
}

function fairyStatus(player, spell){
    if (spell.spell_type == 'heal' && player.current_health < player.max_health) {
        player.current_health += Math.floor((Math.random() * 30) + 1);
    } else if (spell.spell_type == 'attack') {
        player.current_health -= Math.floor((Math.random() * 30) + 1);
    } else if (spell.spell_type == 'buff' && player.current_health < player.max_health) {
        player.current_health += Math.floor((Math.random() * 30) + 1);
    }
    health_text.text = 'health:' + player.current_health + '/' + player.max_health;
    spell.kill();
    if (player.current_health <= 0){
        game.paused = true;
        console.log('game_end');
    }
}

var game = new Phaser.Game(400, 625, Phaser.AUTO, '');
game.state.add("Menu", { preload: preload, create: createMenu } );
game.state.add("Game",{ create: create, update: update, render: render });
game.state.start("Menu");
