//


/**
 * @fileoverview Provides the set of 2D classes for defining
 * and performing operations on objects related to two-dimensional geometry.
 */


canvasfx.geometry = {};


/**
 * A 2D geometric point that usually represents the x, y coordinates.
 * @param {number=} x The x coordinate of the point.
 * @param {number=} y The y coordinate of the point.
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.geometry.Point = function(x, y) {
    canvasfx.Object.call(this);

    x = canvasfx.supplement(x, 0.0);
    y = canvasfx.supplement(y, 0.0);

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
canvasfx.inherit(canvasfx.geometry.Point, canvasfx.Object);

/**
 * @param {number|canvasfx.geometry.Point} x The X coordinate addition
 *     or the point whose coordinates are to be added.
 * @param {number=} y The Y coordinate addition.
 * @return {canvasfx.geometry.Point} The point with added coordinates
 */
canvasfx.geometry.Point.prototype.add = function(x, y) {
    if (x instanceof canvasfx.geometry.Point) {
        y = x.getY();
        x = x.getX();
    }
    return new canvasfx.geometry.Point(this.x_ + x, this.y_ + y);
};

/**
 * @param {number|canvasfx.geometry.Point} x1 The x coordinate of other point
 *     or the other point.
 * @param {number=} y1 The y coordinate of other point.
 * @return {number} The distance between this point and the specified point.
 */
canvasfx.geometry.Point.prototype.distance = function(x1, y1) {
    if (x1 instanceof canvasfx.geometry.Point) {
        y1 = x1.getY();
        x1 = x1.getX();
    }
    return Math.sqrt(Math.pow(this.x_ - x1, 2) + Math.pow(this.y_ - y1, 2));
};

/**
 * @return {number} The x coordinate.
 */
canvasfx.geometry.Point.prototype.getX = function() {
    return this.x_;
};

/**
 * @return {number} The y coordinate.
 */
canvasfx.geometry.Point.prototype.getY = function() {
    return this.y_;
};


/**
 * A 2D dimension object that contains a width and a height.
 * @param {number=} width The width.
 * @param {number=} height The height.
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.geometry.Dimension = function(width, height) {
    canvasfx.Object.call(this);

    width = canvasfx.supplement(width, 0.0);
    height = canvasfx.supplement(height, 0.0);

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
canvasfx.inherit(canvasfx.geometry.Dimension, canvasfx.Object);

/**
 * @return {number} The height of the dimension.
 */
canvasfx.geometry.Dimension.prototype.getHeight = function() {
    return this.height_;
};

/**
 * @return {number} The width of the dimension.
 */
canvasfx.geometry.Dimension.prototype.getWidth = function() {
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
 * @extends {canvasfx.Object}
 */
canvasfx.geometry.Bounds = function(minX, minY, width, height) {
    canvasfx.Object.call(this);

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
canvasfx.inherit(canvasfx.geometry.Bounds, canvasfx.Object);
