//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.scene.paint.Color');


/**
 * @param {number|string} red
 * @param {number=} green
 * @param {number=} blue
 * @param {number=1} opacity
 * @constructor
 */
fiahfy.mod.scene.paint.Color = function(red, green, blue, opacity) {
    if (typeof red === 'string' && red.charAt(0) == '#') {
        var colorString = red.substr(1);
        if (colorString.length == 3) {
            colorString = colorString.charAt(0) + colorString.charAt(0) +
                          colorString.charAt(1) + colorString.charAt(1) +
                          colorString.charAt(2) + colorString.charAt(2);
        }
        red = parseInt(colorString.substr(0, 2), 16);
        green = parseInt(colorString.substr(2, 2), 16);
        blue = parseInt(colorString.substr(4, 2), 16);
    }

    /**
     * Red color range
     * @private
     * @type {number}
     */
    this.red_ = (red <= 1) ? red : red / 255;

    /**
     * Green color range
     * @private
     * @type {number}
     */
    this.green_ = (green <= 1) ? green : green / 255;

    /**
     * Blue color range
     * @private
     * @type {number}
     */
    this.blue_ = (blue <= 1) ? blue : blue / 255;

    /**
     * Opacity
     * @private
     * @type {number}
     */
    opacity = (opacity !== null) ? opacity : 1.0;
    this.opacity_ = (opacity <= 1) ? opacity : opacity / 255;
};

/**
 * @public
 * @return {number} Red color range
 */
fiahfy.mod.scene.paint.Color.prototype.getRed = function() {
    return this.red_;
};

/**
 * @public
 * @return {number} Green color range
 */
fiahfy.mod.scene.paint.Color.prototype.getGreen = function() {
    return this.green_;
};
/**
 * @public
 * @return {number} Blue color range
 */
fiahfy.mod.scene.paint.Color.prototype.getBlue = function() {
    return this.blue_;
};

/**
 * @const
 * @public
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @param {number=1} opacity
 * @return {fiahfy.mod.scene.paint.Color} Color
 */
fiahfy.mod.scene.paint.Color.color = function(red, green, blue, opacity) {
    return new fiahfy.mod.scene.paint.Color(red, green, blue, opacity);
};

/**
 * @const
 * @public
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @param {number=255} opacity
 * @return {fiahfy.mod.scene.paint.Color} Color
 */
fiahfy.mod.scene.paint.Color.rgb = function(red, green, blue, opacity) {
    return new fiahfy.mod.scene.paint.Color(red, green, blue, opacity);
};

/**
 * @const
 * @public
 * @param {string} colorString
 * @return {fiahfy.mod.scene.paint.Color} Color
 */
fiahfy.mod.scene.paint.Color.web = function(colorString) {
    return new fiahfy.mod.scene.paint.Color(colorString);
};

/**
 * @const
 * @public
 * @type {fiahfy.mod.scene.paint.Color}
 */
fiahfy.mod.scene.paint.Color.RED =
    fiahfy.mod.scene.paint.Color.color('#ff0000');

/**
 * @const
 * @public
 * @type {fiahfy.mod.scene.paint.Color}
 */
fiahfy.mod.scene.paint.Color.GREEN =
    fiahfy.mod.scene.paint.Color.color('#00ff00');

/**
 * @const
 * @public
 * @type {fiahfy.mod.scene.paint.Color}
 */
fiahfy.mod.scene.paint.Color.BLUE =
    fiahfy.mod.scene.paint.Color.color('#0000ff');

/**
 * @const
 * @public
 * @type {fiahfy.mod.scene.paint.Color}
 */
fiahfy.mod.scene.paint.Color.BLACK =
    fiahfy.mod.scene.paint.Color.color('#000000');

/**
 * @const
 * @public
 * @type {fiahfy.mod.scene.paint.Color}
 */
fiahfy.mod.scene.paint.Color.GRAY =
    fiahfy.mod.scene.paint.Color.color('#808080');

/**
 * @const
 * @public
 * @type {fiahfy.mod.scene.paint.Color}
 */
fiahfy.mod.scene.paint.Color.WHITE =
    fiahfy.mod.scene.paint.Color.color('#ffffff');
