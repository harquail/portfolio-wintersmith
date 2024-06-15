---
title: Rainy Day Diary
author: the-wintersmith
date: 2015-09
template: article.jade
tags: design, dev, iOS
---

This iOS protototype was created over a weekend as an application to [Viacom Lab](http://www.viacomlab.com).  The full source is available on [github](https://github.com/harquail/viacom-weather-diary).

---

## Problem Statement

"Design a new diary+weather app that lets you write a short blurb about what happened today and how you felt. Each entry will have weather recorded, too. When you first join the service, you will not have any content, but overtime, it'��ll grow as you use the service.

Design and implement iOS key screens for this mobile app, and please share your prototype, thoughts, styles, and approach. The formats and "deliverables" -- we will leave that up to you to decide, based on the amount of time you can put in the next few days.

(Bonus) Exploit public APIs, phone sensors, and other novel approaches in your design."

---
## Solution

A journaling app that prompts users to write every time it rains. The journal entries contain icons that indicate weather conditions at the time of writing and the overall sentiment contained in the text.

Built using [Parse](https://parse.com/) as the backend, with [SKPolygraph](https://github.com/SandorUK/SKPolygraph) for sentiment analysis, and [CZWeatherKit](https://github.com/comyarzaheri/CZWeatherKit) to fetch weather information.

---
## Prototype

<div class="youtube" id="rnf8SOBpKSo"></div>


---

## Process

<iframe src="https://docs.google.com/document/d/1R4WE40586ynr41iTVG7p6yBNsqi1Ps8kk2ycUj7HQiQ/pub?embedded=true" width="710" height="1500"></iframe>

---

## Source Code

This view controller controls the writing view, updating weather and sentiment icons as the user types.  

<script src="http://gist-it.sudarmuthu.com/github/harquail/viacom-weather-diary/blob/master/ParseStarterProject/WritingViewController.swift?footer=0"></script>


Full source [here](https://github.com/harquail/viacom-weather-diary).

---



