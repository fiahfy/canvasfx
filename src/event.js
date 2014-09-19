//


/**
 * @fileoverview Provides basic framework, their delivery and handling.
 */


canvasfx.event = {};


/**
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.event.Event = function() {
    canvasfx.Object.call(this);
};
canvasfx.inherit(canvasfx.event.Event, canvasfx.Object);


/**
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.event.EventListener = function() {
    canvasfx.Object.call(this);
};
canvasfx.inherit(canvasfx.event.EventListener, canvasfx.Object);


/**
 * @constructor
 * @extends {canvasfx.event.EventListener}
 */
canvasfx.event.EventHandler = function() {
    canvasfx.event.EventListener.call(this);
};
canvasfx.inherit(canvasfx.event.EventHandler, canvasfx.event.EventListener);

/**
 * @param {canvasfx.event.Event} event The event which occurred.
 */
canvasfx.event.EventHandler.prototype.handle = canvasfx.abstractMethod;


/**
 * @constructor
 * @param {string=} name
 * @extends {canvasfx.Object}
 */
canvasfx.event.EventType = function(name) {
    canvasfx.Object.call(this);

    name = canvasfx.supplement(name, 'ROOT');

    /**
     * @private
     * @type {string}
     */
    this.name_ = name;
};
canvasfx.inherit(canvasfx.event.EventType, canvasfx.Object);

/**
 * @return {string}
 */
canvasfx.event.EventType.prototype.getName = function() {
    return this.name_;
};

/**
 * @return {string}
 */
canvasfx.event.EventType.prototype.toString = function() {
    return this.getName();
};
