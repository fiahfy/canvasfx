//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.scene.input.inputEvent');
goog.provide('fiahfy.mod.scene.input.mouseEvent');

goog.require('fiahfy.mod.event.Event');
goog.require('fiahfy.mod.geometry.Point');


/**
 * @constructor
 * @extends {fiahfy.mod.event.Event}
 */
fiahfy.mod.scene.input.inputEvent = function() {
    fiahfy.mod.event.Event.call(this);
};
goog.inherits(fiahfy.mod.scene.input.inputEvent, fiahfy.mod.event.Event);


/**
 * @param {number} x X.
 * @param {number} y Y.
 * @constructor
 * @extends {fiahfy.mod.scene.input.inputEvent}
 */
fiahfy.mod.scene.input.mouseEvent = function(x, y) {
    fiahfy.mod.scene.input.inputEvent.call(this);

    /**
     * Position
     * @private
     * @type {fiahfy.mod.geometry.Point}
     */
    this.position_ = new fiahfy.mod.geometry.Point(x, y);
};
goog.inherits(fiahfy.mod.scene.input.mouseEvent, fiahfy.mod.scene.input.inputEvent);

/**
 * @public
 * @return {number} X.
 */
fiahfy.mod.scene.input.mouseEvent.prototype.getX = function() {
    return this.position_.getX();
}

/**
 * @public
 * @return {number} Y.
 */
fiahfy.mod.scene.input.mouseEvent.prototype.getY = function() {
    return this.position_.getY();
}