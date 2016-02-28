function preload() {
    game.load.image('loading', 'assets/img/loading.png');
}

function createBoot(){
/*    // Load the API
    kongregateAPI.loadAPI(onComplete);

    // Callback function
    function onComplete(){
    // Set the global kongregate API object
      kongregate = kongregateAPI.getAPI();
    }
*/

    if (!game.device.desktop){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setMinMax(400, 625, 512, 800);
        game.scale.forceOrientation(false, true);
        game.scale.setResizeCallback(game.gameResized, this);
    }
    game.stage.backgroundColor = '#ffffff';
    loading = game.add.sprite(game.world.width/2, game.world.height/2, 'loading');
    loading.anchor.setTo(0.5, 0.5);
    var loading_tween = game.add.tween(loading).to( { alpha:0 }, 1200, Phaser.Easing.Bounce.InOut, true, 0,-1);
    tweets = new Twitter();
    game.load.image('replay', 'assets/img/replay_btn.png');
    game.load.image('play', 'assets/img/btn_play.png');
    game.load.spritesheet('fairy', 'assets/img/fairy.png', 128, 128);
    game.load.image('heal_1', 'assets/img/items/muffin.png');
    game.load.image('heal_2', 'assets/img/items/caramelos.png');
    game.load.image('heal_3', 'assets/img/items/chupetin.png');
    game.load.image('attack_1', 'assets/img/items/edesur.png');
    game.load.image('attack_2', 'assets/img/items/manaos.png');
    game.load.image('attack_3', 'assets/img/items/pitusas.png');
    game.load.image('buff_1', 'assets/img/items/gatobeja.png');
    game.load.image('buff_2', 'assets/img/items/gatomice.png');
    game.load.image('buff_3', 'assets/img/items/gatotaza.png');
    game.load.image('background', 'assets/img/fondo.png');
    game.load.image('main', 'assets/img/p1.png');
    game.load.image('heart', 'assets/img/corazon.png');
    game.load.image('tweet', 'assets/img/tweeter.png');
    game.load.image('tutorial', 'assets/img/p2.png');
    game.load.image('gameover', 'assets/img/gameover.png');
    game.load.audio('music', 'assets/sound/main.mp3');
    game.load.audio('overmusic', 'assets/sound/gameover.mp3');
    game.load.audio('healmusic', 'assets/sound/heal.mp3');
    game.load.audio('buffmusic', 'assets/sound/buff.mp3');
    game.load.audio('attackmusic', 'assets/sound/attack.mp3');
    game.load.audio('ouch', 'assets/sound/ouch.mp3');
    game.load.start();
}

function updateBoot(){
    if (game.cache.checkImageKey('replay') &&
        game.cache.checkImageKey('play') &&
        game.cache.checkImageKey('fairy') &&
        game.cache.checkImageKey('heal_1') &&
        game.cache.checkImageKey('heal_2') &&
        game.cache.checkImageKey('heal_3') &&
        game.cache.checkImageKey('attack_1') &&
        game.cache.checkImageKey('attack_2') &&
        game.cache.checkImageKey('attack_3') &&
        game.cache.checkImageKey('buff_1') &&
        game.cache.checkImageKey('buff_2') &&
        game.cache.checkImageKey('buff_3') &&
        game.cache.checkImageKey('background') &&
        game.cache.checkImageKey('main') &&
        game.cache.checkImageKey('heart') &&
        game.cache.checkImageKey('tweet') &&
        game.cache.checkImageKey('tutorial') &&
        game.cache.checkImageKey('gameover') &&
        game.cache.isSoundDecoded('music') &&
        game.cache.isSoundDecoded('overmusic') &&
        game.cache.isSoundDecoded('healmusic') &&
        game.cache.isSoundDecoded('buffmusic') &&
        game.cache.isSoundDecoded('attackmusic') &&
        game.cache.isSoundDecoded('ouch') &&
        FontDetect.isFontLoaded('brain_flowerregular') &&
        FontDetect.isFontLoaded('Lato')
        ){
            game.state.start("Menu");
        }
}
