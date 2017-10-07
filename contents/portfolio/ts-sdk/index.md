---
title: Typescript SDK (Yieldmo)
author: the-wintersmith
date: 2017-09-01
template: article.jade
tags: web, dev
---

Faced with overwhelming technical debt, Yieldmo decided to completely re-write our existing Javascript codebase in Typescript.  I was the team lead for this project, responsible for estimation, architecture, and development.  After 6 months of effort, we were able to release the new code across all of our publishers with no major incidents.

As a result of the new code, we were able to achieve a 10% reduction in time to first request to our ad server (resulting in significant revenue increases).  Webpack and other build-system improvements reduce build times by 81% below our legacy codebase.  Roughly 90% of lines are covered by unit tests, and clear modules and documentation drastically reduce effort for fixing bugs and adding features.

---

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vR6A7w6YibucF6TCueSIxoSztr5PBpacuKg2NAJc-pyxtwgPXNFs-n1c0I1S2DjmZrLPy2R6Iag4TP1/embed?start=false&loop=false&delayms=2000" frameborder="0" width="700" height="500" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

---

Created with [Elber Carneiro](https://github.com/elberdev), [Jasmine Noack](http:/jasminenoack.com), and the rest of the Formats team at [Yieldmo](https://www.yieldmo.com).  [Rahul Rao](https://www.linkedin.com/in/rahul-rao-0215511a) and the product team were invaluable for convincing the business of the project's value.

---