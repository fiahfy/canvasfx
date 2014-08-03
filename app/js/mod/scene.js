//


/**
 * @fileoverview xxx
 */


goog.provide('com.blogspot.fiahfy.mod.scene.Scene');
goog.provide('com.blogspot.fiahfy.mod.scene.shape.Rectangle');

goog.require('com.blogspot.fiahfy.mod.geometory.Point');
goog.require('com.blogspot.fiahfy.mod.geometory.Dimension');


/**
 * @constructor
 */
com.blogspot.fiahfy.mod.scene.Scene = function(element) {
    /**
     * Placed shapes on this scene
     * @type {Array}
     * @private
     */
    this.shapes_ = [];
};

/**
 * @public
 * @param {com.blogspot.fiahfy.mod.scene.Shape} 
 */
com.blogspot.fiahfy.mod.scene.Scene.prototype.add = function(shape) {
	this.shapes_.push(shape);
};

/**
 * @public
 * @param {CanvasRenderingContext2D} 
 */
com.blogspot.fiahfy.mod.scene.Scene.prototype.draw = function(context) {
	for (var i = 0; i < this.shapes_.length; i++)
	{
		var shape = this.shapes_[i];
		shape.draw(context);
	}
};


/**
 * @constructor
 */
com.blogspot.fiahfy.mod.scene.Shape = function(x, y) {
    /**
     * Position
     * @type {com.blogspot.fiahfy.mod.geometory.Point}
     * @public
     */
    this.position = new com.blogspot.fiahfy.mod.geometory.Point(x, y);
};

/**
 * @public
 * @param {CanvasRenderingContext2D} Canvas DOM element
 * @override
 */
 com.blogspot.fiahfy.mod.scene.Shape.prototype.draw = function(context) {};


/**
 * @constructor
 * @extends {com.blogspot.fiahfy.mod.scene.Shape}
 */
com.blogspot.fiahfy.mod.scene.shape.Rectangle = function(x, y, width, height) {
	com.blogspot.fiahfy.mod.scene.Shape.call(this, x, y);
    /**
     * Size
     * @type {com.blogspot.fiahfy.mod.geometory.Dimension}
     * @public
     */
    this.size = new com.blogspot.fiahfy.mod.geometory.Dimension(width, height);
};
goog.inherits(com.blogspot.fiahfy.mod.scene.shape.Rectangle, com.blogspot.fiahfy.mod.scene.Shape);

/**
 * @public
 * @param {CanvasRenderingContext2D} Canvas DOM element
 * @override
 */
com.blogspot.fiahfy.mod.scene.shape.Rectangle.prototype.draw = function(context) {
	context.beginPath();
	context.strokeRect(this.position.getX(), this.position.getY(),
		this.size.getWidth(), this.size.getHeight());
}
