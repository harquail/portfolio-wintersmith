// Find all the YouTube video embedded on a page
var videos = document.getElementsByClassName("youtube");

for (var i = 0; i < videos.length; i++) {
  var youtube = videos[i];

  // Create an iFrame with autoplay set to true
  var iframe = document.createElement("iframe");
  iframe.setAttribute("src",
    "https://www.youtube.com/embed/" + youtube.id + "?autoplay=0&autohide=1&border=0&wmode=opaque&enablejsapi=1&rel=0");

  // The height and width of the iFrame should be the same as parent
  iframe.style.width = "720px";
  iframe.style.height = "405px";
  iframe.setAttribute("frameborder","0");
  iframe.setAttribute("allowfullscreen","");
  youtube.appendChild(iframe);

};
