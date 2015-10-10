Template.hackernews.helpers({
    posts: function () {
        return Story.find({});
    }
});

Template.hackernews.rendered = function () {
    $("#weight-points").slider();
    $("#weight-comments").slider();
}


Template.hackernews.events({
    //'click p': function (evt, ctx) {
        //var p = evt.currentTarget;
        //p.hide();
    //} 
});
