//


/**
 * @fileoverview xxx
 */


fmod.time = {};


/**
 * @param {number} millis Create a new instance with milliseconds.
 * @constructor
 * @extends {fmod.Object}
 */
fmod.time.Duration = function(millis) {
    fmod.Object.call(this);

    /**
     * milliseconds
     * @private
     * @type {number}
     */
    this.millis_ = millis;
};
fmod.inherit(fmod.time.Duration, fmod.Object);
