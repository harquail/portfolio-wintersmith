/**********************************************************************************************
 IMPORTANT: All of the plugins in the file are required for the jQuery Document Viewer
 to work correctly. Please do not modify these plugins unless you know what you are doing
 **********************************************************************************************/

//Slightly modified version of tiny scrollbar to auto add the scrollbar markup if it doesnt exist
//added destroy function
(function($) {
    $.tiny = $.tiny || { };

    $.tiny.scrollbar = {
        options: {
            axis: 'y', // vertical or horizontal scrollbar? ( x || y ).
            wheel: 40,  //how many pixels must the mouswheel scroll at a time.
            scroll: true, //enable or disable the mousewheel;
            size: 'auto', //set the size of the scrollbar to auto or a fixed number.
            sizethumb: 'auto' //set the size of the thumb to auto or a fixed number.
        }
    };

    $.fn.tinyscrollbar = function(options) {
        var options = $.extend({}, $.tiny.scrollbar.options, options);
        this.each(function() {
            //SE. Added to automatically append the scrollbar if it doesn't exist
            if (!$(this).find('.scrollbar').length)
                $(this).append('<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>');

            $(this).data('tsb', new Scrollbar($(this), options));
        });
        return this;
    };

    $.fn.tinyscrollbar_update = function(sScroll) {
        return $(this).data('tsb').update(sScroll);
    };

    $.fn.tinyscrollbar_destroy = function() {
        var $this = $(this);
        $this.removeData('tsb');
        return $this.find('.scrollbar').remove();
    };

    function Scrollbar(root, options) {
        var oSelf = this;
        var oWrapper = root;
        var oViewport = { obj: $('.viewport', root) };
        var oContent = { obj: $('.scroll-content', root) };
        var oScrollbar = { obj: $('.scrollbar', root) };
        var oTrack = { obj: $('.track', oScrollbar.obj) };
        var oThumb = { obj: $('.thumb', oScrollbar.obj) };
        var sAxis = options.axis == 'x', sDirection = sAxis ? 'left' : 'top', sSize = sAxis ? 'Width' : 'Height';
        var iScroll, iPosition = { start: 0, now: 0 }, iMouse = {};

        function initialize() {
            oSelf.update();
            setEvents();
            return oSelf;
        }

        this.update = function(sScroll) {
            oViewport[options.axis] = oViewport.obj[0]['offset' + sSize];
            oContent[options.axis] = oContent.obj[0]['scroll' + sSize];
            oContent.ratio = oViewport[options.axis] / oContent[options.axis];
            console.log(oContent.ratio, oViewport[options.axis], oContent[options.axis]);
            oScrollbar.obj.toggleClass('disable', oContent.ratio >= 1);
            oTrack[options.axis] = options.size == 'auto' ? oViewport[options.axis] : options.size;
            oThumb[options.axis] = Math.min(oTrack[options.axis], Math.max(0, ( options.sizethumb == 'auto' ? (oTrack[options.axis] * oContent.ratio) : options.sizethumb )));
            oScrollbar.ratio = options.sizethumb == 'auto' ? (oContent[options.axis] / oTrack[options.axis]) : (oContent[options.axis] - oViewport[options.axis]) / (oTrack[options.axis] - oThumb[options.axis]);
            iScroll = (sScroll == 'relative' && oContent.ratio <= 1) ? Math.min((oContent[options.axis] - oViewport[options.axis]), Math.max(0, iScroll)) : 0;
            iScroll = (sScroll == 'bottom' && oContent.ratio <= 1) ? (oContent[options.axis] - oViewport[options.axis]) : isNaN(parseInt(sScroll)) ? iScroll : parseInt(sScroll);
            setSize();
        };
        function setSize() {
            oThumb.obj.css(sDirection, iScroll / oScrollbar.ratio);
            oContent.obj.css(sDirection, -iScroll);
            iMouse['start'] = oThumb.obj.offset()[sDirection];
            var sCssSize = sSize.toLowerCase();
            oScrollbar.obj.css(sCssSize, oTrack[options.axis]);
            oTrack.obj.css(sCssSize, oTrack[options.axis]);
            oThumb.obj.css(sCssSize, oThumb[options.axis]);
        }

        ;
        function setEvents() {
            oThumb.obj.bind('mousedown', start);
            oThumb.obj[0].ontouchstart = function(oEvent) {
                oEvent.preventDefault();
                oThumb.obj.unbind('mousedown');
                start(oEvent.touches[0]);
                return false;
            };
            oTrack.obj.bind('mouseup', drag);
            if (options.scroll && this.addEventListener) {
                oWrapper[0].addEventListener('DOMMouseScroll', wheel, false);
                oWrapper[0].addEventListener('mousewheel', wheel, false);
            }
            else if (options.scroll) {
                oWrapper[0].onmousewheel = wheel;
            }
        }

        ;
        function start(oEvent) {
            iMouse.start = sAxis ? oEvent.pageX : oEvent.pageY;
            var oThumbDir = parseInt(oThumb.obj.css(sDirection));
            iPosition.start = oThumbDir == 'auto' ? 0 : oThumbDir;
            $(document).bind('mousemove', drag);
            document.ontouchmove = function(oEvent) {
                $(document).unbind('mousemove');
                drag(oEvent.touches[0]);
            };
            $(document).bind('mouseup', end);
            oThumb.obj.bind('mouseup', end);
            oThumb.obj[0].ontouchend = document.ontouchend = function(oEvent) {
                $(document).unbind('mouseup');
                oThumb.obj.unbind('mouseup');
                end(oEvent.touches[0]);
            };
            return false;
        }

        ;
        function wheel(oEvent) {
            if (!(oContent.ratio >= 1)) {
                var oEvent = oEvent || window.event;
                var iDelta = oEvent.wheelDelta ? oEvent.wheelDelta / 120 : -oEvent.detail / 3;
                iScroll -= iDelta * options.wheel;
                iScroll = Math.min((oContent[options.axis] - oViewport[options.axis]), Math.max(0, iScroll));
                oThumb.obj.css(sDirection, iScroll / oScrollbar.ratio);
                oContent.obj.css(sDirection, -iScroll);

                oEvent = $.event.fix(oEvent);
                oEvent.preventDefault();
            }
            ;
        }

        ;
        function end(oEvent) {
            $(document).unbind('mousemove', drag);
            $(document).unbind('mouseup', end);
            oThumb.obj.unbind('mouseup', end);
            document.ontouchmove = oThumb.obj[0].ontouchend = document.ontouchend = null;
            return false;
        }

        ;
        function drag(oEvent) {
            if (!(oContent.ratio >= 1)) {
                iPosition.now = Math.min((oTrack[options.axis] - oThumb[options.axis]), Math.max(0, (iPosition.start + ((sAxis ? oEvent.pageX : oEvent.pageY) - iMouse.start))));
                iScroll = iPosition.now * oScrollbar.ratio;
                oContent.obj.css(sDirection, -iScroll);
                oThumb.obj.css(sDirection, iPosition.now);
            }
            return false;
        }

        ;

        return initialize();
    }

    ;
})(jQuery);

(function($) {

    $.fn.paddedWidth = function(width) {
        this.each(function() {
            if (width) {
                var $this = $(this), padding;
                padding = parseInt($this.css('padding-left'), 10) + parseInt($this.css('padding-right'), 10);
                $this.width(width - padding);
            }
        });

        return this;
    };

    $.fn.paddedHeight = function(height) {
        this.each(function() {
            if (height) {
                var $this = $(this), padding;
                padding = parseInt($this.css('padding-top'), 10) + parseInt($this.css('padding-bottom'), 10);
                $this.height(height - padding);
            }
        });

        return this;
    };

    $.fn.verticalPadding = function() {
        return parseInt(this.css('padding-top'), 10) + parseInt(this.css('padding-bottom'), 10);
    };

    // mit license. paul irish. 2010.
    // webkit fix from Oren Solomianik. thx!
    $.fn.imagesLoaded = function (callback) {
        var elems = this.filter('img'),
            len = elems.length,
            blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

        elems.bind('load.imgloaded',
            function () {
                if (--len <= 0 && this.src !== blank) {
                    elems.unbind('load.imgloaded');
                    callback.call(elems, this);
                }
            }).each(function () {
                // cached images don't fire load sometimes, so we reset src.
                if (this.complete || this.complete === undefined) {
                    var src = this.src;
                    // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
                    // data uri bypasses webkit log warning (thx doug jones)
                    this.src = blank;
                    this.src = src;
                }
            });

        return this;
    };
})(jQuery);