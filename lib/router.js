Story = new Mongo.Collection("story");
Reddit = new Mongo.Collection('reddit_hot')
Comment = new Mongo.Collection("comment");
ProductHunt = new Mongo.Collection("producthunt");

Router.route('/', {
    waitOn: function () {
        return [
            Meteor.subscribe("hackernews"),
            Meteor.subscribe("reddit"),
            Meteor.subscribe("producthunt")
        ];
    }, 
    data: function () {
        return {
            hnPosts: Story.find({}),
            redditPosts: Reddit.find({})
        };
    },
    template: 'home' 
});

Router.route('/all', function () {
});

Router.route('/hackernews', {
    waitOn: function () {
        return [
            Meteor.subscribe("hackernews"),
            Meteor.subscribe("comments")
        ];
    },
    data: function () {
        return {
            stories: Story.find({}),
            comments: Comment.find({})
        };
    }        
});

Router.route('/hackernews/comments/:storyID', {
    waitOn: function () {
        Meteor.subscribe("comments");
    },
    data: function () {
        return Comment.find({ storyID: this.params.storyID });
    }, 
    template: 'hncomments'
});

Router.route('/reddit', {
    waitOn: function () {
        return Meteor.subscribe("reddit");
    },
    data: function () {
        return Reddit.find({});
    }
});

Router.route('/producthunt', {
    waitOn: function () {
        return Meteor.subscribe("producthunt");
    },
    data: function () {
        return ProductHunt.find({});
    }
});

//Router.route('/hackernews', function () {
    //Meteor.subscribe("hackernews");

    //this.render('hackernews');
//});
