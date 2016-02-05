---
title: Guardian Slack
author: the-wintersmith
date: 2015-11
template: article.jade
tags: dev, web
---

A [Slack](https://slack.com/) integration (slash command) for [The Guardian](http://www.theguardian.com/)'s content API.  Remembers recently-posted articles, so it does not repeat itself.

 <div class="youtube" id="bBdAoHpn1MU"></div>
 
---

## Usage

/gdn [search term] [optionally, number of articles]

Run using node.js — requires setting GUARDIAN_KEY to a [Guardian API key](http://open-platform.theguardian.com/access/).  Information on adding commands to Slack [here](https://api.slack.com/slash-commands).

Helpful button to deploy:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/harquail/slack-gdn)

## Limitations

Currently limited to posting 5 articles at a time (larger requests will send 5), because Slack integrations can only post 5 times per invocation.

---
