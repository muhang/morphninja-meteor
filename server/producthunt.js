Meteor.publish("producthunt", function () {
    return ProductHunt.find({});
});

Meteor.startup(function () {
    setInterval(Meteor.bindEnvironment(pollProductHunt), 60000);
    pollProductHunt();
});

function storyID(id) {
    return "ph_story_" + id;
}

function pollProductHunt () {
    HTTP.call("GET", "https://api.producthunt.com/v1/posts",
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer f671d36ec02f2c36ddaf203dc14bfa927405a41184b03eb87cf00d27f0f2d611",
                "Host": "api.producthunt.com"
            } 
        },
        function (error, result) {
            if (error) {
                console.log("ERROR!", error);
                return;
            }

            for(var i = 0; i < result.data.posts.length; i++) {
                var post = result.data.posts[i];
                ProductHunt.upsert({_id: storyID(post.id)}, {
                    source: "PH",
                    created: new Date(post.created_at * 1000),         
                    title: post.name,
                    url: post.redirect_url,
                    commentCount: post.comments_count,
                    remoteRank: post.votes_count,
                    remoteID: post.id
                });
            }
        }
    );
}

