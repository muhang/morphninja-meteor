Meteor.publish("producthunt", function () {
    return ProductHunt.find({});
});

Meteor.publish("producthuntcomment", function () {
    return ProductHuntComment.find({});
});

Meteor.startup(function () {
    setInterval(Meteor.bindEnvironment(pollProductHunt), 300000);
    pollProductHunt();
});

var phHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer f671d36ec02f2c36ddaf203dc14bfa927405a41184b03eb87cf00d27f0f2d611",
    "Host": "api.producthunt.com"
};

function storyID(id) {
    return "ph_story_" + id;
}

function pollProductHunt () {
    HTTP.call("GET", "https://api.producthunt.com/v1/posts",
        {
            headers: phHeaders 
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

                fetchComment(post.id);
            }
        }
    );
}

function fetchComment(postID) {
    var url = "https://api.producthunt.com/v1/comments?search[post_id]=" + postID;
    HTTP.call("GET", url, {
        headers: phHeaders
    },
    function (error, result) {
        if (error) {
            console.log("ERROR!", error);
            return;
        }

        for (var i = 0; i < result.data.comments.length; i++) {
            var comment = result.data.comments[i];

            ProductHuntComment.upsert({ _id: commentID(comment.id) }, {
                source: "PH",
                created: new Date(comment.created_at * 1000),
                postID: postID,
                text: comment.body,
                remoteID: comment.id
            });
        }
    });
}

function commentID(id) {
    return 'ph_comment' + id;
}
