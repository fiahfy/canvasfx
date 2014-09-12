//


/**
 * @fileoverview Provides the set of classes for mouse and keyboard
 * input event handling.
 */


fmod.scene.input = {};


/**
 * @constructor
 * @extends {fmod.event.Event}
 */
fmod.scene.input.InputEvent = function() {
    fmod.event.Event.call(this);
};
fmod.inherit(fmod.scene.input.InputEvent, fmod.event.Event);


/**
 * @param {number} x Horizontal position of the event relative
 *     to the origin of the MouseEvent's source.
 * @param {number} y Vertical position of the event relative
 *     to the origin of the MouseEvent's source.
 * @constructor
 * @extends {fmod.scene.input.InputEvent}
 */
fmod.scene.input.MouseEvent = function(x, y) {
    fmod.scene.input.InputEvent.call(this);

    /**
     * @private
     * @type {number}
     */
    this.x_ = x;

    /**
     * @private
     * @type {number}
     */
    this.y_ = y;

    /**
     * @private
     * @type {fmod.event.EventType}
     */
    this.eventType_ = null;
};
fmod.inherit(fmod.scene.input.MouseEvent,
    fmod.scene.input.InputEvent);

/**
 * @return {fmod.event.EventType} eventType
 */
fmod.scene.input.MouseEvent.prototype.getEventType = function() {
    return this.eventType_;
};

/**
 * @return {number} Horizontal position of the event relative
 *     to the origin of the MouseEvent's source.
 */
fmod.scene.input.MouseEvent.prototype.getX = function() {
    return this.x_;
};

/**
 * @return {number} Vertical position of the event relative
 *     to the origin of the MouseEvent's source.
 */
fmod.scene.input.MouseEvent.prototype.getY = function() {
    return this.y_;
};

/**
 * @param {fmod.event.EventType} eventType
 */
fmod.scene.input.MouseEvent.prototype.setEventType = function(eventType) {
    this.eventType_ = eventType;
};

/**
 * @const
 * @type {fmod.event.EventType}
 */
fmod.scene.input.MouseEvent.MOUSE_CLICKED =
    new fmod.event.EventType('MOUSE_CLICKED');

/**
 * @const
 * @type {fmod.event.EventType}
 */
fmod.scene.input.MouseEvent.MOUSE_DRAGGED =
    new fmod.event.EventType('MOUSE_DRAGGED');
