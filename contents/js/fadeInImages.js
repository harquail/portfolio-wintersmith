// Find all the pdf files embedded on a page.
var imagesToFade = document.getElementsByClassName("img");

for (var i = 0; i < imagesToFade.length; i++) {
  var image = imagesToFade[i];
  var imageTag = "#" + pdf.id;
  $(imageTag).hide()
};

$('img').each(function(i) {
    if (this.complete) {
        $(this).fadeIn(500);
    } else {
        $(this).load(function() {
            $(this).fadeIn(500);
        });
    }
});