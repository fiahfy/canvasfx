//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.geometory.Dimension');
goog.provide('fiahfy.mod.geometory.Point');


/**
 * @param {Number} x Position x
 * @param {Number} y Position y
 * @constructor
 */
fiahfy.mod.geometory.Point = function(x, y) {
    /**
     * Position x
     * @private
     * @type {Number}
     */
    this.x_ = x;

    /**
     * Position y
     * @private
     * @type {Number}
     */
    this.y_ = y;
};

/**
 * @public
 * @return {Number} Position x
 */
fiahfy.mod.geometory.Point.prototype.getX = function() {
    return this.x_;
}

/**
 * @public
 * @return {Number} Position y
 */
fiahfy.mod.geometory.Point.prototype.getY = function() {
    return this.y_;
}


/**
 * @param {Number} width Dimension width
 * @param {Number} height Dimension height
 * @constructor
 */
fiahfy.mod.geometory.Dimension = function(width, height) {
    /**
     * Dimension width
     * @type {Number}
     * @private
     */
    this.width_ = width;

    /**
     * Dimension height
     * @type {Number}
     * @private
     */
    this.height_ = height;
};

/**
 * @public
 * @return {Number} Dimension width
 */
fiahfy.mod.geometory.Dimension.prototype.getWidth = function() {
    return this.width_;
}

/**
 * @public
 * @return {Number} Dimension height
 */
fiahfy.mod.geometory.Dimension.prototype.getHeight = function() {
    return this.height_;
}
