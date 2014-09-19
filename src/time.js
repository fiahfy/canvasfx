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
