//


/**
 * @fileoverview xxx
 */


canvasfx.time = {};


/**
 * @param {number} millis Create a new instance with milliseconds.
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.time.Duration = function(millis) {
    canvasfx.Object.call(this);

    /**
     * milliseconds
     * @private
     * @type {number}
     */
    this.millis_ = millis;
};
canvasfx.inherit(canvasfx.time.Duration, canvasfx.Object);

/**
 * @const
 * @type {canvasfx.time.Duration}
 */
canvasfx.time.Duration.INFINITY = new canvasfx.time.Duration(Infinity);

/**
 * @const
 * @type {canvasfx.time.Duration}
 */
canvasfx.time.Duration.ONE = new canvasfx.time.Duration(1);

/**
 * @const
 * @type {canvasfx.time.Duration}
 */
canvasfx.time.Duration.ZERO = new canvasfx.time.Duration(0);

/**
 * @const
 * @params {number}
 */
canvasfx.time.Duration.hours = function(h) {
    return new canvasfx.time.Duration(h * 60 * 60 * 1000);
};

/**
 * @const
 * @params {number}
 */
canvasfx.time.Duration.millis = function(ms) {
    return new canvasfx.time.Duration(ms);
};

/**
 * @const
 * @params {number}
 */
canvasfx.time.Duration.minutes = function(m) {
    return new canvasfx.time.Duration(m * 60 * 1000);
};

/**
 * @const
 * @params {number}
 */
canvasfx.time.Duration.seconds = function(s) {
    return new canvasfx.time.Duration(s * 1000);
};

/**
 * @const
 * @return {number}
 */
canvasfx.time.Duration.toHours = function() {
    return this.millis_ / 1000 / 60 / 60;
};

/**
 * @const
 * @return {number}
 */
canvasfx.time.Duration.toMillis = function() {
    return this.millis_;
};

/**
 * @const
 * @return {number}
 */
canvasfx.time.Duration.toMinutes = function() {
    return this.millis_ / 1000 / 60;
};

/**
 * @const
 * @return {number}
 */
canvasfx.time.Duration.toSeconds = function() {
    return this.millis_ / 1000;
};
