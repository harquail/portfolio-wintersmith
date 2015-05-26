// Find all the pdf files embedded on a page.
var pdfsToEmbed = document.getElementsByClassName("pdfEmbed");
console.log('reached');

for (var i = 0; i < pdfsToEmbed.length; i++) {
  var pdf = pdfsToEmbed[i];
  var pdfIdTag = "#" + pdf.id;
  $(pdfIdTag).html("<iframe src='"+pdf.id+".pdf.html' id='"+pdf.id+"'>< iframe>"); 
  
  $('iframe'+pdfIdTag).load( function() {
      var printme =  $('iframe'+pdfIdTag).contents().find("head").append("<style type='text/css'>  #page-container{background-image:none; background-color:#fff;} .pf{box-shadow:none;}  </style>");
      console.log(printme);
  });
};

