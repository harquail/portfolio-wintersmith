(function ($) {

    "use strict";

    var DocumentViewerDependencyLoader = function (loaderOptions) {
        var load, dependencies, dependencyTests;

        //paths to each dependency
        dependencies = {
            pdfjs: ['libs/pdfjs/compatibility.js', 'libs/pdfjs/pdf.js'],
            prettify: ['libs/google-code-prettify/prettify.js', 'libs/google-code-prettify/prettify.css'],
            flowplayer: ['libs/flowplayer/flowplayer-3.2.6.min.js'],
            jplayer: ['libs/jPlayer/jquery.jplayer.min.js']
        };

        yepnope.errorTimeout = loaderOptions.errorTimeout || 4000;

        //tests to determine if the dependency is already loaded
        dependencyTests = {
            pdfjs: function () {
                return typeof PDFJS !== 'undefined';
            },
            prettify: function () {
                return typeof prettyPrint !== 'undefined';
            },
            flowplayer: function () {
                return typeof flowplayer !== 'undefined';
            },
            jplayer: function () {
                return typeof $.jPlayer !== 'undefined';
            }
        };

        function loadDependency(userOptions) {
            var options = $.extend({}, loaderOptions, userOptions);

            load = [];

            //if the user has specified a different path for the libs folder, update the paths for each of the dependencies
            if (options.path) {
                var realPaths = {};

                $.each(dependencies, function (key, dependency) {
                    var files = [];

                    $.each(dependency, function (i, file) {
                        files.push(options.path + file);
                    });

                    realPaths[key] = files;
                });

                dependencies = realPaths;
            }

            //test for the dependency, if it exists run the callback. If not, load the dependency then run the callback
            //TODO: Look at the yepnope api. It probably handles this case.
            if (dependencyTests[options.dependency]()) {
                options.callback();
            }
            else {
                yepnope({
                    load: dependencies[options.dependency],
                    complete: function () {
                        //check to see if the dependency actually loaded, since script loaders can't accurately report
                        //loading errors in a cross browser manner (from yepnope docs)
                        if (dependencyTests[options.dependency]()) {
                            if ($.isFunction(options.callback)) {
                                options.callback();
                            }
                        }
                        else {
                            //there was an error loading the dependency. Throw an error
                            options.errorHandler('There was an error loading the dependency (' + dependencies[options.dependency] + ') Please check your options.path value');
                        }

                    }
                });
            }
        }

        return{
            loadDependency:loadDependency
        };
    };

    var DocumentViewer = function($anchor, userOptions) {
        var $wrapper,
            $outer,
            $inner,
            codeExtensions = ['bsh', 'c', 'cc', 'cpp', 'cs', 'csh', 'css', 'cyc', 'cv', 'htm', 'html', 'java', 'js',
                'm', 'mxml', 'perl', 'php', 'pl', 'pm', 'py', 'rb', 'sh', 'xhtml', 'xml', 'xsl', 'sql', 'vb'],
            imageExtensions = ['png', 'jpg', 'jpeg', 'gif'],
            audioExtensions = ['mp3', 'm4a', 'oga', 'webma', 'fla'],
            jPlayerVideoExtensions = ['m4v', 'ogv', 'ogg', 'webmv', 'flv'],
            flowplayerExtensions = ['mpg', 'mpeg', 'mov', 'divx', 'avi', 'wmv'],
            videoExtensions = jPlayerVideoExtensions.concat(flowplayerExtensions),
            jPlayerExtensions = jPlayerVideoExtensions.concat(audioExtensions),
            defaultOptions = {
                width:500,
                height:'auto',
                debug:false,
                autoplay:true,
                autoLoadDependencies:true,
                enableTextAndCode:true,
                jPlayer:{},
                emptyText:'<div class="document-viewer-empty-text">No Document Loaded</div>',
                unsupportedBrowserText:'<div class="document-viewer-empty-text">This document can not be opened in this browser. Please upgrade.</div>',
                errorText:'An error occurred while loading the ',
                serverResponseText:'Unexpected server response of ',
                path:'documentViewer/'
            },
            cssSelector = {
                scrollable:'.scrollable',
                viewport:'.viewport',
                scrollContent:'.scroll-content',
                wrapper:'.document-viewer-wrapper',
                outer:'.document-viewer-outer',
                anchor:'.document-viewer'
            },
            options = {},
            dependencyLoader,
            currentType,
            currentFilename,
            id,
            $loadingIndicator = $('<div class="dv-loading"></div>');

        function init() {
            var $markup = '<div class="document-viewer-wrapper dv-markup clearfix">' +
                '<div class="document-viewer-outer dv-markup clearfix">' +
                '<div class="document-viewer dv-markup clearfix"></div>' +
                '</div>' +
                '<div class="dv-sheet sheet1"></div>' +
                '<div class="dv-sheet sheet2"></div>' +
                '</div>';

            //set up the document viewer markup
            $anchor.append($markup);
            $wrapper = $anchor.find(cssSelector.wrapper);
            $outer = $anchor.find(cssSelector.outer);
            $inner = $anchor.find(cssSelector.anchor);

            //we need to create an id for the inner element. This is only used by flowplayer
            id = 'document-viewer' + new Date().getTime();
            $inner.attr('id', id);

            //apply any user defined options
            options = $.extend(true, {}, defaultOptions, userOptions);

            //nothing has been loaded yet, add the empty text;
            $inner.html(options.emptyText);
            setSize(options);

            //initialize the dependency loader
            dependencyLoader = new DocumentViewerDependencyLoader({
                path:options.path,
                errorHandler:debugMessage
            });
        }

        function getType(ext) {
            var type = false;

            if (ext === 'pdf') {
                type = 'pdf';
            }
            else if (ext === 'txt') {
                type = 'txt';
            }
            else if ($.inArray(ext, codeExtensions) !== -1) {
                type = 'code';
            }
            else if ($.inArray(ext, videoExtensions) !== -1) {
                type = 'video';
            }
            else if ($.inArray(ext, audioExtensions) !== -1) {
                type = 'audio';
            }
            else if ($.inArray(ext, imageExtensions) !== -1) {
                type = 'image';
            }

            return type;
        }

        function debugMessage(msg) {
            if (options.debug && window.console) {
                console.log('DOCUMENT VIEWER: ' + msg);
            }
        }

        function getExtension(filename) {
            //From: Tomalak's answer, http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript
            var re = /(?:\.([^.]+))?$/;
            return re.exec(filename)[1];
        }

        function initScrollbar(type) {
            if (type === 'txt' || type === 'code') {
                $wrapper.addClass(c('scrollable'));
                $outer.addClass(c('viewport'));
                $inner.addClass(c('scrollContent'));
                $wrapper.tinyscrollbar();
            }
            else {
                //we need to remove the scrollbar classes otherwise the viewer will not display correctly
                $wrapper.removeClass(c('scrollable'));
                $outer.removeClass(c('viewport'));
                $inner.removeClass(c('scrollContent'));
                $wrapper.tinyscrollbar_destroy();
            }
        }

        //get the class or id for a selector
        function c(selector) {
            if (cssSelector[selector]) {
                return cssSelector[selector].substr(1);
            }
            else {
                return '';
            }
        }

        function getHeight(options, type) {
            var height;
            if (type === 'pdf' || type === 'txt' || type === 'code') {
                height = typeof options.height !== "string" ? options.height : options.width * 1.3;
            }
            else if (type === 'video') {
                height = typeof options.height !== "string" ? options.height : Math.round((options.width / 16) * 9);
            }
            else if (type === 'image') {
                height = options.height;
            }
            else if (type === 'audio') {
                height = 0;
            }
            else {
                height = 'auto';
            }
            return height;
        }

        function setSize(options) {
            var type = options.type;

            options.width = options.width || defaultOptions.width;
            options.height = getHeight(options, type);

            $wrapper.paddedWidth(options.width + 2).find('.dv-markup').paddedWidth(options.width);

            //pdf.js needs the height of the inner element to be explicitly be set, but tinyscrollbar will break in
            //firefox if the inner height is set
            if(type == 'pdf'){
                $inner.paddedHeight(options.height).parent().paddedHeight(options.height);
            }
            else if (type === 'txt' || type === 'code') {
                $inner.parent().paddedHeight(options.height);
            }
            else {
                $inner.height('auto').parent().height('auto');
            }
        }

        function bindCallback(eventId, callback) {
            if (callback && $.isFunction(callback)) {
                $inner.bind(eventId, callback);
            }
        }

        function triggerLoadedEvent(eventId) {
            $inner.trigger(eventId);
        }

        function loadDependency(dependency, callback) {
            //if the user doesn't want to use the dependency loader, run the callback immediately (this assumes the user
            //has included the dependency manually
            if (!options.autoLoadDependencies) {
                callback();
            }
            else {
                dependencyLoader.loadDependency({
                    dependency:dependency,
                    callback:callback
                });
            }
        }

        function load(filename, userOptions) {
            var loadOptions;

            loadOptions = $.extend(true, {}, options, userOptions);

            if (typeof loadOptions.extension === 'undefined') {
                loadOptions.extension = getExtension(filename);
            }
            if (typeof loadOptions.type === 'undefined') {
                loadOptions.type = getType(loadOptions.extension);
            }

            //We don't want to have to type loadOptions.type for each usage.
            currentType = loadOptions.type;

            //The error function is going to want the current filename if there is an error. Let's set it to a global var
            currentFilename = filename;

            //add a class to the document viewer for the current type
            $wrapper.removeClass('pdf code txt video audio image').addClass(currentType);

            //create a unique event id to be called when this document is loaded
            loadOptions.loadEventId = new Date().getTime() + '-' + Math.floor(Math.random() * (100000 - 1 + 1)) + 1;

            bindCallback(loadOptions.loadEventId, loadOptions.callback);

            setSize(loadOptions);

            $inner.html('');

            //add the loading indicator
            $loadingIndicator.css('top', options.height / 2 - 18);
            $inner.append($loadingIndicator);

            switch (currentType) {
                case 'pdf':
                    var pdf = new PDFLoader(filename, loadOptions);
                    break;
                case 'code':
                case 'txt':
                    //the user may not want to use the php dependency required for text and code
                    if (options.enableTextAndCode === true) {
                        var txt = new TextLoader(filename, loadOptions);
                    }
                    else {
                        error(1, 'Invalid File Type. Please set enableTextAndCode option to true');
                        debugMessage('Invalid File Type. Please set enableTextAndCode option to true');
                    }
                    break;
                case 'video':
                    var video = new VideoLoader(filename, loadOptions);
                    break;
                case 'audio':
                    var audio = new JPlayerLoader(filename, loadOptions);
                    break;
                case 'image':
                    var image = new ImageLoader(filename, loadOptions);
                    break;
                default:
                    //TODO: better arguments for error function, perhaps pass in object
                    error(1, 'Invalid File Type');
                    debugMessage('Invalid File Type');
                    break;
            }

            //since text/code are asynchronous, the handler will run the callback on it's own
            if (currentType !== 'txt' && currentType !== 'code') {
                initScrollbar(currentType);
            }

            //all other types will trigger their own load event
            if (currentType === 'pdf') {
                triggerLoadedEvent(loadOptions.loadEventId);
            }
        }

        function close() {
            $inner.html(options.emptyText);
            setSize(options);
            initScrollbar();
        }

        //Convenience method for:
        // 1. determining what type of document is associated with a given filename
        // 2. Determining if a document can be opened i.e. if(getDocumentType !== false)
        function getDocumentType(filename) {
            return getType(getExtension(filename));
        }

        function error(errorCode, errorText, serverResponse) {
            var errorMessage = '<br/><span>' + options.serverResponseText + ' ' + errorCode + ' (' + errorText + ')</span>';
            $inner.html('<div class="dv-error">' + options.errorText + currentType + errorMessage + '</div>');

            debugMessage('Error loading file (' + currentFilename + '). Please make sure that the path is correct');
        }

        function hideLoadingIndicator() {
            //TODO: global Set content function that handles all of this rather than calling in each handler
            $loadingIndicator.remove();
        }

        var PDFLoader = function(filename, options) {
            var pdf,
                currentPage = 1,
                $menu = $('<div class="pdf-menu"><div class="prev-page" >Prev Page</div><div class="next-page">Next Page</div><div class="go-to-page">Go to page <input></div></div>');

            //bind event handlers for the pdf menu
            $menu.on('click', '.prev-page', function() {
                if (currentPage > 1) {
                    currentPage -= 1;
                    setPage(currentPage);
                }
            });

            $menu.on('click', '.next-page', function() {
                if (currentPage < pdf.numPages) {
                    currentPage += 1;
                    setPage(currentPage);
                }
            });

            $menu.on('keyup', 'input', function() {
                var pageNum = $(this).val();
                if (pageNum > 0 && pageNum <= pdf.numPages) {
                    setPage(pageNum);
                }
            });

            function supports_canvas() {
                return !!document.createElement('canvas').getContext;
            }

            function load(filename) {

                $inner.append($menu);

                PDFJS.workerSrc = options.path + 'libs/pdfjs/pdf.js';
                PDFJS.getPdf({
                    url:filename,
                    error:function(e) {
                        error(e.target.status, e.target.statusText);
                    }
                }, function (data) {
                    pdf = new PDFJS.PDFDoc(data);
                    setPage(currentPage);
                });
            }

            function setPage(pageNum) {
                $inner.find('canvas').remove();
                $inner.append(renderPage(pageNum));
            }

            function renderPage(pageNum) {
                var page, canvas, context;
                page = pdf.getPage(pageNum);

                // Prepare canvas using PDF page dimensions
                canvas = document.createElement('canvas');
                canvas.id = 'page' + pageNum;

                context = canvas.getContext('2d');
                canvas.width = $inner.width();
                canvas.height = $inner.height();

                // Render PDF page into canvas context
                page.startRendering(context, function() {
                    hideLoadingIndicator();
                });

                return canvas;
            }

            if (supports_canvas()) {
                loadDependency(['pdfjs'], function() {
                    load(filename);
                });
            }
            else {
                $inner.html(options.unsupportedBrowserText);
                return;
            }

            return{
                load:load,
                setPage:setPage
            };
        };

        var TextLoader = function(filename, options) {
            $.ajax({
                url:options.path + 'libs/getContents.php',
                type:'POST',
                data:{file:filename},
                success:function(response) {
                    response = $.parseJSON(response);

                    if (response.status === 'success') {
                        var $contents = $('<pre class="prettyprint linenums">' + response.response + '</pre>').css('opacity', 0);

                        hideLoadingIndicator();

                        //display the text
                        $inner.append($contents);
                        $contents.animate({opacity:1}); //TODO: Put this in a function, $inner.animate

                        initScrollbar(options.type);

                        //enable prettify after the text has loaded
                        loadDependency(['prettify'], function() {
                            if (options.type === 'code') {
                                prettyPrint();
                            }
                        });

                        triggerLoadedEvent(options.loadEventId);
                    }
                    else {
                        error('404', 'Not Found');
                    }
                },
                error:function(e) {
                    error();
                }
            });
        };

        var VideoLoader = function(filename, options) {
            var videoMgr;

            if ($.inArray(options.extension, jPlayerExtensions) !== -1) {
                videoMgr = new JPlayerLoader(filename, options);
            }
            else {
                videoMgr = new FlowplayerLoader(filename, options);
            }
        };

        var JPlayerLoader = function(filename, options) {
            var jPlayerOptions, jPlayerDefaults, $myJplayer, cssSelector, isVideo;

            //the css selectors from the markup that will be processed by this code
            cssSelector = {
                jPlayer: "#jquery_jplayer",
                jPlayerContainer: '.jPlayer-container',
                jPlayerInterface: '.jp-interface',
                playlist:'.playlist',
                playing:'.playing',
                progress:'.progress-wrapper',
                volume:'.volume-wrapper'
            };

            jPlayerDefaults = {
                swfPath: options.path + "libs/jPlayer",
                supplied: options.extension,
                solution:'html, flash',
                cssSelectorAncestor:  cssSelector.jPlayerInterface,
                errorAlerts: options.debug,
                warningAlerts: options.debug,
                size: {
                    //height/width will be reset when build interface is called
                    height:options.height,
                    width:options.width,
                    cssClass: "show-video"
                },
                sizeFull: {
                    width: "100%",
                    height: "90%",
                    cssClass: "show-video-full"
                }
            };

            function buildInterface() {
                var playerMarkup, $interface, width;

                playerMarkup = '<div class="ttw-video-player">' +
                    '<div class="jPlayer-container"></div>' +
                    '<div class="clear"></div>' +
                    '<div class="player jp-interface">' +
                    '<div class="player-controls">' +
                    '<div class="play jp-play button"></div>' +
                    '<div class="pause jp-pause button"></div>' +
                    '<div class="progress-wrapper">' +
                    '<div class="progress-bg">' +
                    '<div class="progress jp-seek-bar">' +
                    '<div class="elapsed jp-play-bar"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="volume-wrapper">' +
                    '<div class="volume jp-volume-bar">' +
                    '<div class="volume-value jp-volume-bar-value"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<!-- These controls aren\'t used by this plugin, but jPlayer seems to require that they exist -->' +
                    '<span class="unused-controls">' +
                    '<span class="previous jp-previous"></span>' +
                    '<span class="next jp-next"></span>' +
                    '<span class="jp-video-play"></span>' +
                    '<span class="jp-stop"></span>' +
                    '<span class="jp-mute"></span>' +
                    '<span class="jp-unmute"></span>' +
                    '<span class="jp-volume-max"></span>' +
                    '<span class="jp-current-time"></span>' +
                    '<span class="jp-duration"></span>' +
                    '<span class="jp-repeat"></span>' +
                    '<span class="jp-repeat-off"></span>' +
                    '<span class="jp-gui"></span>' +
                    '<span class="jp-restore-screen"></span>' +
                    '<span class="jp-full-screen"></span>' +
                    '<span class="jp-no-solution"></span>' + //TODO: I probably want to use this one

                    '</span>' +
                    '</div>' +
                    '<div class="clear"></div>' +
                    '</div>';

                //Build the html
                $interface = $(playerMarkup).css({opacity:0}).appendTo($inner);
                width = $inner.width();

                //we need to reset the width of the video container based on the inner width, which factors in padding
                jPlayerOptions.size.width = width;

                //apply widths to each of the interface components
                $interface.width(width).find(cssSelector.jPlayerInterface + ', ' + cssSelector.jPlayerContainer).paddedWidth(width);

                //if this is a video, we need to apply a size to the video element, otherwise we need to hide it (height = 0)
                if (isVideo) {
                    $interface.height(parseInt(options.height, 10)).find(cssSelector.jPlayerContainer).height(parseInt(options.height, 10) - 34);
                }
                else {
                    $interface.find(cssSelector.jPlayerContainer).height(0);
                }

                $interface.animate({opacity:1});
            }

            function load() {

                //is this video or audio?
                isVideo = $.inArray(options.type, jPlayerVideoExtensions) !== -1;

                //apply any user defined jPlayer options
                jPlayerOptions = $.extend(true, {}, jPlayerDefaults, options.jPlayer);

                hideLoadingIndicator();

                //build the interface
                buildInterface();

                //initialize jPlayer
                $myJplayer = $inner.find('.jPlayer-container');

                $myJplayer.bind($.jPlayer.event.ready, function() {
                    var media = {};

                    //jPlayer setMedia accepts an object i.e. {mp3:somesong.mp3}, this creates the objec
                    media[options.extension] = filename;
                    $myJplayer.jPlayer("setMedia", media);

                    debugMessage('jPlayer Ready');

                    if (options.autoplay) {
                        $myJplayer.jPlayer('play');
                    }
                });

                $myJplayer.bind($.jPlayer.event.loadstart, function() {
                    triggerLoadedEvent(options.loadEventId);
                });

                $myJplayer.bind($.jPlayer.event.error, function(e) {
                    error('404', 'Not Found');
                });

                //Initialize jPlayer
                $myJplayer.jPlayer(jPlayerOptions);
            }

            loadDependency(['jplayer'], function() {
                load();
            });
        };

        var FlowplayerLoader = function(filename, options) {
            //TODO:flowplayer options

            function load() {
                $inner.height(options.height);

                hideLoadingIndicator();

                flowplayer(id, options.path + "libs/flowplayer/flowplayer-3.2.7.swf", {
                    clip : {            // Clip is an object, hence '{...}'
                        autoPlay: options.autoplay,
                        autoBuffering: true,
                        url: filename,
                        height:options.height
                    },
                    plugins: {
                        controls:{
                            backgroundColor: "transparent",
                            backgroundGradient: "none",
                            sliderColor: '#FFFFFF',
                            sliderBorder: '1.5px solid rgba(160,160,160,0.7)',
                            volumeSliderColor: '#FFFFFF',
                            volumeBorder: '1.5px solid rgba(160,160,160,0.7)',
                            timeColor: '#ffffff',
                            durationColor: '#535353',
                            tooltipColor: 'rgba(255, 255, 255, 0.7)',
                            tooltipTextColor: '#000000'
                        }
                    },
                    onBegin:function() {
                        triggerLoadedEvent(options.loadEventId);
                    },
                    onError:function(errorCode, errorText) {
                        error(errorCode, errorText);
                    }
                });
            }

            loadDependency(['flowplayer'], function() {
                load();
            });
        };

        var ImageLoader = function(filename, options) {
            var $img = $('<img class="dv-image">').css('opacity', 0);

            //trigger an error if the image can not be loaded
            $img.error(function(e) {
                error('404', 'Not Found');
            });

            //set the image source after we have already created the error handler
            $img.attr('src', filename);

            //trigger the loaded event when the image is loaded
            $img.imagesLoaded(function() {
                hideLoadingIndicator();

                $inner.append($img);
                $img.animate({opacity:1});

                triggerLoadedEvent(options.loadEventId);
            });
        };

        //initialize the document viewer
        init();

        return{
            load:load,
            close:close,
            getDocumentType:getDocumentType
        };
    };

    $.fn.documentViewer = function(options) {
        var documentViewer = new DocumentViewer(this, options);

        this.data('document-viewer', documentViewer);

        return documentViewer;
    };

})(jQuery);