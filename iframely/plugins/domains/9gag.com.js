module.exports = {

    re: [
        /^https?:\/\/9gag\.com\/gag\/([a-z0-9\-]+)/i
    ],

    mixins: [
        "favicon",
        "og-description",
        "og-site",
        "og-title",
        "og-image", // for gif thumbnails
        "canonical"
    ],

    getLink: function(cheerio) {
        var image;

        // Used for gifs, but gifv will 404 and it will only thumbnail afterwards
        var $raw_image = cheerio('[data-image]');
        if ($raw_image.length) {

            image = $raw_image.attr('data-image');

        } else {

            // Used for large images.
            $raw_image = cheerio('[data-img]');
            if ($raw_image.length) {
                image = $raw_image.attr('data-img');
            }
        }

        if (image) {
            return {
                href: image.replace(/^https?:/, ''),
                type: CONFIG.T.image,
                rel: CONFIG.R.image
            };
        }
    },
    
    tests: [ {
        page: "http://9gag.com",
        selector: ".badge-item-title a.badge-track"
    },
        "http://9gag.com/gag/5500821"
        // "http://9gag.com/gag/arK0nWB" - gifv
    ]
};
