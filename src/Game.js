function create(){
    game.stage.backgroundColor = '#ffffff';
    background = game.add.tileSprite(0, 0, 402, 626, "background");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    twitter_sprite = game.add.sprite(game.world.width - 375, game.world.height - 96, 'tweet');
    twitter_user_text = game.add.text(game.world.width - 345, game.world.height - 96, '@TweetfairyGame', { font: "bold 22px brain_flowerregular", fill: '#28a9e0' });
    twitter_text = game.add.text(game.world.width - 345, game.world.height - 74, 'Casting spells...', { font: "bold 18px brain_flowerregular", fill: '#000', wordWrap: true, wordWrapWidth: 340 });
    if (adblock == 1){
        adblock_text = game.add.text(game.world.width - 345, game.world.height - 55, 'Your adblocker is messing with Tweetfairy. \n PLease disable it for this page.', { font: "bold 22px brain_flowerregular", fill: '#ff0707', wordWrap: true, wordWrapWidth: 340 });
    } else {
        adblock_text = null;
    }

    score = 0;
    score_text = game.add.text(252, 15, 'score:' + score, { font: "bold 32px brain_flowerregular", fill: '#000' });
    player = game.add.sprite(game.world.width/2, game.world.height - 235, 'fairy');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 0;
    player.body.collideWorldBounds = true;
    player.body.setSize(63, 128, 33, 0);
    player.animations.add('center', [0,1,2], 14, true);
    player.animations.add('right', [5,6,5], 14, false);
    player.animations.add('left', [3,4,3], 14, false);
    player.animations.play('center');

    player.invincible = 0;
    player.current_health = 75;
    player.max_health = 75;
    health_text = game.add.text(52, 15, player.current_health + '/' + player.max_health, { font: "bold 32px brain_flowerregular", fill: '#ff0707' });
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

    healmusic = game.add.audio('healmusic');
    buffmusic = game.add.audio('buffmusic');
    attackmusic = game.add.audio('attackmusic');
    ouchsound = game.add.audio('ouch');
}

function update(){
    background.tilePosition.y += 2;
    score += 1;
    score_text.text = 'score:' + score;

    spells.forEach(function(spell){
        if (spell.inWorld == false){
            spell.kill();
        }
    });

    spells_speed += 4;

    game.physics.arcade.overlap(player, spells, fairyStatus, null, this);

    player.body.velocity.x = 0;

    if (cursors.left.isDown || (game.input.pointer1.x < (game.world.width/2) - 1 && game.input.pointer1.isDown))
    {
        //  Move to the left
        player.body.velocity.x = -200;
        player.animations.play('left');
    }
    else if (cursors.right.isDown || (game.input.pointer1.x > (game.world.width/2) + 1 && game.input.pointer1.isDown))
    {
        //  Move to the right
        player.body.velocity.x = 200;
        player.animations.play('right');
    } else {
        player.animations.play('center');
    }
}

function render(){
    //game.debug.pointer(game.input.pointer1);
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
        } else {
            spawnSpells();
        }
    }
}

function fairyStatus(player, spell){
    if (spell.spell_type == 'heal') {
        healmusic.play();
        player.current_health += game.rnd.integerInRange(3, 15);
        score += 10;
        score_text.text = 'score:' + score;
        if (player.current_health > player.max_health){
            player.current_health = player.max_health;
        }
    } else if (spell.spell_type == 'attack' && player.invincible == 0) {
        attackmusic.play();
        ouchsound.play();
        player.current_health -= game.rnd.integerInRange(5, 20);
        var tween = game.add.tween(player).to( { alpha:0 }, 150, Phaser.Easing.Bounce.InOut, true, 0, 2);
        player.invincible = 1;
        tween.onComplete.add(restoreFairy, this);
        score -= 50;
        score_text.text = 'score:' + score;
        if (player.current_health <= 0){
            player.current_health = 0;
        }
    } else if (spell.spell_type == 'buff') {
        buffmusic.play();
        spells_speed = Math.floor(spells_speed/2);
        score += 15;
        score_text.text = 'score:' + score;
    }
    health_text.text = player.current_health + '/' + player.max_health;
    spell.kill();
    if (player.current_health <= 0){
        music.stop();
        game.state.start("Over");
    }
}

function restoreFairy(){
    player.invincible = 0;
    player.alpha = 1;
}

function spawnTwitter(){
    tweets = null;
    tweets = new Twitter();
}

var game = new Phaser.Game(400, 625, Phaser.AUTO, '');
game.state.add("Boot", { preload: preload, create: createBoot, update: updateBoot } );
game.state.add("Menu", { create: createMenu } );
game.state.add("Tutorial", { create: createTutorial } );
game.state.add("Game",{ create: create, update: update, render: render });
game.state.add("Over", { create: createGameOver } );
game.state.start("Boot");
