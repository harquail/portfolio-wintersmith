---
title: Etsy Upgrade Prompt
author: the-wintersmith
date: 2022-05-01
template: article.pug
tags: web, dev
---

Before 2021, [Etsy](https://www.etsy.com/) didn't have any official policies for how long app versions were supported. Because any previous app version could hit the API, we could only make backwards-compatible changes and tech debt accumulated over time. Each time we needed to make a breaking change, product managers needed to make a decision about the tradeoffs, and users on old app version could have broken experiences as a result. 

---

I identified an opportunity to improve developer experience for all web engineers at Etsy that support the apps. I wrote an proposal to force users on old app versions to upgrade and develop policies for how long we support old app versions. I worked with engineering leadership to prioritize and staff the project.

For the first time, we introduced a hard cutoff for app version support. I worked on the idea from concept to implementation, solving thorny problems related to old app code, and working with stakeholders (product, analytics, QA) to choose cutoffs in a data-driven way. 

This project removed a huge cognitive overhead for product development by allowing admins to make breaking changes easier and ship code more confidently. It also opens up hundreds of product experiments (A/B tests) to be fully cleaned up for the first time. It wasn't a huge change in terms of the implementation, but has a major impact on our ability to reduce tech debt, affecting all engineers who write code used in the apps (all app teams as well as many web teams). This change was conversion/GMS neutral, which indicates that users either upgraded to the latest app version or shifted to mobile web. Several engineers have mentioned that this is a major improvement that likely wouldn't have happened without my proposal.

---

<div class="pdfEmbed" id="Orange_Doc_Limited lifespan_for_BOE_versions"></div>

I removed some details from this proposal for this portfolio.

---
