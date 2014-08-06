//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.scene.Scene');

goog.require('fiahfy.mod.Object');
goog.require('fiahfy.mod.geometry.Dimension');
goog.require('fiahfy.mod.scene.shape.Shape');


/**
 * @constructor
 */
fiahfy.mod.scene.Scene = function() {
    fiahfy.mod.Object.call(this);

    /**
     * Placed shapes on this scene
     * @private
     * @type {Array}
     */
    this.shapes_ = [];

    /**
     * Size
     * @private
     * @type {fiahfy.mod.geometry.Dimension}
     */
    this.size_ = new fiahfy.mod.geometry.Dimension();
};
goog.inherits(fiahfy.mod.scene.Scene, fiahfy.mod.Object);

/**
 * @public
 * @param {number|fiahfy.mod.geometry.Dimension} width Width or Dimension
 * @param {number} height height
 */
fiahfy.mod.scene.Scene.prototype.setSize = function(width, height) {
    if (width instanceof fiahfy.mod.geometry.Dimension) {
        this.size_ = width.clone();
    } else {
        this.size_ = new fiahfy.mod.geometry.Dimension(width, height);
    }
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
    this.clear(context);

    for (var i = 0; i < this.shapes_.length; i++)
    {
        var shape = this.shapes_[i];
        shape.draw(context);
    }
};

/**
 * @public
 * @param {CanvasRenderingContext2D} context
 */
fiahfy.mod.scene.Scene.prototype.clear = function(context) {
    var rect = new fiahfy.mod.scene.shape.Rectangle(
        0, 0,
        this.size_.getWidth(), this.size_.getHeight()
    );
    rect.setFill(fiahfy.mod.scene.paint.Color.WHITE);
    rect.draw(context);
};
