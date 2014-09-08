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


/**
 * @constructor
 * @param {string=} name
 * @extends {fmod.Object}
 */
fmod.event.EventType = function(name) {
    fmod.Object.call(this);

    name = fmod.supplement(name, 'ROOT');

    /**
     * @private
     * @type {string}
     */
    this.name_ = name;
};
fmod.inherit(fmod.event.EventType, fmod.Object);

/**
 * @return {string}
 */
fmod.event.EventType.prototype.getName = function() {
    return this.name_;
};

/**
 * @return {string}
 */
fmod.event.EventType.prototype.toString = function() {
    return this.getName();
};
