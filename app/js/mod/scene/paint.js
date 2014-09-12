//


/**
 * @fileoverview Provides the set of classes for colors
 * and gradients used to fill shapes
 * and backgrounds when rendering the scene graph.
 */


fmod.scene.paint = {};


/**
 * The Color class is used to encapsulate colors
 * in the default sRGB color space.
 * @param {number|string=} red Red component ranging from 0 to 1
 *     or the name or numeric representation of the color
 *     in one of the supported formats
 * @param {number=} green Green component ranging from 0 to 1.
 * @param {number=} blue Blue component ranging from 0 to 1.
 * @param {number=} opacity Opacity ranging from 0 to 1.
 * @constructor
 * @extends {fmod.Object}
 */
fmod.scene.paint.Color = function(red, green, blue, opacity) {
    fmod.Object.call(this);

    red = fmod.supplement(red, 0.0);
    green = fmod.supplement(green, 0.0);
    blue = fmod.supplement(blue, 0.0);
    opacity = fmod.supplement(opacity, 0.0);

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
     * Red component ranging from 0 to 1.
     * @private
     * @type {number}
     */
    this.red_ = (red <= 1) ? red : red / 255;

    /**
     * Green component ranging from 0 to 1.
     * @private
     * @type {number}
     */
    this.green_ = (green <= 1) ? green : green / 255;

    /**
     * Blue component ranging from 0 to 1.
     * @private
     * @type {number}
     */
    this.blue_ = (blue <= 1) ? blue : blue / 255;

    /**
     * Opacity ranging from 0 to 1.
     * @private
     * @type {number}
     */
    this.opacity_ = (opacity <= 1) ? opacity : opacity / 255;
};
fmod.inherit(fmod.scene.paint.Color, fmod.Object);

/**
 * @return {number} The blue component of the Color, in the range 0.0-1.0.
 */
fmod.scene.paint.Color.prototype.getBlue = function() {
    return this.blue_;
};

/**
 * @return {number} The green component of the Color, in the range 0.0-1.0.
 */
fmod.scene.paint.Color.prototype.getGreen = function() {
    return this.green_;
};

/**
 * @return {number} The red component of the Color, in the range 0.0-1.0.
 */
fmod.scene.paint.Color.prototype.getRed = function() {
    return this.red_;
};

/**
 * @const
 * @return {string} The numeric representation of the color
 *     in one of the supported formats
 */
fmod.scene.paint.Color.prototype.getWeb = function() {
    return '#' +
        ('00' + (this.red_ * 255).toString(16)).slice(-2) +
        ('00' + (this.green_ * 255).toString(16)).slice(-2) +
        ('00' + (this.blue_ * 255).toString(16)).slice(-2);
};

/**
 * @const
 * @param {number} red Red component ranging from 0 to 1.
 * @param {number} green Green component ranging from 0 to 1.
 * @param {number} blue Blue component ranging from 0 to 1.
 * @param {number=} opacity Opacity ranging from 0 to 1.
 * @return {fmod.scene.paint.Color} The Color.
 */
fmod.scene.paint.Color.color = function(red, green, blue, opacity) {
    return new fmod.scene.paint.Color(red, green, blue, opacity);
};

/**
 * @const
 * @param {number} red The red component, in the range 0-255.
 * @param {number} green The green component, in the range 0-255.
 * @param {number} blue The blue component, in the range 0-255.
 * @param {number=} opacity The opacity component, in the range 0.0-1.0.
 * @return {fmod.scene.paint.Color} The Color.
 */
fmod.scene.paint.Color.rgb = function(red, green, blue, opacity) {
    return new fmod.scene.paint.Color(red, green, blue, opacity);
};

/**
 * @const
 * @param {string} colorString The name or numeric representation of the color
 *     in one of the supported formats.
 * @return {fmod.scene.paint.Color} The Color.
 */
fmod.scene.paint.Color.web = function(colorString) {
    return new fmod.scene.paint.Color(colorString);
};

/**
 * @const
 * @type {fmod.scene.paint.Color}
 */
fmod.scene.paint.Color.RED =
    fmod.scene.paint.Color.web('#ff0000');

/**
 * @const
 * @type {fmod.scene.paint.Color}
 */
fmod.scene.paint.Color.GREEN =
    fmod.scene.paint.Color.web('#00ff00');

/**
 * @const
 * @type {fmod.scene.paint.Color}
 */
fmod.scene.paint.Color.BLUE =
    fmod.scene.paint.Color.web('#0000ff');

/**
 * @const
 * @type {fmod.scene.paint.Color}
 */
fmod.scene.paint.Color.BLACK =
    fmod.scene.paint.Color.web('#000000');

/**
 * @const
 * @type {fmod.scene.paint.Color}
 */
fmod.scene.paint.Color.GRAY =
    fmod.scene.paint.Color.web('#808080');

/**
 * @const
 * @type {fmod.scene.paint.Color}
 */
fmod.scene.paint.Color.WHITE =
    fmod.scene.paint.Color.web('#ffffff');
