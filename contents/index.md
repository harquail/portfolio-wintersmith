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
        strings: ["iOS Developer","Designer", "Digital Artist","Web Developer","Animator","Game Designer","Maker"],
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
Connect:

<div id = contactWrapper>
<span class="contactBox"> [<img src ="/nav-images/e.png"></img> <span class="label">email</span> ](mailto:nook@harquail.com)  </span>
<span class="contactBox"> [<img src ="/nav-images/f.png"></img> <span class="label">facebook</span> ](http://facebook.com/scribam)  </span>
<span class="contactBox"> [<img src ="/nav-images/g.png"></img> <span class="label">github</span> ](http://github.com/harquail)  </span>
<span class="contactBox"> [<img src ="/nav-images/l.png"></img> <span class="label">linkedIn</span> ](http://www.linkedin.com/in/harquail)  </span>
</div>