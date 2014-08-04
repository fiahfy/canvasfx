//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.geometry.Dimension');
goog.provide('fiahfy.mod.geometry.Point');


/**
 * @param {number} x x
 * @param {number} y y
 * @constructor
 */
fiahfy.mod.geometry.Point = function(x, y) {
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
 * @param {number} width width
 * @param {number} height height
 * @constructor
 */
fiahfy.mod.geometry.Dimension = function(width, height) {
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
