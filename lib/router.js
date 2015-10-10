Story = new Mongo.Collection("story");

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

//Router.route('/hackernews', function () {
    //Meteor.subscribe("hackernews");

    //this.render('hackernews');
//});
