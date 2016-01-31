function create(){
    loading = 1;
    game.stage.backgroundColor = '#ffffff';
    background = game.add.tileSprite(0, 0, 402, 626, "background");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    twitter_sprite = game.add.sprite(game.world.width - 375, game.world.height - 75, 'tweet');
    twitter_user_text = game.add.text(game.world.width - 345, game.world.height - 80, '@TweetfairyGame', { font: "bold 22px brain_flowerregular", fill: '#28a9e0' });
    twitter_text = game.add.text(game.world.width - 345, game.world.height - 60, 'Casting spells...', { font: "bold 22px brain_flowerregular", fill: '#000', wordWrap: true, wordWrapWidth: 340 });

    score = 0;
    score_text = game.add.text(252, 15, 'score:' + score, { font: "bold 32px brain_flowerregular", fill: '#000' });
    player = game.add.sprite(game.world.width/2, game.world.height - 230, 'fairy');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 0;
    player.body.collideWorldBounds = true;
    player.body.setSize(63, 128, 33, 0);
    player.animations.add('center', [0,1,2], 14, true);
    player.animations.add('right', [5,6,5], 14, false);
    player.animations.add('left', [3,4,3], 14, false);
    player.animations.play('center');

    player.current_health = 75;
    player.max_health = 75;
    health_tooltip = game.add.text(52, 15, 'health:', { font: "bold 32px brain_flowerregular", fill: '#000' });
    health_text = game.add.text(115, 15, player.current_health + '/' + player.max_health, { font: "bold 32px brain_flowerregular", fill: '#ff0707' });
    health_sprite = game.add.sprite(18, 18, 'heart');

    spells = game.add.group();
    game.physics.enable(spells);

    spells.max = 9;
    spells.enableBody = true;
    spells_speed = 80;

    timer = game.time.create(false);
    timer.loop(800, spawnSpells, this);
    timer.start();

    timer_twitter = game.time.create(false);
    timer_twitter.loop(3500, spawnTwitter, this);
    timer_twitter.start();

    cursors = game.input.keyboard.createCursorKeys();
}

function update(){
    background.tilePosition.y += 2;
    if (loading == 0){
        score += 1;
        score_text.text = 'score:' + score;
    }
    spells.forEach(function(spell){
        if (spell.inWorld == false){
            spell.kill();
        }
    });

    spells_speed += 4;

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
    // game.debug.body(player);
    // spells.forEach(function(spell){
    //     game.debug.body(spell);
    // });
}

function menu(){
    game.state.start("Menu");
}

function spawnSpells(){
    var spell_types = {
        1 : 'heal',
        2 : 'attack',
        3 : 'buff',
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

    if (spells.countLiving() < spells.max && spell_count > 0) {
        spawn_y = game.world.height - 585;
        spawn_x = game.rnd.integerInRange(5, 300);
        var spell_type = game.rnd.integerInRange(1, 3);
        console.log(spell_deck.heals);
        if (spell_types[spell_type] == 'heal' && spell_deck.heals.length > 0){
            var spell = game.add.sprite(spawn_x, spawn_y, heal_spells[game.rnd.integerInRange(1, 3)]);
            var spell_text = game.add.text(0, 0, '#healtf', { font: "bold 18px Lato", fill: '#b6e093' });
            var deck_range = game.rnd.integerInRange(0, spell_deck.heals.length -1);
            var owner_text = game.add.text(0, 0, '@' + spell_deck.heals[deck_range][0], { font: "bold 18px Lato", fill: '#b6e093' });
            twitter_user_text.text = '@' + spell_deck.heals[deck_range][0];
            twitter_text.text = spell_deck.heals[deck_range][1];
        } else if (spell_types[spell_type] == 'attack'  && spell_deck.attacks.length > 0){
            var spell = game.add.sprite(spawn_x, spawn_y, attack_spells[game.rnd.integerInRange(1, 3)]);
            var spell_text = game.add.text(0, 0, '#atktf', { font: "bold 18px Lato", fill: '#e45b4a' });
            var deck_range = game.rnd.integerInRange(0, spell_deck.attacks.length - 1);
            var owner_text = game.add.text(0, 0, '@' + spell_deck.attacks[deck_range][0], { font: "bold 18px Lato", fill: '#e45b4a' });
            twitter_user_text.text = '@' + spell_deck.attacks[deck_range][0];
            twitter_text.text = spell_deck.attacks[deck_range][1];
        } else if (spell_types[spell_type] == 'buff' && spell_deck.buffs.length > 0){
            var spell = game.add.sprite(spawn_x, spawn_y, buff_spells[game.rnd.integerInRange(1, 3)]);
            var spell_text = game.add.text(0, 0, '#bufftf', { font: "bold 18px Lato", fill: '#b3d7d7' });
            var deck_range = game.rnd.integerInRange(0, spell_deck.buffs.length - 1);
            var owner_text = game.add.text(0, 0, '@' + spell_deck.buffs[deck_range][0], { font: "bold 18px Lato", fill: '#b3d7d7' });
            twitter_user_text.text = '@' + spell_deck.buffs[deck_range][0];
            twitter_text.text = spell_deck.buffs[deck_range][1];
        }
        if (spell && spell_text){
            spell_text.anchor.setTo(0, 0.5);
            owner_text.anchor.setTo(0, 1.2);
            spell.addChild(spell_text);
            spell.addChild(owner_text);
            spell.spell_type = spell_types[spell_type];
            game.physics.enable(spell);
            spell.body.setSize(90, 100, 5, 0);
            spell.body.gravity.y = spells_speed;
            spells.add(spell);
            loading = 0;
        } else {
            spawnSpells();
            loading = 1;
            twitter_user_text.text = '@TweetfairyGame';
            twitter_text.text = 'Casting spells...';
        }
    }
}

function fairyStatus(player, spell){
    if (spell.spell_type == 'heal') {
        player.current_health += game.rnd.integerInRange(3, 15);
        score += 10;
        score_text.text = 'score:' + score;
        if (player.current_health > player.max_health){
            player.current_health = player.max_health;
        }
    } else if (spell.spell_type == 'attack') {
        player.current_health -= game.rnd.integerInRange(5, 20);
        score -= 50;
        score_text.text = 'score:' + score;
        if (player.current_health <= 0){
            player.current_health = 0;
        }
    } else if (spell.spell_type == 'buff') {
        spells_speed = Math.floor(spells_speed/2);
        score += 15;
        score_text.text = 'score:' + score;
    }
    health_text.text = player.current_health + '/' + player.max_health;
    spell.kill();
    if (player.current_health <= 0){
        game.state.start("Over");
    }
}

function spawnTwitter(){
    tweets = null;
    tweets = new Twitter();
}

var game = new Phaser.Game(400, 625, Phaser.AUTO, '');
game.state.add("Menu", { preload: preload, create: createMenu } );
game.state.add("Tutorial", { create: createTutorial } );
game.state.add("Game",{ create: create, update: update, render: render });
game.state.add("Over", { create: createGameOver } );
game.state.start("Menu");
