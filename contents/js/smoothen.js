;(function ($) {
    $('#content').smoothState({development:true});
    $('#tag-nav').smoothState({development:true});
    $('#navbar').smoothState({development:true});
   //  $('#portfolio-thumbnails').smoothState({development:true});
    
    
    ;(function($) {
      'use strict';
      var $body = $('html, body'),
          content = $('#main').smoothState({
            // Runs when a link has been activated
            onStart: {
              duration: 250, // Duration of our animation
              render: function (url, $container) {
                // toggleAnimationClass() is a public method
                // for restarting css animations with a class
                content.toggleAnimationClass('is-exiting');
                // Scroll user to the top
                $body.animate({
                  scrollTop: 0
                });
              }
            },development:true
          }).data('smoothState');

          //.data('smoothState') makes public methods available
    })(jQuery);
    
    
    // alert("smoothened!");
})(jQuery);