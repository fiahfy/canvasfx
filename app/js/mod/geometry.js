//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.geometry.Dimension');
goog.provide('fiahfy.mod.geometry.Point');

goog.require('fiahfy.mod.Object');


/**
 * @param {number=0} x x
 * @param {number=0} y y
 * @constructor
 */
fiahfy.mod.geometry.Point = function(x, y) {
    fiahfy.mod.Object.call(this);

    /**
     * x
     * @private
     * @type {number}
     */
    this.x_ = x || 0.0;

    /**
     * y
     * @private
     * @type {number}
     */
    this.y_ = y || 0.0;
};
goog.inherits(fiahfy.mod.geometry.Point, fiahfy.mod.Object);

/**
 * @public
 * @return {number} x
 */
fiahfy.mod.geometry.Point.prototype.getX = function() {
    return this.x_;
}

/**
 * @public
 * @return {number} y
 */
fiahfy.mod.geometry.Point.prototype.getY = function() {
    return this.y_;
}


/**
 * @param {number=0} width width
 * @param {number=0} height height
 * @constructor
 */
fiahfy.mod.geometry.Dimension = function(width, height) {
    fiahfy.mod.Object.call(this);

    /**
     * width
     * @type {number}
     * @private
     */
    this.width_ = width || 0.0;

    /**
     * height
     * @type {number}
     * @private
     */
    this.height_ = height || 0.0;
};
goog.inherits(fiahfy.mod.geometry.Dimension, fiahfy.mod.Object);

/**
 * @public
 * @return {number} width
 */
fiahfy.mod.geometry.Dimension.prototype.getWidth = function() {
    return this.width_;
}

/**
 * @public
 * @return {number} height
 */
fiahfy.mod.geometry.Dimension.prototype.getHeight = function() {
    return this.height_;
}
