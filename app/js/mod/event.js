//


/**
 * @fileoverview Provides basic framework, their delivery and handling.
 */


fmod.event = {};


/**
 * @constructor
 * @extends {fmod.Object}
 */
fmod.event.Event = function() {
    fmod.Object.call(this);
};
fmod.inherit(fmod.event.Event, fmod.Object);

/**
 * @constructor
 * @extends {fmod.Object}
 */
fmod.event.EventListener = function() {
    fmod.Object.call(this);
};
fmod.inherit(fmod.event.EventListener, fmod.Object);

/**
 * @constructor
 * @extends {fmod.event.EventListener}
 */
fmod.event.EventHandler = function() {
    fmod.event.EventListener.call(this);
};
fmod.inherit(fmod.event.EventHandler, fmod.event.EventListener);

/**
 * @public
 * @param {fmod.event.Event} event The event which occurred.
 */
fmod.event.EventHandler.prototype.handle = fmod.abstractMethod;
