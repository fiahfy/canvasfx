//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.scene.Scene');
goog.provide('fiahfy.mod.scene.shape.Rectangle');

goog.require('fiahfy.mod.geometory.Dimension');
goog.require('fiahfy.mod.geometory.Point');


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
 * @param {fiahfy.mod.scene.Shape} shape
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


/**
 * @param {Number} x Position x
 * @param {Number} y Position y
 * @constructor
 */
fiahfy.mod.scene.Shape = function(x, y) {
    /**
     * Position
     * @type {fiahfy.mod.geometory.Point}
     * @public
     */
    this.position = new fiahfy.mod.geometory.Point(x, y);
};

/**
 * @public
 * @param {CanvasRenderingContext2D} context Canvas DOM element
 * @override
 */
 fiahfy.mod.scene.Shape.prototype.draw = function(context) {};


/**
 * @param {Number} x Position x
 * @param {Number} y Position y
 * @param {Number} width Dimension width
 * @param {Number} height Dimension height
 * @constructor
 * @extends {fiahfy.mod.scene.Shape}
 */
fiahfy.mod.scene.shape.Rectangle = function(x, y, width, height) {
    fiahfy.mod.scene.Shape.call(this, x, y);
    /**
     * Size
     * @type {fiahfy.mod.geometory.Dimension}
     * @public
     */
    this.size = new fiahfy.mod.geometory.Dimension(width, height);
};
goog.inherits(fiahfy.mod.scene.shape.Rectangle, fiahfy.mod.scene.Shape);

/**
 * @public
 * @param {CanvasRenderingContext2D} context Canvas DOM element
 * @override
 */
fiahfy.mod.scene.shape.Rectangle.prototype.draw = function(context) {
    context.beginPath();
    context.strokeRect(this.position.getX(), this.position.getY(),
        this.size.getWidth(), this.size.getHeight());
}
