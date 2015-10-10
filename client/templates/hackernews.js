Template.hackernews.helpers({
    posts: function () {
        return Story.find({});
    }
});
