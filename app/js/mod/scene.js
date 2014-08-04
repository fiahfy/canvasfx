//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.scene.Scene');

goog.require('fiahfy.mod.scene.paint.Color');


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
 * @constructor
 */
fiahfy.mod.scene.Shape = function() {
    /**
     * Stroke width
     * @protected
     * @type {number}
     */
    this.strokeWidth = 1.0;

    /**
     * Stroke color
     * @protected
     * @type {?fiahfy.mod.scene.paint.Color}
     */
    this.stroke = null;

    /**
     * Fill color
     * @protected
     * @type {?fiahfy.mod.scene.paint.Color}
     */
    this.fill = null;
};

/**
 * @public
 * @param {CanvasRenderingContext2D} context Canvas DOM element
 * @override
 */
 fiahfy.mod.scene.Shape.prototype.draw = goog.abstractMethod;

/**
 * @public
 * @param {number} width
 * @override
 */
fiahfy.mod.scene.Shape.prototype.setStrokeWidth = function(width) {
    this.strokeWidth = width;
};

/**
 * @public
 * @param {?fiahfy.mod.scene.paint.Color} color
 * @override
 */
fiahfy.mod.scene.Shape.prototype.setStroke = function(color) {
    this.stroke = color;
};

/**
 * @public
 * @param {?fiahfy.mod.scene.paint.Color} color
 * @override
 */
fiahfy.mod.scene.Shape.prototype.setFill = function(color) {
    this.fill = color;
};
