//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.time.Duration');

goog.require('fiahfy.mod.Object');


/**
 * @param {number} millis Create a new instance with milliseconds.
 * @constructor
 * @extends {fiahfy.mod.Object}
 */
fiahfy.mod.time.Duration = function(millis) {
    fiahfy.mod.Object.call(this);

    /**
     * milliseconds
     * @private
     * @type {number}
     */
    this.millis_ = millis;
};
goog.inherits(fiahfy.mod.time.Duration, fiahfy.mod.Object);
