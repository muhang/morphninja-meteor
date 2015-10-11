Template.hackernews.helpers({
    posts: function () {
        var stories = Story.find({});
        return Ranker.rankStories(stories);
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