// Find all the pdf files embedded on a page. Something like this: <div class ="pdfEmbed" id="resume"></div> will be replaced by an embedded documentViewer holding the resume.pdf file in the current directory
var pdfsToEmbed = document.getElementsByClassName("pdfEmbed");
console.log('reached');

for (var i = 0; i < pdfsToEmbed.length; i++) {
  var pdf = pdfsToEmbed[i];

  var documentViewer = $("#" + pdf.id).documentViewer();
  console.log(pdf.id);
  documentViewer.load (document.URL + pdf.id + '.pdf', {
    autoLoadDependencies: false,
    path: "/js/documentViewer/",
    width: 760,
    debug: false
  });
};
