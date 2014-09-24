//


/**
 * @fileoverview Provides the set of classes for mouse and keyboard
 * input event handling.
 */


canvasfx.scene.input = {};


/**
 * @param {canvasfx.event.EventType} eventType The type of the event.
 * @constructor
 * @extends {canvasfx.event.Event}
 */
canvasfx.scene.input.InputEvent = function(eventType) {
    canvasfx.event.Event.call(this);

    /**
     * @protected
     * @type {canvasfx.event.EventType}
     */
    this.eventType = eventType;
};
canvasfx.inherit(canvasfx.scene.input.InputEvent, canvasfx.event.Event);


/**
 * @param {canvasfx.event.EventType} eventType The type of the event.
 * @param {number} x Horizontal position of the event relative
 *     to the origin of the MouseEvent's source.
 * @param {number} y Vertical position of the event relative
 *     to the origin of the MouseEvent's source.
 * @constructor
 * @extends {canvasfx.scene.input.InputEvent}
 */
canvasfx.scene.input.MouseEvent = function(eventType, x, y) {
    canvasfx.scene.input.InputEvent.call(this, eventType);

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
};
canvasfx.inherit(canvasfx.scene.input.MouseEvent,
    canvasfx.scene.input.InputEvent);

/**
 * @return {number} Horizontal position of the event relative
 *     to the origin of the MouseEvent's source.
 */
canvasfx.scene.input.MouseEvent.prototype.getX = function() {
    return this.x_;
};

/**
 * @return {number} Vertical position of the event relative
 *     to the origin of the MouseEvent's source.
 */
canvasfx.scene.input.MouseEvent.prototype.getY = function() {
    return this.y_;
};

/**
 * @const
 * @type {canvasfx.event.EventType}
 */
canvasfx.scene.input.MouseEvent.MOUSE_CLICKED =
    new canvasfx.event.EventType('MOUSE_CLICKED');

/**
 * @const
 * @type {canvasfx.event.EventType}
 */
canvasfx.scene.input.MouseEvent.MOUSE_DRAGGED =
    new canvasfx.event.EventType('MOUSE_DRAGGED');
