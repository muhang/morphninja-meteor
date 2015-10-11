Meteor.subscribe("hackernews");
Meteor.subscribe("reddit");

Meteor.startup(function () {
    Session.set("pointWeight", 100);
    Session.set("commentWeight", 0);
    Session.set("gravity", 1.8);
});
