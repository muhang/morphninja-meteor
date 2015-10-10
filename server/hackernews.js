//poll hacker news
Meteor.startup(function () {
    // code to run on server at startup
    setInterval(Meteor.bindEnvironment(pollHackerNews), 5000);
});

function pollHackerNews() {
    console.log("Starting poll.");

    HTTP.call("GET", "https://hacker-news.firebaseio.com/v0/topstories.json",
        null,
        function (error, result) {
            if (error) {
                console.log("ERROR!", error);
                return;
            }
            console.log(result);
        });
}