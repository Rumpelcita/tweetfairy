function Twitter() {
    adblock = 0;
    spell_count = 0;
    spell_deck = {
        attacks : [],
        heals : [],
        buffs : [],
    }
    var cb = new Codebird;
    cb.setConsumerKey(consumer_key, consumer_key_thingie);
    cb.setToken(token, token_thingie);
    cb.__call(
    "oauth2_token",
    {},
    function (reply, err) {
        var bearer_token;
        if (err) {
            console.log("error response or timeout exceeded" + err.error);
        }
        if (reply) {
            bearer_token = reply.access_token;
        }
    }
    );
    var params = {
    q: "#tweetfairygame"
    };
    cb.__call(
        "search_tweets",
        params,
        function (reply) {
            replies = reply.statuses;
            if (replies != 'undefined' && replies.length != -1){
                adblock = 0;
                for (var i = 0; i < replies.length; i++){
                    var tweet = replies[i].text;
                    var twitter_user = replies[i].user.screen_name;
                    var search = tweet.toLowerCase();

                    if (search.search("#tfatk") != -1){
                        spell_deck.attacks.push([twitter_user, tweet]);
                        spell_count ++;
                    }

                    if (search.search("#tfheal") != -1){
                        spell_deck.heals.push([twitter_user, tweet]);
                        spell_count ++;
                    }

                    if (search.search("#tfbuff") != -1){
                        spell_deck.buffs.push([twitter_user, tweet]);
                        spell_count ++;
                    }
                }
            } else {
                adblock = 1;
            }
        }
    );
}
