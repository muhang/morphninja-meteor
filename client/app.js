Ranker = class Ranker {
    static getRank(story) {
        var now = new Date();

        var c = story.commentCount ? story.commentCount : 0;
        var p = story.remoteRank;
        var t = story.created.getTime();
        var timeDelta = ( now.getTime() - t ) / 1000;  
        timeDelta = timeDelta < 0 ? 1 : timeDelta;

        var pw = ( Session.get("pointWeight") * p ) / 100;
        var cw = ( Session.get("commentWeight") * c ) / 100;
        var g = Session.get("gravity");

        var numerator = ( pw * p-1 ) + ( cw * c );
        var denominator =  ( Math.pow(timeDelta+2, g) );

        return ( numerator / denominator );
    }
    static rankStories(stories) {
        var ranked = [];
        var self = this;
        stories.forEach(function (story) {
            var rank = self.getRank(story);
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
}

Meteor.subscribe("hackernews");
Meteor.subscribe("reddit");

Meteor.startup(function () {
    Session.set("pointWeight", 100);
    Session.set("commentWeight", 0);
    Session.set("gravity", 1.8);
});
