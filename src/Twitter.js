function Twitter() {
    spell_count = 0;
    spell_deck = {
        attacks : [],
        heals : [],
        buffs : [],
    }
    var cb = new Codebird;
    cb.setConsumerKey("fna55bUkYfhEY9WAEh6JTy9yF", "B7i01p6fqMfHnDX5Nm7tROUnQRnTKCdNglK1Yx54f03afvIBFx");
    cb.setToken("4865898394-DEDy93K13G7jF5GywQBrZ9pU0tPJ5uTPZKL1cc6", "mF1Yw4CKuCx0egwhLSSL6nSd8ZTteeCWIIvxGjpl1WYgH");
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
    q: "TweetfairyGame"
    };
    cb.__call(
        "search_tweets",
        params,
        function (reply) {
            replies = reply.statuses;
            if (replies.length != -1){
                for (var i = 0; i < replies.length; i++){
                    var tweet = replies[i].text;
                    var twitter_user = replies[i].user.screen_name;

                    if (tweet.search("#attacktweetfairy") != -1){
                        spell_deck.attacks.push([twitter_user, tweet]);
                        spell_count ++;
                    } else if (tweet.search("#healtweetfairy") != -1){
                        spell_deck.heals.push([twitter_user, tweet]);
                        spell_count ++;
                    } else if (tweet.search("#bufftweetfairy") != -1){
                        spell_deck.buffs.push([twitter_user, tweet]);
                        spell_count ++;
                    }
                }
            }
        }
    );
}
