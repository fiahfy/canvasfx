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
     * Position of the event relative to the origin of the MouseEvent's source.
     * @private
     * @type {fmod.geometry.Point}
     */
    this.position_ = new fmod.geometry.Point(x, y);
};
fmod.inherit(fmod.scene.input.MouseEvent,
    fmod.scene.input.InputEvent);

/**
 * @public
 * @return {number} Horizontal position of the event relative
 *     to the origin of the MouseEvent's source.
 */
fmod.scene.input.MouseEvent.prototype.getX = function() {
    return this.position_.getX();
};

/**
 * @public
 * @return {number} Vertical position of the event relative
 *     to the origin of the MouseEvent's source.
 */
fmod.scene.input.MouseEvent.prototype.getY = function() {
    return this.position_.getY();
};
