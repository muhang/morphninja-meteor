Story = new Mongo.Collection("story");
Reddit = new Mongo.Collection('reddit_hot')

Router.route('/', function () {
    this.render('home');
});

Router.route('/hackernews', {
    waitOn: function () {
        return Meteor.subscribe("hackernews");
    },
    data: function () {
        return Story.find({});
    }        
});

Router.route('/reddit', {
    waitOn: function () {
        return Meteor.subscribe("reddit");
    },
    data: function () {
        return Reddit.find({});
    }
});


//Router.route('/hackernews', function () {
    //Meteor.subscribe("hackernews");

    //this.render('hackernews');
//});
