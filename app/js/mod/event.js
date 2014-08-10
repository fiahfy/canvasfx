//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.event.Event');
goog.provide('fiahfy.mod.event.EventListener');

goog.require('fiahfy.mod.Object');


/**
 * @constructor
 * @extends {fiahfy.mod.Object}
 */
fiahfy.mod.event.Event = function() {
    fiahfy.mod.Object.call(this);
};
goog.inherits(fiahfy.mod.event.Event, fiahfy.mod.Object);

/**
 * @constructor
 * @extends {fiahfy.mod.Object}
 */
fiahfy.mod.event.EventListener = function() {
    fiahfy.mod.Object.call(this);
};
goog.inherits(fiahfy.mod.event.EventListener, fiahfy.mod.Object);

/**
 * @public
 * @param {fiahfy.mod.event.Event} event
 */
fiahfy.mod.event.EventListener.prototype.handle = goog.abstractMethod;
