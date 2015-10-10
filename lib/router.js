Router.route('/', function () {
    this.render('home');
});

Router.route('/hackernews', function () {
    this.render('hackernews');
});
