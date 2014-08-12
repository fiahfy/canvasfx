//


/**
 * @fileoverview Provides the set of classes for mouse and keyboard
 * input event handling.
 */


goog.provide('fiahfy.mod.scene.input.InputEvent');
goog.provide('fiahfy.mod.scene.input.MouseEvent');

goog.require('fiahfy.mod.event.Event');
goog.require('fiahfy.mod.geometry.Point');


/**
 * @constructor
 * @extends {fiahfy.mod.event.Event}
 */
fiahfy.mod.scene.input.InputEvent = function() {
    fiahfy.mod.event.Event.call(this);
};
goog.inherits(fiahfy.mod.scene.input.InputEvent, fiahfy.mod.event.Event);


/**
 * @param {number} x Horizontal position of the event relative
 *     to the origin of the MouseEvent's source.
 * @param {number} y Vertical position of the event relative
 *     to the origin of the MouseEvent's source.
 * @constructor
 * @extends {fiahfy.mod.scene.input.InputEvent}
 */
fiahfy.mod.scene.input.MouseEvent = function(x, y) {
    fiahfy.mod.scene.input.InputEvent.call(this);

    /**
     * Position of the event relative to the origin of the MouseEvent's source.
     * @private
     * @type {fiahfy.mod.geometry.Point}
     */
    this.position_ = new fiahfy.mod.geometry.Point(x, y);
};
goog.inherits(fiahfy.mod.scene.input.MouseEvent,
    fiahfy.mod.scene.input.InputEvent);

/**
 * @public
 * @return {number} Horizontal position of the event relative
 *     to the origin of the MouseEvent's source.
 */
fiahfy.mod.scene.input.MouseEvent.prototype.getX = function() {
    return this.position_.getX();
};

/**
 * @public
 * @return {number} Vertical position of the event relative
 *     to the origin of the MouseEvent's source.
 */
fiahfy.mod.scene.input.MouseEvent.prototype.getY = function() {
    return this.position_.getY();
};
