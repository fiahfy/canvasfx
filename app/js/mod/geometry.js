//


/**
 * @fileoverview Provides the set of 2D classes for defining
 * and performing operations on objects related to two-dimensional geometry.
 */


goog.provide('fiahfy.mod.geometry.Bounds');
goog.provide('fiahfy.mod.geometry.Dimension');
goog.provide('fiahfy.mod.geometry.Point');

goog.require('fiahfy.mod.Object');


/**
 * A 2D geometric point that usually represents the x, y coordinates.
 * @param {number=} x The x coordinate of the point.
 * @param {number=} y The y coordinate of the point.
 * @constructor
 * @extends {fiahfy.mod.Object}
 */
fiahfy.mod.geometry.Point = function(x, y) {
    fiahfy.mod.Object.call(this);

    x = this.supplement(x, 0.0);
    y = this.supplement(y, 0.0);

    /**
     * The x coordinate of the point.
     * @private
     * @type {number}
     */
    this.x_ = x;

    /**
     * The y coordinate of the point.
     * @private
     * @type {number}
     */
    this.y_ = y;
};
goog.inherits(fiahfy.mod.geometry.Point, fiahfy.mod.Object);

/**
 * @public
 * @param {number|fiahfy.mod.geometry.Point} x The X coordinate addition
 *     or the point whose coordinates are to be added.
 * @param {number=} y The Y coordinate addition.
 * @return {fiahfy.mod.geometry.Point} The point with added coordinates
 */
fiahfy.mod.geometry.Point.prototype.add = function(x, y) {
    if (x instanceof fiahfy.mod.geometry.Point) {
        y = x.getY();
        x = x.getX();
    }
    return new fiahfy.mod.geometry.Point(this.x_ + x, this.y_ + y);
};

/**
 * @public
 * @param {number|fiahfy.mod.geometry.Point} x The x coordinate of other point
 *     or the other point.
 * @param {number=} y The y coordinate of other point.
 * @return {number} The distance between this point and the specified point.
 */
fiahfy.mod.geometry.Point.prototype.distance = function(x, y) {
    if (x instanceof fiahfy.mod.geometry.Point) {
        y = x.getY();
        x = x.getX();
    }
    return Math.sqrt(Math.pow(this.x_ - x, 2) + Math.pow(this.y_ - y, 2));
};

/**
 * @public
 * @return {number} The x coordinate.
 */
fiahfy.mod.geometry.Point.prototype.getX = function() {
    return this.x_;
};

/**
 * @public
 * @return {number} The y coordinate.
 */
fiahfy.mod.geometry.Point.prototype.getY = function() {
    return this.y_;
};


/**
 * A 2D dimension object that contains a width and a height.
 * @param {number=} width The width.
 * @param {number=} height The height.
 * @constructor
 * @extends {fiahfy.mod.Object}
 */
fiahfy.mod.geometry.Dimension = function(width, height) {
    fiahfy.mod.Object.call(this);

    width = this.supplement(width, 0.0);
    height = this.supplement(height, 0.0);

    /**
     * The width.
     * @private
     * @type {number}
     */
    this.width_ = width;

    /**
     * The height.
     * @private
     * @type {number}
     */
    this.height_ = height;
};
goog.inherits(fiahfy.mod.geometry.Dimension, fiahfy.mod.Object);

/**
 * @public
 * @return {number} The height of the dimension.
 */
fiahfy.mod.geometry.Dimension.prototype.getHeight = function() {
    return this.height_;
};

/**
 * @public
 * @return {number} The width of the dimension.
 */
fiahfy.mod.geometry.Dimension.prototype.getWidth = function() {
    return this.width_;
};


/**
 * The base class for objects that are used to describe the bounds of a node
 * or other scene graph object.
 * @param {number} minX The X coordinate of the upper-left corner
 * @param {number} minY The Y coordinate of the upper-left corner.
 * @param {number} width The width of the Bounds.
 * @param {number} height The height of the Bounds.
 * @constructor
 * @extends {fiahfy.mod.Object}
 */
fiahfy.mod.geometry.Bounds = function(minX, minY, width, height) {
    fiahfy.mod.Object.call(this);

    /**
     * The X coordinate of the upper-left corner.
     * @type {number}
     * @private
     */
    this.minX_ = minX;

    /**
     * The Y coordinate of the upper-left corner.
     * @type {number}
     * @private
     */
    this.minY_ = minY;

    /**
     * The width of the Bounds.
     * @type {number}
     * @private
     */
    this.width_ = width;

    /**
     * The height of the Bounds.
     * @type {number}
     * @private
     */
    this.height_ = height;
};
goog.inherits(fiahfy.mod.geometry.Bounds, fiahfy.mod.Object);
