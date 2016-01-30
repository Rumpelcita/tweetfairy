function create(){
    game.stage.backgroundColor = '#ffffff';
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

    player.current_health = 125;
    player.max_health = 125;
    health_text = game.add.text(16, 16, 'health:' + player.current_health + '/' + player.max_health, { fontSize: '32px', fill: '#000' });
    player.current_lives = 3;
    player.max_lives = 3;
    lives_text = game.add.text(275, 16, 'lives:' + player.current_lives, { fontSize: '32px', fill: '#000' });

    spells = game.add.group();
    game.physics.enable(spells);
    spells.max = 9;
    spells.enableBody = true;
    spells_speed = 125;

    timer = game.time.create(false);
    timer.loop(800, spawnSpells, this);
    timer.start();

    cursors = game.input.keyboard.createCursorKeys();
}

function update(){
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
    game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
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
    if (spells.countLiving() < spells.max) {
        var spell_type = game.rnd.integerInRange(1, 5);
        var spell = game.add.sprite(game.rnd.integerInRange(14, 400), game.world.height - 600, spell_types[spell_type]);
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
        if (player.current_lives < player.max_lives){
            player.current_lives += 1;
            lives_text.text = 'lives:' + player.current_lives;
        } else {
            spells_speed = Math.floor(spells_speed/2);
        }
    }
    health_text.text = 'health:' + player.current_health + '/' + player.max_health;
    spell.kill();
    if (player.current_health <= 0){
        player.current_lives -= 1;
        lives_text.text = 'lives:' + player.current_lives;
        if (player.current_lives == 0){
            game.paused = true;
            console.log('game_end');
        } else {
            player.current_health = 125;
            health_text.text = 'health:' + player.current_health + '/' + player.max_health;
        }
    }
}

var game = new Phaser.Game(400, 625, Phaser.AUTO, '');
game.state.add("Menu", { preload: preload, create: createMenu } );
game.state.add("Game",{ create: create, update: update, render: render });
game.state.start("Menu");
