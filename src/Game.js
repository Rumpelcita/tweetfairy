function create(){
    game.stage.backgroundColor = '#ffffff';
    background = game.add.tileSprite(0, 0, 402, 626, "background");
    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(game.world.width/2, game.world.height - 230, 'fairy');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 0;
    player.body.collideWorldBounds = true;
    player.animations.add('center', [0,1,2], 14, true);
    player.animations.add('right', [5,6,5], 14, false);
    player.animations.add('left', [3,4,3], 14, false);
    player.animations.play('center');

    player.current_health = 75;
    player.max_health = 75;
    health_tooltip = game.add.text(42, 10, 'health:', { font: "bold 32px brain_flowerregular", fill: '#000' });
    health_text = game.add.text(115, 10, player.current_health + '/' + player.max_health, { font: "bold 32px brain_flowerregular", fill: '#ff0707' });
    health_sprite = game.add.sprite(16, 18, 'heart');

    //var tweets = new Twitter();

    spells = game.add.group();
    game.physics.enable(spells);
    spells.max = 9;
    spells.enableBody = true;
    spells_speed = 80;

    timer = game.time.create(false);
    timer.loop(800, spawnSpells, this);
    timer.start();

    cursors = game.input.keyboard.createCursorKeys();
}

function update(){
    background.tilePosition.y += 2;

    spells.forEach(function(spell){
        if (spell.inWorld == false){
            spell.kill();
        }
    });

    spells_speed += 2;

    game.physics.arcade.overlap(player, spells, fairyStatus, null, this);

    player.body.velocity.x = 0;
//    player.animations.play('center');

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -185;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 185;
        player.animations.play('right');
    } else {
        player.animations.play('center');
    }
}

function render(){
}

function menu(){
    game.state.start("Menu");
}

function spawnSpells(){
    var spell_types = {
        1 : 'heal',
        2 : 'attack',
        3 : 'buff',
        4 : 'attack',
        5 : 'attack',
    }
    var heal_spells = {
        1 : 'heal_1',
        2 : 'heal_2',
        3 : 'heal_3',
    }
    var attack_spells = {
        1 : 'attack_1',
        2 : 'attack_2',
        3 : 'attack_3',
    }
    var buff_spells = {
        1 : 'buff_1',
        2 : 'buff_2',
        3 : 'buff_3',
    }

    if (spells.countLiving() < spells.max) {
        var spell_type = game.rnd.integerInRange(1, 5);
        if (spell_types[spell_type] == 'heal'){
            var spell = game.add.sprite(game.rnd.integerInRange(5, 272), game.world.height - 600, heal_spells[game.rnd.integerInRange(1, 3)]);
        } else if (spell_types[spell_type] == 'attack'){
            var spell = game.add.sprite(game.rnd.integerInRange(5, 272), game.world.height - 600, attack_spells[game.rnd.integerInRange(1, 3)]);
        } else if (spell_types[spell_type] == 'buff'){
            var spell = game.add.sprite(game.rnd.integerInRange(5, 272), game.world.height - 600, buff_spells[game.rnd.integerInRange(1, 3)]);
        }
        spell.spell_type = spell_types[spell_type];
        game.physics.enable(spell);
        spell.body.gravity.y = spells_speed;
        spells.add(spell);
    }
}

function fairyStatus(player, spell){
    if (spell.spell_type == 'heal') {
        player.current_health += game.rnd.integerInRange(1, 30);
        if (player.current_health > player.max_health){
            player.current_health = player.max_health;
        }
    } else if (spell.spell_type == 'attack') {
        player.current_health -= game.rnd.integerInRange(1, 30);
        if (player.current_health <= 0){
            player.current_health = 0;
        }
    } else if (spell.spell_type == 'buff') {
            spells_speed = Math.floor(spells_speed/2);
    }
    health_text.text = player.current_health + '/' + player.max_health;
    spell.kill();
    if (player.current_health <= 0){
        game.paused = true;
        console.log('game_end');
    }
}

var game = new Phaser.Game(400, 625, Phaser.AUTO, '');
game.state.add("Menu", { preload: preload, create: createMenu } );
game.state.add("Game",{ create: create, update: update, render: render });
game.state.add("Over", { create: createGameOver } );
game.state.start("Menu");
