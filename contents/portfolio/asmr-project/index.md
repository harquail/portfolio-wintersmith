---
title: ASMR
author: the-wintersmith
date: 2015-03-01
template: article.pug
tags: writing, dev
---

Autonomous Sensory Meridian Response (ASMR) is a physical sensation characterized by a pleasurable tingling.   For those who experience ASMR, the most common "triggers" include whispering, crisp sounds (such as crinkling paper), tapping, and close personal attention.  

This paper briefly introduces the phenomenon, and then explores the sounds computationally.  I scraped audio files from the [/r/asmr](http://www.reddit.com/r/asmr) reddit community, trained a machine learning classifier to categorize ASMR sounds, and also analyzed their acoustic properties.  

<div class="pdfEmbed" id="asmr_paper"></div>

<br>The code used to analyze the data and build the audio corpus is freely available on github ([here](https://github.com/harquail/subredditTomp3s) and [here](https://github.com/harquail/asmrProjectHelpers)).  This was my final project for a course taught by [Michael Casey](http://bregman.dartmouth.edu/~mcasey). 

---
