---
title: README
author: the-wintersmith
date: 2013-04-30
template: home.jade
---
<script src="js/typed.js"></script>

<script>
  $(function(){
   $("#mainName").typed({
        strings: ["Nook Harquail"],
        typeSpeed: 20,
        showCursor: false
      });
      $("#mainWords").typed({
        strings: ["Software Engineer","Architect", "Digital Artist", "Web Developer", "iOS Developer", "Team Lead"],
        typeSpeed: 50,
        backDelay: 1000,
        backSpeed:10,
        loop:true,
        loopCount: false,
         showCursor: false,
        startDelay: 1500
      });
  });
</script>


<div id="mainTypewriter"><div id="mainName"></div><div id="mainWords"></div></div>
<br/><br/>
<div id = contactWrapper>
<a href="mailto:nook@harquail.com"><span class="contactBox"><img src ="/nav-images/e.png"></img> <span class="label">email</span></span></a>
<a href="https://keybase.io/nook"><span class="contactBox"><img src ="/nav-images/k.png"></img> <span class="label">keybase</span></span></a>
<a href="https://github.com/harquail"><span class="contactBox"><img src ="/nav-images/g.png"></img> <span class="label">github</span> </span></a>
<a href="https://www.linkedin.com/in/harquail"><span class="contactBox"><img src ="/nav-images/l.png"></img> <span class="label">linkedIn</span></span>
</div></a>