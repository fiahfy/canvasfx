//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.geometry.Dimension');
goog.provide('fiahfy.mod.geometry.Point');

goog.require('fiahfy.mod.Object');


/**
 * @param {number=} x x.
 * @param {number=} y y.
 * @constructor
 */
fiahfy.mod.geometry.Point = function(x, y) {
    fiahfy.mod.Object.call(this);

    x = this.supplement(x, 0.0);
    y = this.supplement(y, 0.0);

    /**
     * x
     * @private
     * @type {number}
     */
    this.x_ = x;

    /**
     * y
     * @private
     * @type {number}
     */
    this.y_ = y;
};
goog.inherits(fiahfy.mod.geometry.Point, fiahfy.mod.Object);

/**
 * @public
 * @return {number} x X.
 */
fiahfy.mod.geometry.Point.prototype.getX = function() {
    return this.x_;
}

/**
 * @public
 * @return {number} y Y.
 */
fiahfy.mod.geometry.Point.prototype.getY = function() {
    return this.y_;
}


/**
 * @param {number=} width Width.
 * @param {number=} height Height.
 * @constructor
 */
fiahfy.mod.geometry.Dimension = function(width, height) {
    fiahfy.mod.Object.call(this);

    width = this.supplement(width, 0.0);
    height = this.supplement(height, 0.0);

    /**
     * width
     * @type {number}
     * @private
     */
    this.width_ = width;

    /**
     * height
     * @type {number}
     * @private
     */
    this.height_ = height;
};
goog.inherits(fiahfy.mod.geometry.Dimension, fiahfy.mod.Object);

/**
 * @public
 * @return {number} width Width.
 */
fiahfy.mod.geometry.Dimension.prototype.getWidth = function() {
    return this.width_;
}

/**
 * @public
 * @return {number} height Height.
 */
fiahfy.mod.geometry.Dimension.prototype.getHeight = function() {
    return this.height_;
}
