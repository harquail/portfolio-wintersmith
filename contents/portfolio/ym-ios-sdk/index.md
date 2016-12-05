---
title: Yieldmo iOS SDK
author: the-wintersmith
date: 2016-6
template: article.jade
tags: iOS, dev
---

Yieldmo provides SDKs that allow developers to integrate Yieldmo's [ad formats](https://adbuilder.yieldmo.com/) into apps and websites.  Our iOS SDK is available as a closed-source static framework on [Github](https://github.com/yieldmo/yieldmo-ios-sdk) and [Cocoapods](https://cocoapods.org/pods/YieldmoSDK).  This product is used by many popular iOS apps — across all platforms (web, iOS, and Android), Yieldmo's ads reach 82% of smartphone users.

For the fourth version of our iOS SDK, we started from scratch to create a better native ads experience.  We re-architected our codebase around an [implementation](https://github.com/nexage/sourcekit-mraid-ios) of the MRAID 2.0 spec for interactive native ads.  This allows us to pass information between our iOS and JS codebases, enabling a very similar user experience across all platforms. 

We provide comprehensive documentation, integration instructions, and an adapter for [DoubleClick for Publishers](https://www.google.com/dfp/).

For this version, we also fully automated our build and integration testing process for the first time.

---
Architecture Diagram:

![](dataflow.png)
---

Created with [Elber Carneiro](https://github.com/elberdev), [Rahul Rao](https://www.linkedin.com/in/rahul-rao-0215511a), and the rest of the team at [Yieldmo](https://yieldmo.com/).  I was the lead iOS developer on this project.

---

