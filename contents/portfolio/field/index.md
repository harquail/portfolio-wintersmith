---
title: Field
author: the-wintersmith
date: 2015-10
template: article.pug
tags: design, dev, iOS
---

Field is a prototype iOS app that helps users create looping, musical videos through a remixing algorithm that layers sounds in rhythmic patterns. Created with [Andrew Alburn](https://www.linkedin.com/pub/andrew-alburn/54/157/a9) and [Jadie Oh](http://www.jadieoh.com/) at [Viacom Lab](http://www.viacomlab.com).


---

## Problem Statement
How might we help amateurs create vine-length music videos?

---

## UX Design

Mockups of potential interfaces for Field.

<div class="youtube" id="q71sacBK4tw"></div> 

<div class="youtube" id="bA5DT0MCVYQ"></div>

---

## Prototype

Prototype iOS app created through ~3 weeks of iteration in Swift.

<div class="youtube" id="ahCct0sYLa4"></div> 

---

## Algorithm

Capture audio signal:
![](audio2-01.png)
Filter signal:
![](audio2-02.png)
Detect peaks:
![](audio2-03.png)
Find loud and quiet regions:
![](audio2-04.png)
Combine peaks + loud regions to find sample regions: 
![](audio2-05.png)

Randomly sample from within sample regions, choosing short clips that are either within the loud regions or aligned with peaks.

Finally, layer the samples in beat patterns, randomly selecting from a set of manually-curated rhythms designed to combine musically:  	
![](field-grid.png)

Play layered audio and video.

---

## Creations

Videos created with Field (click bottom right for sound).

<div class="vine" id="iBEgV6hxzt7"></div>

<div class="vine" id="iBE6xqJiKm3"></div>

<div class="vine" id="iBEDud3JjLY"></div>

<div class="vine" id="iBEwiF1IOmI"></div>

</br>
See more fields [here](https://vine.co/u/1278073875980595200).

<script src="/js/vineEmbed.js"></script> 
<script src="https://platform.vine.co/static/scripts/embed.js"></script> 

---
