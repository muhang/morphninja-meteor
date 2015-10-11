Template.hackernews.helpers({
    posts: function () {
        var stories = Story.find({});

        function rankStories(stories) {
            var ranked = [];
            stories.forEach(function (story) {
                var rank = getRank(story);
                ranked.push({ rank: rank, story: story });
            });

            ranked.sort(function (a, b) { 
                if (a.rank < b.rank) {
                    return 1;
                }
                if (a.rank > b.rank) {
                    return -1;
                }
                return 0;
            });

            return ranked;
        }

        function getRank(story) {
            var now = new Date();

            var c = story.commentCount ? story.commentCount : 0;
            var p = story.remoteRank;
            var t = story.created.getTime();
            var timeDelta = ( now.getTime() - t ) / 1000;  

            var pw = ( Session.get("pointWeight") * p ) / 100;
            var cw = ( Session.get("commentWeight") * c ) / 100;
            var g = Session.get("gravity");

            var numerator = ( pw * p ) + ( cw * c );
            var denominator =  ( Math.pow(timeDelta+2, g) );

            return ( numerator / denominator ) * 1000;

            //return ( ( ( Session.get("pointWeight") * p ) + ( Session.get("commentWeight") * c ) ) / Math.pow( timeDelta + 2 ), Session.get("gravity") );
        }

        return rankStories(stories);
    },
    cw: function () { return Session.get("commentWeight"); },
    pw: function () { return Session.get("pointWeight"); },
});

Template.hackernews.rendered = function () {
    $("#weighting").slider({
        min: 0,
        max: 100,
        step: 1,
        value: Session.get("pointWeight") - Session.get("commentWeight")
    });
    $("#gravity").slider({
        min: 1.5,
        max: 2.5,
        step: 0.1,
        value: Session.get("gravity")
    });
}

Template.hackernews.events({
    'slideStop #weighting': function (evt) {
        Session.set("pointWeight", evt.target.value);
        Session.set("commentWeight", 100 - evt.target.value);
    },
    'slideStop #gravity': function (evt) {
        Session.set("gravity", evt.target.value);
    }
});
