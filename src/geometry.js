//


/**
 * @fileoverview xxx
 */


canvasfx.geometry = {};


/**
 * @param {number=} x
 * @param {number=} y
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.geometry.Point = function(x, y) {
    canvasfx.Object.call(this);

    x = canvasfx.supplement(x, 0.0);
    y = canvasfx.supplement(y, 0.0);

    /**
     * @private
     * @type {number}
     */
    this.x_ = x;

    /**
     * @private
     * @type {number}
     */
    this.y_ = y;
};
canvasfx.inherit(canvasfx.geometry.Point, canvasfx.Object);

/**
 * @param {number|canvasfx.geometry.Point} x
 * @param {number=} y
 * @return {canvasfx.geometry.Point}
 */
canvasfx.geometry.Point.prototype.add = function(x, y) {
    if (x instanceof canvasfx.geometry.Point) {
        y = x.getY();
        x = x.getX();
    }
    return new canvasfx.geometry.Point(this.x_ + x, this.y_ + y);
};

/**
 * @param {number|canvasfx.geometry.Point} x1
 * @param {number=} y1
 * @return {number}
 */
canvasfx.geometry.Point.prototype.distance = function(x1, y1) {
    if (x1 instanceof canvasfx.geometry.Point) {
        y1 = x1.getY();
        x1 = x1.getX();
    }
    return Math.sqrt(Math.pow(this.x_ - x1, 2) + Math.pow(this.y_ - y1, 2));
};

/**
 * @return {number}
 */
canvasfx.geometry.Point.prototype.getX = function() {
    return this.x_;
};

/**
 * @return {number}
 */
canvasfx.geometry.Point.prototype.getY = function() {
    return this.y_;
};


/**
 * @param {number=} width
 * @param {number=} height
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.geometry.Dimension = function(width, height) {
    canvasfx.Object.call(this);

    width = canvasfx.supplement(width, 0.0);
    height = canvasfx.supplement(height, 0.0);

    /**
     * @private
     * @type {number}
     */
    this.width_ = width;

    /**
     * @private
     * @type {number}
     */
    this.height_ = height;
};
canvasfx.inherit(canvasfx.geometry.Dimension, canvasfx.Object);

/**
 * @return {number}
 */
canvasfx.geometry.Dimension.prototype.getHeight = function() {
    return this.height_;
};

/**
 * @return {number}
 */
canvasfx.geometry.Dimension.prototype.getWidth = function() {
    return this.width_;
};


/**
 * @param {number} minX
 * @param {number} minY
 * @param {number} width
 * @param {number} height
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.geometry.Bounds = function(minX, minY, width, height) {
    canvasfx.Object.call(this);

    /**
     * @private
     * @type {number}
     */
    this.minX_ = minX;

    /**
     * @private
     * @type {number}
     */
    this.minY_ = minY;

    /**
     * @private
     * @type {number}
     */
    this.width_ = width;

    /**
     * @private
     * @type {number}
     */
    this.height_ = height;
};
canvasfx.inherit(canvasfx.geometry.Bounds, canvasfx.Object);
