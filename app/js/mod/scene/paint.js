//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.scene.paint.Color');

goog.require('fiahfy.mod.Object');


/**
 * @param {number|string=} red The red component of the color or color string.
 * @param {number=} green The green component of the color.
 * @param {number=} blue The blue component of the color.
 * @param {number=} opacity The opacity component of the color.
 * @constructor
 * @extends {fiahfy.mod.Object}
 */
fiahfy.mod.scene.paint.Color = function(red, green, blue, opacity) {
    fiahfy.mod.Object.call(this);

    red = this.supplement(red, 0.0);
    green = this.supplement(green, 0.0);
    blue = this.supplement(blue, 0.0);
    opacity = this.supplement(opacity, 0.0);

    // TODO: parse web color string
    if (typeof red === 'string' && red.charAt(0) == '#') {
        var colorString = red.substr(1);
        if (colorString.length == 3) {
            colorString =
                colorString.charAt(0) + colorString.charAt(0) +
                colorString.charAt(1) + colorString.charAt(1) +
                colorString.charAt(2) + colorString.charAt(2);
        }
        red = parseInt(colorString.substr(0, 2), 16);
        green = parseInt(colorString.substr(2, 2), 16);
        blue = parseInt(colorString.substr(4, 2), 16);
    }

    /**
     * Red
     * @private
     * @type {number}
     */
    this.red_ = (red <= 1) ? red : red / 255;

    /**
     * Green
     * @private
     * @type {number}
     */
    this.green_ = (green <= 1) ? green : green / 255;

    /**
     * Blue
     * @private
     * @type {number}
     */
    this.blue_ = (blue <= 1) ? blue : blue / 255;

    /**
     * Opacity
     * @private
     * @type {number}
     */
    this.opacity_ = (opacity <= 1) ? opacity : opacity / 255;
};
goog.inherits(fiahfy.mod.scene.paint.Color, fiahfy.mod.Object);

/**
 * @public
 * @return {number} The blue component of the Color.
 */
fiahfy.mod.scene.paint.Color.prototype.getBlue = function() {
    return this.blue_;
};

/**
 * @public
 * @return {number} The green component of the Color.
 */
fiahfy.mod.scene.paint.Color.prototype.getGreen = function() {
    return this.green_;
};

/**
 * @public
 * @return {number} The red component of the Color.
 */
fiahfy.mod.scene.paint.Color.prototype.getRed = function() {
    return this.red_;
};

/**
 * @const
 * @public
 * @return {string} Color string.
 */
fiahfy.mod.scene.paint.Color.prototype.getWeb = function() {
    return '#' +
        ('00' + (this.red_ * 255).toString(16)).slice(-2) +
        ('00' + (this.green_ * 255).toString(16)).slice(-2) +
        ('00' + (this.blue_ * 255).toString(16)).slice(-2);
};

/**
 * @const
 * @public
 * @param {number} red The red component of the Color.
 * @param {number} green The green component of the Color.
 * @param {number} blue The blue component of the Color.
 * @param {number=} opacity The opacity component of the Color.
 * @return {fiahfy.mod.scene.paint.Color} Color object.
 */
fiahfy.mod.scene.paint.Color.color = function(red, green, blue, opacity) {
    return new fiahfy.mod.scene.paint.Color(red, green, blue, opacity);
};

/**
 * @const
 * @public
 * @param {number} red The red component of the Color.
 * @param {number} green The green component of the Color.
 * @param {number} blue The blue component of the Color.
 * @param {number=} opacity The opacity component of the Color.
 * @return {fiahfy.mod.scene.paint.Color} Color object.
 */
fiahfy.mod.scene.paint.Color.rgb = function(red, green, blue, opacity) {
    return new fiahfy.mod.scene.paint.Color(red, green, blue, opacity);
};

/**
 * @const
 * @public
 * @param {string} colorString Color string.
 * @return {fiahfy.mod.scene.paint.Color} Color object.
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
    fiahfy.mod.scene.paint.Color.web('#ff0000');

/**
 * @const
 * @public
 * @type {fiahfy.mod.scene.paint.Color}
 */
fiahfy.mod.scene.paint.Color.GREEN =
    fiahfy.mod.scene.paint.Color.web('#00ff00');

/**
 * @const
 * @public
 * @type {fiahfy.mod.scene.paint.Color}
 */
fiahfy.mod.scene.paint.Color.BLUE =
    fiahfy.mod.scene.paint.Color.web('#0000ff');

/**
 * @const
 * @public
 * @type {fiahfy.mod.scene.paint.Color}
 */
fiahfy.mod.scene.paint.Color.BLACK =
    fiahfy.mod.scene.paint.Color.web('#000000');

/**
 * @const
 * @public
 * @type {fiahfy.mod.scene.paint.Color}
 */
fiahfy.mod.scene.paint.Color.GRAY =
    fiahfy.mod.scene.paint.Color.web('#808080');

/**
 * @const
 * @public
 * @type {fiahfy.mod.scene.paint.Color}
 */
fiahfy.mod.scene.paint.Color.WHITE =
    fiahfy.mod.scene.paint.Color.web('#ffffff');
