function Twitter() {
    var cb = new Codebird;
    cb.setConsumerKey("fna55bUkYfhEY9WAEh6JTy9yF", "B7i01p6fqMfHnDX5Nm7tROUnQRnTKCdNglK1Yx54f03afvIBFx");
    cb.setToken("4865898394-DEDy93K13G7jF5GywQBrZ9pU0tPJ5uTPZKL1cc6", "mF1Yw4CKuCx0egwhLSSL6nSd8ZTteeCWIIvxGjpl1WYgH");
    cb.__call(
        "statuses_mentionsTimeline",
        {},
        function (reply) {
            console.log(reply);
        }
    );
}
