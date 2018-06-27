Morph Ninja
===========

# Summary

A simple application to customize how posts are ranked on the front page of popular forum sites.

The weighting algorithim is defined as:

```
/*
* R = rank
* p = points
* c = comments
* t = time since post
* G = gravity
* Mp = points multiplier
* Mc = comments multiplier
*/

R = ( (Mp * p) + (Mc * c) ) / ( (t - 2) ^ G )
```

# Installation

* Clone repo: `git clone https://github.com/muhang/morphninja-meteor`
* Install Meteor: `curl https://install.meteor.com/ | sh`
* Run: `meteor` 
* Application will be running on port 3000 (http://localhost:3000)

_NOTE_: It may take a minute to load when the application is started for the first time, as the data is being populated.

# Usage

Use sliders on the bottom of the page to control whether stories are sorted by number of upvotes or number of comments. The gravity slider changes the importance of time elapsed in the sorting algorithm.
