$(function () {
    let request, $current, cache = [], frame = $('.photo-viewer'), $thumbs = $('.thumb');

    function crossFade(img) {
        if ($current) {
            $current.stop().fadeOut('slow');
        }
        img.css({
            marginLeft: -img.width() / 2,
            marginTop: -img.height() / 2
        });
        img.stop().fadeTo('slow', 1);
        $current = img;
    }

    $(document).on('click', '.thumb', function (evt) {
        let $img, src = this.href;
        request = src;

        evt.preventDefault();

        $thumbs.removeClass('active');
        $(this).addClass('active');

        if (cache.hasOwnProperty(src)) {
            if (cache[src].isLoading === false) {
                crossFade(cache[src].img);
            }
        } else {
            $img = $('<img/>');
            cache[src] = {
                img: $img,
                isLoading: true
            }

            $img.on('load', function () {
                $img.hide();
                frame.removeClass('is-loading').append($img);
                cache[src].isLoading = false;
                if (request === src) {
                    crossFade($img);
                }
            });

            frame.addClass('is-loading');
            $img.attr({
                'src': src,
                'alt': this.title || ''
            })
        };
    });
    $thumbs.eq(0).click();
});