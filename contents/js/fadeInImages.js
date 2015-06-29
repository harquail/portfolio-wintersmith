// Find all the pdf files embedded on a page.
var imagesToFade = document.images
console.log(imagesToFade)
for (var i = 0; i < imagesToFade.length; i++) {
  var image = imagesToFade[i];
  var imageTag = "#" + image.id;
  console.log(imageTag)
  $(image).hide()
};

$('img').each(function(i) {
    if (this.complete) {
        $(this).fadeIn();
    } else {
        $(this).load(function() {
            $(this).fadeIn();
        });
    }
});