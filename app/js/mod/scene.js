//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.scene.Scene');
goog.provide('fiahfy.mod.scene.paint.Color');
goog.provide('fiahfy.mod.scene.shape.Line');
goog.provide('fiahfy.mod.scene.shape.Rectangle');

goog.require('fiahfy.mod.geometry.Dimension');
goog.require('fiahfy.mod.geometry.Point');


/**
 * @constructor
 */
fiahfy.mod.scene.Scene = function() {
    /**
     * Placed shapes on this scene
     * @private
     * @type {Array}
     */
    this.shapes_ = [];
};

/**
 * @public
 * @param {fiahfy.mod.scene.Shape} shape
 */
fiahfy.mod.scene.Scene.prototype.add = function(shape) {
    this.shapes_.push(shape);
};

/**
 * @public
 * @param {CanvasRenderingContext2D} context
 */
fiahfy.mod.scene.Scene.prototype.draw = function(context) {
    for (var i = 0; i < this.shapes_.length; i++)
    {
        var shape = this.shapes_[i];
        shape.draw(context);
    }
};


/**
 * @constructor
 */
fiahfy.mod.scene.Shape = function() {
    /**
     * Stroke width
     * @protected
     * @type {number}
     */
    this.strokeWidth = 1.0;

    /**
     * Stroke color
     * @protected
     * @type {?fiahfy.mod.scene.paint.Color}
     */
    this.stroke = null;

    /**
     * Fill color
     * @protected
     * @type {?fiahfy.mod.scene.paint.Color}
     */
    this.fill = null;
};

/**
 * @public
 * @param {CanvasRenderingContext2D} context Canvas DOM element
 * @override
 */
 fiahfy.mod.scene.Shape.prototype.draw = goog.abstractMethod;

/**
 * @public
 * @param {number} width
 * @override
 */
fiahfy.mod.scene.Shape.prototype.setStrokeWidth = function(width) {
    this.strokeWidth = width;
};

/**
 * @public
 * @param {?fiahfy.mod.scene.paint.Color} color
 * @override
 */
fiahfy.mod.scene.Shape.prototype.setStroke = function(color) {
    this.stroke = color;
};

/**
 * @public
 * @param {?fiahfy.mod.scene.paint.Color} color
 * @override
 */
fiahfy.mod.scene.Shape.prototype.setFill = function(color) {
    this.fill = color;
};


/**
 * @param {number} x Position x
 * @param {number} y Position y
 * @param {number} width Size width
 * @param {number} height Size height
 * @constructor
 * @extends {fiahfy.mod.scene.Shape}
 */
fiahfy.mod.scene.shape.Rectangle = function(x, y, width, height) {
    fiahfy.mod.scene.Shape.call(this);
    /**
     * Position
     * @protected
     * @type {fiahfy.mod.geometry.Point}
     */
    this.position = new fiahfy.mod.geometry.Point(x, y);
    /**
     * Size
     * @protected
     * @type {fiahfy.mod.geometry.Dimension}
     */
    this.size = new fiahfy.mod.geometry.Dimension(width, height);
};
goog.inherits(fiahfy.mod.scene.shape.Rectangle, fiahfy.mod.scene.Shape);

/**
 * @public
 * @param {CanvasRenderingContext2D} context Canvas DOM element
 * @override
 */
fiahfy.mod.scene.shape.Rectangle.prototype.draw = function(context) {
    context.beginPath();
    //context.fillStyle = '#f00';
    context.fillRect(this.position.getX(), this.position.getY(),
        this.size.getWidth(), this.size.getHeight());
    //context.strokeRect(this.position.getX(), this.position.getY(),
    //    this.size.getWidth(), this.size.getHeight());
};


/**
 * @param {number} startX Start position x
 * @param {number} startY Start position y
 * @param {number} endX End position x
 * @param {number} endY End position y
 * @constructor
 * @extends {fiahfy.mod.scene.Shape}
 */
fiahfy.mod.scene.shape.Line = function(startX, startY, endX, endY) {
    fiahfy.mod.scene.Shape.call(this);
    /**
     * Start position
     * @protected
     * @type {fiahfy.mod.geometry.Point}
     */
    this.start = new fiahfy.mod.geometry.Point(startX, startY);
    /**
     * End position
     * @protected
     * @type {fiahfy.mod.geometry.Point}
     */
    this.end = new fiahfy.mod.geometry.Point(endX, endY);

    this.stroke = fiahfy.mod.scene.paint.Color.BLACK;
};
goog.inherits(fiahfy.mod.scene.shape.Line, fiahfy.mod.scene.Shape);

/**
 * @public
 * @param {CanvasRenderingContext2D} context Canvas DOM element
 * @override
 */
fiahfy.mod.scene.shape.Line.prototype.draw = function(context) {
    if (this.stroke === null) return;

    context.beginPath();
    context.strokeStyle = 'rgb(' +
        255 * this.stroke.getRed() + ',' +
        255 * this.stroke.getGreen() + ',' +
        255 * this.stroke.getBlue() + ')';
    context.moveTo(this.start.getX(), this.start.getY());
    context.lineTo(this.end.getX(), this.end.getY());
    context.stroke();
};


/**
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @param {number=1} opacity
 * @constructor
 */
fiahfy.mod.scene.paint.Color = function(red, green, blue, opacity) {
    /**
     * Red color range
     * @private
     * @type {number}
     */
    this.red_ = red;

    /**
     * Green color range
     * @private
     * @type {number}
     */
    this.green_ = green;

    /**
     * Blue color range
     * @private
     * @type {number}
     */
    this.blue_ = blue;

    /**
     * Opacity
     * @private
     * @type {number}
     */
    this.opacity_ = opacity !== null ? opacity : 1.0;
};

/**
 * @public
 * @return {number} Red color range
 */
fiahfy.mod.scene.paint.Color.prototype.getRed = function() {
    return this.red_;
};

/**
 * @public
 * @return {number} Green color range
 */
fiahfy.mod.scene.paint.Color.prototype.getGreen = function() {
    return this.green_;
};
/**
 * @public
 * @return {number} Blue color range
 */
fiahfy.mod.scene.paint.Color.prototype.getBlue = function() {
    return this.blue_;
};

/**
 * @const
 * @public
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @param {number=1} opacity
 * @return {fiahfy.mod.scene.paint.Color} Color
 */
fiahfy.mod.scene.paint.Color.color = function(red, green, blue, opacity) {
    return new fiahfy.mod.scene.paint.Color(red, green, blue, opacity);
};

/**
 * @const
 * @public
 * @type {fiahfy.mod.scene.paint.Color}
 */
fiahfy.mod.scene.paint.Color.BLUE =
    fiahfy.mod.scene.paint.Color.color(0, 0, 1.0);

/**
 * @const
 * @public
 * @type {fiahfy.mod.scene.paint.Color}
 */
fiahfy.mod.scene.paint.Color.BLACK =
    fiahfy.mod.scene.paint.Color.color(0, 0, 0);
