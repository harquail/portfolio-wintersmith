// Find all the vines embedded on a page
var videos = document.getElementsByClassName("vine");

for (var i = 0; i < videos.length; i++) {
  var vine = videos[i];

  // Create an iFrame
  var iframe = document.createElement("iframe");
  iframe.setAttribute("src",
    "https://vine.co/v/" + vine.id + "/embed/simple?audio=0");

  // The height and width of the iFrame should be the same as parent
  iframe.style.width = "450px";
  iframe.style.height = "450px";
  iframe.setAttribute("frameborder","0");
  vine.appendChild(iframe);

};
