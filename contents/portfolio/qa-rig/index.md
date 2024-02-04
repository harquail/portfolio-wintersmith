---
title: QA Rig (Yieldmo)
author: the-wintersmith
date: 2019-04-01
template: article.pug
tags: web, dev
---

Although it started as a simple tool to generate a test page, this grew into a full tool for developing and testing our ad products. The QA infrastructure can change the main components of our front-end product (for example, use a locally-built ad server or ad template).

- 1) The main page generates a page with url parameters from available options
- 2) When our Javascript loads, it reads these parameters to override behavior
- 3) Users can add mock server responses, which are stored in DynamoDB

---

https://qa.yieldmo.com/ (view in mobile emulation mode or on a phone).

This infrastructure allows us to easily QA and debug our code on publisher pages without using a proxy.  It was largely built during 'hack days', in the time after we had accomplished the product goals for a [sprint](https://www.atlassian.com/agile/scrum/sprints).

---
Features:

<div class="pdfEmbed" id="qa_rig"></div>

---
