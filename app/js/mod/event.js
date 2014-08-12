//


/**
 * @fileoverview Provides basic framework, their delivery and handling.
 */


goog.provide('fiahfy.mod.event.Event');
goog.provide('fiahfy.mod.event.EventHandler');
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
 * @constructor
 * @extends {fiahfy.mod.event.EventListener}
 */
fiahfy.mod.event.EventHandler = function() {
    fiahfy.mod.event.EventListener.call(this);
};
goog.inherits(fiahfy.mod.event.EventHandler, fiahfy.mod.event.EventListener);

/**
 * @public
 * @param {fiahfy.mod.event.Event} event The event which occurred.
 */
fiahfy.mod.event.EventHandler.prototype.handle = goog.abstractMethod;
