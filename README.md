Morph Ninja
===========

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
