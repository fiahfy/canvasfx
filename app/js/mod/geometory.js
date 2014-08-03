//


/**
 * @fileoverview xxx
 */


goog.provide('com.blogspot.fiahfy.mod.geometory.Point');
goog.provide('com.blogspot.fiahfy.mod.geometory.Dimension');


/**
 * @param {Number} Dimension x
 * @param {Number} Dimension y
 * @constructor
 */
com.blogspot.fiahfy.mod.geometory.Point = function(x, y) {
    /**
     * Position x
     * @type {Number}
     * @private
     */
    this.x_ = x;

    /**
     * Position y
     * @type {Number}
     * @private
     */
    this.y_ = y;
};

/**
 * @public
 * @return {Number} Position x
 */
com.blogspot.fiahfy.mod.geometory.Point.prototype.getX = function() {
	return this.x_;
}

/**
 * @public
 * @return {Number} Position y
 */
com.blogspot.fiahfy.mod.geometory.Point.prototype.getY = function() {
	return this.y_;
}


/**
 * @param {Number} Dimension width
 * @param {Number} Dimension height
 * @constructor
 */
com.blogspot.fiahfy.mod.geometory.Dimension = function(width, height) {
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
com.blogspot.fiahfy.mod.geometory.Dimension.prototype.getWidth = function() {
	return this.width_;
}

/**
 * @public
 * @return {Number} Dimension height
 */
com.blogspot.fiahfy.mod.geometory.Dimension.prototype.getHeight = function() {
	return this.height_;
}
