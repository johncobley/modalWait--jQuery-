(function ($) {
    var methods = {
        init: function (options) {
            return this.each(function () {
                var settings = $.extend({
                    "image": "/Content/Images/ajax-loader_bar-transp-back.gif",
                    "autoHide": true,
                    "modalTextPosition": "bottom"
                }, options);
                var $this = $(this);
                var data = $this.data("modalWait");
                if (!data) {
                    $this.wrap('<div class="modalWaitContainer" />');
                    $this.append('<img alt="wait" class="waitImg" />');
                    if (settings.modalText)
                        $this.append('<span class="modalWaitText" ></span>');
                    $this.after('<div class="modal" />');
                    var modalWidth = parseInt($(".modal").css("width")),
                    modalHeight = parseInt($(".modal").css("height")),
                    htmlWidth = parseInt($("html").css("width")),
                    htmlHeight = parseInt($("html").css("height"));
                    if (htmlWidth > modalWidth)
                        $(".modal").width($("html").outerWidth());
                    if (htmlHeight > modalHeight)
                        $(".modal").height($("html").outerHeight());
                    $this.addClass("modalWait");
                    if (settings.autoHide)
                        methods.hide.call($this, settings);
                    methods.option.call($this, settings);
                    $this.data("modalWait", true);
                    $(".modalWait").windowCentred();
                    $(window).resize(function () {
                        $(".modalWait").windowCentred();
                        var modalWidth = parseInt($(".modal").css("width"));
                        var modalHeight = parseInt($(".modal").css("height"));
                        var htmlWidth = parseInt($("html").css("width"));
                        var htmlHeight = parseInt($("html").css("height"));
                        if (htmlWidth > modalWidth)
                            $(".modal").css("width", $("html").css("width"));
                        if (htmlHeight > modalHeight)
                            $(".modal").css("height", $("html").css("height"));
                        $this.addClass("modalWait");
                    });
                    $(window).scroll(function () {
                        $(".modal").windowCentred();
                    });
                }
            });
        },
        option: function (settings, val) {
            if (typeof settings !== 'object')
                eval("settings = { " + settings + ": \"" + val + "\" };");
            return this.each(function () {
                var $this = $(this);
                var removePx = /[0-9]*/g;
                if (settings.height) {
                    $this.height(settings.height);
                    var marginTop = parseFloat(settings.height.match(removePx)) / 2;
                    $this.css("margin-top", -marginTop);
                }
                if (settings.width) {
                    $thiswidth(settings.width);
                    var marginLeft = parseFloat(settings.width.match(removePx)) / 2;
                    $this.css("margin-left", -marginLeft);
                }
                if (settings.imageHeight) {
                    var image = $this.children("img");
                    image.css("height", settings.imageHeight);
                    var imageMarginTop = parseFloat(settings.imageHeight.match(removePx)) / 2;
                    image.css("margin-top", -imageMarginTop);
                    var imageHeight = parseFloat(settings.imageHeight.match(removePx)),
                        divHeight = parseFloat($this.css("height").match(removePx));
                    if (imageHeight > divHeight)
                        methods.option.call($this, { height: "" + (imageHeight + 20) });
                }
                if (settings.imageWidth) {
                    var image = $this.children("img");
                    image.css("width", settings.imageWidth);
                    var imageMarginLeft = parseFloat(settings.imageWidth.match(removePx)) / 2;
                    image.css("margin-left", -imageMarginLeft);
                    var imageWidth = parseFloat(settings.imageWidth.match(removePx)),
                        divWidth = parseFloat($this.css("width").match(removePx));
                    if (imageWidth > divWidth)
                        methods.option.call($this, { width: "" + (imageWidth + 20) });
                }
                if (settings.image) {
                    $this.children("img").attr("src", settings.image);
                }
                if (settings.modalText) {
                    $this.children(".modalWaitText").text(settings.modalText);
                }
                if (settings.modalText && settings.modalTextPosition) {
                    if (settings.modalTextPosition == "top") {
                        $this.children(".modalWaitText").css("top", 12);
                    }
                    if (settings.modalTextPosition == "bottom") {
                        $this.children(".modalWaitText").css("top", 42);
                    }
                }
            });
        },
        show: function () {
            return this.each(function () {
                var modalWidth = parseInt($(".modal").css("width")),
                    modalHeight = parseInt($(".modal").css("height")),
                    windowWidth = parseInt($(window).width()),
                    windowHeight = parseInt($(window).height());
                if (windowWidth > modalWidth)
                    $(".modal").width($(window).width());
                if (windowHeight > modalHeight)
                    $(".modal").height($(window).height());
                $(this).parents(".modalWaitContainer").show();
                //$(".modal").windowCentred();
                $(".modalWait").windowCentred();
            });
        },
        hide: function () {
            return this.each(function () {
                $(this).parents(".modalWaitContainer").hide();
            });
        }
    };
    $.fn.modalWait = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error("Method " + method + " does not exist on jQuery.modalWait");
        }
    };
})(jQuery);