//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.geometry.Dimension');
goog.provide('fiahfy.mod.geometry.Point');

goog.require('fiahfy.mod.Object');


/**
 * @param {number=} x X.
 * @param {number=} y Y.
 * @constructor
 * @extends {fiahfy.mod.Object}
 */
fiahfy.mod.geometry.Point = function(x, y) {
    fiahfy.mod.Object.call(this);

    x = this.supplement(x, 0.0);
    y = this.supplement(y, 0.0);

    /**
     * X
     * @private
     * @type {number}
     */
    this.x_ = x;

    /**
     * Y
     * @private
     * @type {number}
     */
    this.y_ = y;
};
goog.inherits(fiahfy.mod.geometry.Point, fiahfy.mod.Object);

/**
 * @public
 * @return {number} X.
 */
fiahfy.mod.geometry.Point.prototype.getX = function() {
    return this.x_;
}

/**
 * @public
 * @return {number} Y.
 */
fiahfy.mod.geometry.Point.prototype.getY = function() {
    return this.y_;
}

/**
 * @public
 * @param {number} x X.
 * @param {number} y Y.
 * @return {fiahfy.mod.geometry.Point} Point added the coordinates.
 */
fiahfy.mod.geometry.Point.prototype.add = function(x, y) {
    return new fiahfy.mod.geometry.Point(this.x_ + x, this.y_ + y);
}

/**
 * @param {number=} width Width.
 * @param {number=} height Height.
 * @constructor
 * @extends {fiahfy.mod.Object}
 */
fiahfy.mod.geometry.Dimension = function(width, height) {
    fiahfy.mod.Object.call(this);

    width = this.supplement(width, 0.0);
    height = this.supplement(height, 0.0);

    /**
     * Width
     * @type {number}
     * @private
     */
    this.width_ = width;

    /**
     * Height
     * @type {number}
     * @private
     */
    this.height_ = height;
};
goog.inherits(fiahfy.mod.geometry.Dimension, fiahfy.mod.Object);

/**
 * @public
 * @return {number} Width.
 */
fiahfy.mod.geometry.Dimension.prototype.getWidth = function() {
    return this.width_;
}

/**
 * @public
 * @return {number} Height.
 */
fiahfy.mod.geometry.Dimension.prototype.getHeight = function() {
    return this.height_;
}
