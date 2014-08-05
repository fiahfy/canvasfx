//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.scene.shape.Shape');
goog.provide('fiahfy.mod.scene.shape.Line');
goog.provide('fiahfy.mod.scene.shape.Rectangle');

goog.require('fiahfy.mod.geometry.Dimension');
goog.require('fiahfy.mod.geometry.Point');
goog.require('fiahfy.mod.scene.paint.Color');


/**
 * @constructor
 */
fiahfy.mod.scene.shape.Shape = function() {
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
 fiahfy.mod.scene.shape.Shape.prototype.draw = goog.abstractMethod;

/**
 * @public
 * @param {number} width
 * @override
 */
fiahfy.mod.scene.shape.Shape.prototype.setStrokeWidth = function(width) {
    this.strokeWidth = width;
};

/**
 * @public
 * @param {?fiahfy.mod.scene.paint.Color} color
 * @override
 */
fiahfy.mod.scene.shape.Shape.prototype.setStroke = function(color) {
    this.stroke = color;
};

/**
 * @public
 * @param {?fiahfy.mod.scene.paint.Color} color
 * @override
 */
fiahfy.mod.scene.shape.Shape.prototype.setFill = function(color) {
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
    fiahfy.mod.scene.shape.Shape.call(this);
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
goog.inherits(fiahfy.mod.scene.shape.Rectangle, fiahfy.mod.scene.shape.Shape);

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
    fiahfy.mod.scene.shape.Shape.call(this);
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
goog.inherits(fiahfy.mod.scene.shape.Line, fiahfy.mod.scene.shape.Shape);

/**
 * @public
 * @param {CanvasRenderingContext2D} context Canvas DOM element
 * @override
 */
fiahfy.mod.scene.shape.Line.prototype.draw = function(context) {
    if (this.stroke === null) return;

    context.beginPath();
    context.lineWidth = this.strokeWidth;
    var offset = (this.strokeWidth % 2) * 0.5;
    context.strokeStyle = 'rgb(' +
        255 * this.stroke.getRed() + ',' +
        255 * this.stroke.getGreen() + ',' +
        255 * this.stroke.getBlue() + ')';
    context.moveTo(this.start.getX()+offset, this.start.getY()+offset);
    context.lineTo(this.end.getX()+offset, this.end.getY()+offset);
    context.stroke();
};
