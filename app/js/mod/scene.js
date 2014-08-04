//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.scene.Scene');

goog.require('fiahfy.mod.scene.shape.Shape');


/**
 * @constructor
 */
fiahfy.mod.scene.Scene = function() {
    /**
     * Placed shapes on this scene
     * @private
     * @type {Array}
     */
    this.shapes_ = [];
};

/**
 * @public
 * @param {fiahfy.mod.scene.shape.Shape} shape
 */
fiahfy.mod.scene.Scene.prototype.add = function(shape) {
    this.shapes_.push(shape);
};

/**
 * @public
 * @param {CanvasRenderingContext2D} context
 */
fiahfy.mod.scene.Scene.prototype.draw = function(context) {
    for (var i = 0; i < this.shapes_.length; i++)
    {
        var shape = this.shapes_[i];
        shape.draw(context);
    }
};
