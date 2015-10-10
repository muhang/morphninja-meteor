Story = new Mongo.Collection("story");

//_id = storyID() || commentID()
//source = "HN"
//created = Date it was created
//title = title
//url = url
//comment_count = X
//remoteRank = X
//remoteID = X

Meteor.publish("hackernews", function () {
    return Story.find({ source: "HN" }, {sort: {created : -1}});
});

//poll hacker news
Meteor.startup(function () {
    // code to run on server at startup
    setInterval(Meteor.bindEnvironment(pollHackerNews), 60000);
    pollHackerNews();
});

function storyID(id) {
    return "hn_story_" + id;
}

function commentID(id) {
    return "hn_comment_" + id;
}

function pollHackerNews() {
    console.log("Starting poll.");
    HTTP.call("GET", "https://hacker-news.firebaseio.com/v0/topstories.json",
        null,
        function (error, result) {
            if (error) {
                console.log("ERROR!", error);
                return;
            }
            for (var i = 0; i < result.data.length; i++) {
                fetchStory(result.data[i], i);
            }
        }
    );
}

function fetchStory(id, rank) {
    var existing = Story.find({_id: storyID(id)}).fetch();
    HTTP.call("GET", "https://hacker-news.firebaseio.com/v0/item/" + id + ".json",
        null,
        function (error, result) {
            if (error) {
                console.log("ERROR!", error);
                return;
            }
            Story.upsert({_id: storyID(id)}, {
                source: "HN",
                created: new Date(result.data.time * 1000),
                title: result.data.title,
                url: result.data.url,
                commentCount: result.data.descendants,
                remoteRank: rank,
                remoteID: result.data.id
            })
        }
    );
}

function fetchComments(type, id) {
    //https://hacker-news.firebaseio.com/v0/item/ID.json
}
