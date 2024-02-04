---
title: Genio Fitness
author: the-wintersmith
date: 2016-2
template: article.pug
tags: iOS, dev
---

[Genio](http://geniofit.com) is a fitness and nutritional coaching app based on [Dr. Paul Arciero's](http://www.drpaulsprotocol.com/) research.  I was a freelance iOS developer on this project; the lead developer was [Nick Arciero](http://github.com/narciero).   

---

One of the primary challenges was synchronizing the data with the server, as the app works offline and via the GenioFit website.  We used [Realm](https://realm.io/) to persist data, and built a custom system for synchronizing data with the server when online.  The app also includes a food database, part of which is cached offline, and coaching videos that are downloaded and stored as needed for the next day. 

<div class="youtube" id="d6Vm1XEQBqs"></div><br>

---

