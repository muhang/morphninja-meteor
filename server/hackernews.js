//Story = new Mongo.Collection("story");

//_id = storyID()
//source = "HN"
//created = Date it was created
//title = title
//url = url
//comment_count = X
//remoteRank = X
//remoteID = X

Comment = new Mongo.Collection("comment");
//_id = commentID()
//source = "HN"
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

function commentID(storyID, id) {
    return "hn_story_" + storyID + "_comment_" + id;
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
                return;
            }
        }
    );
}

function fetchStory(id, rank) {
    //var existing = Story.find({_id: storyID(id)}).fetch();
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
                remoteID: result.data.id,
                author: result.data.by
            });

            console.log(result.data.kids);

            for (var i = 0; i < result.data.kids.length; i++) {
                fetchComment(result.data.id, result.data.kids[i]);
            }

        }
    );
}

function fetchComment(storyID, id) {
    //var existing = Story.find({_id: storyID(id)}).fetch();
    HTTP.call("GET", "https://hacker-news.firebaseio.com/v0/item/" + id + ".json",
        null,
        function (error, result) {
            if (error) {
                console.log("ERROR!", error);
                return;
            }

            Comment.upsert({_id: commentID(storyID, id)}, {
                source: "HN",
                created: new Date(result.data.time * 1000),
                storyID: storyID,
                text: result.data.text,
                subComments: result.data.kids,
                parent: result.data.parent,
                remoteID: result.data.id
            });

            //console.log(result.data);

>>>>>>> Comments, reduce logging
        }
    );
}

function fetchComments(ids) {
    //https://hacker-news.firebaseio.com/v0/item/ID.json
}
