
Meteor.publish("all", function () {
    return Story.find({sort: {created : -1}});
});
