Meteor.publish("reddit", function(){
  return Reddit.find({ source: "Reddit"}, {sort: {created: -1}});
});

Meteor.startup(function () {
    // code to run on server at startup
    setInterval(Meteor.bindEnvironment(pollReddit), 60000);
    pollReddit();
});

// //_id = storyID() || commentID()
// //source = "HN"
// //created = Date it was created
// //title = title
// //url = url
// //comment_count = X
// //remoteRank = X
// //remoteID = X

function storyID(id) {
  return "reddit_story_" + id;
}

function pollReddit(){
    HTTP.call('GET', 'http://reddit.com/hot.json',function(error, result){
      if (error) {
        console.log("Errors", error);
        return;
      } else {
        story = result.data.data.children;
        //console.log(story);
        for (var i=0; i< story.length; i++){
            insertStory(story[i].data);
        }
      }
    });
}


function insertStory(story) {
  id = story.id;
  //console.log(story);
  Reddit.upsert({_id: storyID(id)},
    {
      source: "Reddit",
      created: new Date(story.created * 1000),
      title: story.title,
      url: story.url,
      commentCount: story.num_comments,
      remoteRank: story.score,
      remoteID: story.id
    }
  );
};
