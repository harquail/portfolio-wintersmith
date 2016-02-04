---
title: Objective-C Samples
author: the-wintersmith
date: 2015-09
template: article.jade
tags: dev, iOS
---

 Three bite-sized iOS applications demonstrating my fluency in Objective-C.   All available on Github.
 
---
## Persistent Counter
<div class="youtube" id="C6ezaJtyUD8"></div>

A simple counter view controller that allows you to add named counters, and increment/decrement their value.  Counters can also be re-ordered and deleted.

I used [Realm](https://realm.io/) to persist counter data, including positions.  Full source available [here](https://github.com/harquail/persistent-counter/).

---

## Nearby Places

<div class="youtube" id="3j6ggXrnIUM"></div>
 
Presents a list of places near the user using the Google Places API.
Shows preview images of places in-line, and loads more results when reaching the end of the list.

Cocoapods used:

- GoogleKit (DanielyBotelho's branch): wrapper for Google Places API; makes it easier to fetch places and place photos 
- SDWebImage: asyncronously load images


Full source available [here](https://github.com/harquail/nearby-places).

---
## Two-Dimensional Table View

<div class="youtube" id="gwgEpGpX0vg"></div>

A grid of UICollectionView cells, each in horizontal scrolling collection view contained within the larger table view.

I created two classes:
* CollectionViewTableViewCell — a tableview cell that contains a collection view
* TwoDTableView — a subclass of UITableView that is its own data source and delegate 

I also created an example project that uses the TwoDTableView to display the top albums in each country on the iTunes store.  Full source available [here](https://github.com/harquail/2d-tableview).

---