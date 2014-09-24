//


/**
 * @fileoverview xxx
 */


canvasfx.scene.shape = {};


/**
 * @enum {string}
 */
canvasfx.scene.shape.StrokeType = {
    CENTERED: 'centered',
    INSIDE: 'inside',
    OUTSIDE: 'outside'
};


/**
 * @constructor
 * @extends {canvasfx.scene.Node}
 */
canvasfx.scene.shape.Shape = function() {
    canvasfx.scene.Node.call(this);

    /**
     * Fill color
     * @protected
     * @type {?canvasfx.scene.paint.Color}
     */
    this.fill = null;

    /**
     * Stroke color
     * @protected
     * @type {?canvasfx.scene.paint.Color}
     */
    this.stroke = null;

    /**
     * Stroke width
     * @protected
     * @type {number}
     */
    this.strokeWidth = 1.0;

    /**
     * Stroke type
     * @protected
     * @type {canvasfx.scene.shape.StrokeType}
     */
    this.strokeType = canvasfx.scene.shape.StrokeType.CENTERED;
};
canvasfx.inherit(canvasfx.scene.shape.Shape, canvasfx.scene.Node);

/**
 * @param {?canvasfx.scene.paint.Color} value Fill color.
 */
canvasfx.scene.shape.Shape.prototype.setFill = function(value) {
    this.fill = value;
};

/**
 * @param {?canvasfx.scene.paint.Color} value Stroke color.
 */
canvasfx.scene.shape.Shape.prototype.setStroke = function(value) {
    this.stroke = value;
};

/**
 * @param {canvasfx.scene.shape.StrokeType} value Stroke type.
 */
canvasfx.scene.shape.Shape.prototype.setStrokeType = function(value) {
    this.strokeType = value;
};

/**
 * @param {number} value Stroke width.
 */
canvasfx.scene.shape.Shape.prototype.setStrokeWidth = function(value) {
    this.strokeWidth = value;
};


/**
 * @param {number=} centerX Center position x.
 * @param {number=} centerY Center position y.
 * @param {number=} radius Radius.
 * @constructor
 * @extends {canvasfx.scene.Shape}
 */
canvasfx.scene.shape.Circle = function(centerX, centerY, radius) {
    canvasfx.scene.shape.Shape.call(this);

    centerX = canvasfx.supplement(centerX, 0.0);
    centerY = canvasfx.supplement(centerY, 0.0);
    radius = canvasfx.supplement(radius, 0.0);

    /**
     * Center x
     * @protected
     * @type {number}
     */
    this.centerX = centerX;

    /**
     * Center y
     * @protected
     * @type {number}
     */
    this.centerY = centerY;

    /**
     * Radius
     * @protected
     * @type {number}
     */
    this.radius = radius;

    this.fill = canvasfx.scene.paint.Color.BLACK;
};
canvasfx.inherit(canvasfx.scene.shape.Circle, canvasfx.scene.shape.Shape);

/**
 * @param {number|canvasfx.geometry.Point} x
 * @param {number=} y
 * @return {boolean}
 */
canvasfx.scene.shape.Circle.prototype.contains = function(x, y) {
    var point = new canvasfx.geometry.Point(
        this.getCurrentCenterX(), this.getCurrentCenterY()
    );
    return (point.distance(x, y) <= this.radius);
};

/**
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 * @override
 */
canvasfx.scene.shape.Circle.prototype.draw = function(context) {
    if (this.fill) {
        context.beginPath();
        context.fillStyle = this.fill.getWeb();
        context.globalAlpha = this.fill.getOpacity();
        context.arc(
            parseInt(this.getCurrentCenterX()),
            parseInt(this.getCurrentCenterY()),
            this.radius,
            0, Math.PI * 2, false
        );
        context.fill();
    }

    if (this.stroke) {
        context.beginPath();
        context.strokeStyle = this.stroke.getWeb();
        context.globalAlpha = this.stroke.getOpacity();
        context.lineWidth = this.strokeWidth;

        var offset = 0;
        switch (this.strokeType) {
            case canvasfx.scene.shape.StrokeType.OUTSIDE:
                offset = 0.5 * this.strokeWidth;
                break;
            case canvasfx.scene.shape.StrokeType.INSIDE:
                offset = - 0.5 * this.strokeWidth;
                break;
            case canvasfx.scene.shape.StrokeType.CENTERED:
            default:
                offset = 0;
                break;
        }
        context.arc(
            parseInt(this.getCurrentCenterX()),
            parseInt(this.getCurrentCenterY()),
            this.radius + offset,
            0, Math.PI * 2, false
        );
        context.stroke();
    }
};

/**
 * @return {number}
 */
canvasfx.scene.shape.Circle.prototype.getCenterX = function() {
    return this.centerX;
};

/**
 * @return {number}
 */
canvasfx.scene.shape.Circle.prototype.getCenterY = function() {
    return this.centerY;
};

/**
 * @protected
 * @return {number}
 */
canvasfx.scene.shape.Circle.prototype.getCurrentCenterX = function() {
    return this.centerX + this.layoutX;
};

/**
 * @protected
 * @return {number}
 */
canvasfx.scene.shape.Circle.prototype.getCurrentCenterY = function() {
    return this.centerY + this.layoutY;
};

/**
 * @return {number}
 */
canvasfx.scene.shape.Circle.prototype.getRadius = function() {
    return this.radius;
};

/**
 * @param {number} value
 */
canvasfx.scene.shape.Circle.prototype.setCenterX = function(value) {
    this.centerX = value;
};

/**
 * @param {number} value
 */
canvasfx.scene.shape.Circle.prototype.setCenterY = function(value) {
    this.centerY = value;
};

/**
 * @param {number} value
 */
canvasfx.scene.shape.Circle.prototype.setRadius = function(value) {
    this.radius = value;
};


/**
 * @param {number=} x Position x.
 * @param {number=} y Position y.
 * @param {number=} width Size width.
 * @param {number=} height Size height.
 * @constructor
 * @extends {canvasfx.scene.Shape}
 */
canvasfx.scene.shape.Rectangle = function(x, y, width, height) {
    canvasfx.scene.shape.Shape.call(this);

    x = canvasfx.supplement(x, 0.0);
    y = canvasfx.supplement(y, 0.0);
    width = canvasfx.supplement(width, 0.0);
    height = canvasfx.supplement(height, 0.0);

    /**
     * Position x
     * @protected
     * @type {number}
     */
    this.x = x;

    /**
     * Position y
     * @protected
     * @type {number}
     */
    this.y = y;

    /**
     * Width
     * @protected
     * @type {number}
     */
    this.width = width;

    /**
     * Height
     * @protected
     * @type {number}
     */
    this.height = height;

    this.fill = canvasfx.scene.paint.Color.BLACK;
};
canvasfx.inherit(canvasfx.scene.shape.Rectangle, canvasfx.scene.shape.Shape);

/**
 * @param {number|canvasfx.geometry.Point} x
 * @param {number=} y
 * @return {boolean}
 */
canvasfx.scene.shape.Rectangle.prototype.contains = function(x, y) {
    if (x instanceof canvasfx.geometry.Dimension) {
        y = x.getY();
        x = x.getX();
    }
    return this.getCurrentX() <= x && x <= this.getCurrentX() &&
        this.getCurrentY() <= y && y <= this.getCurrentY();
};

/**
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 * @override
 */
canvasfx.scene.shape.Rectangle.prototype.draw = function(context) {
    if (this.fill) {
        context.fillStyle = this.fill.getWeb();
        context.globalAlpha = this.fill.getOpacity();
        context.fillRect(
            parseInt(this.getCurrentX()),
            parseInt(this.getCurrentY()),
            parseInt(this.width),
            parseInt(this.height)
        );
    }

    if (this.stroke) {
        context.strokeStyle = this.stroke.getWeb();
        context.globalAlpha = this.stroke.getOpacity();
        context.lineWidth = this.strokeWidth;

        var offsetPosition = 0;
        var offsetSize = 0;
        switch (this.strokeType) {
            case canvasfx.scene.shape.StrokeType.OUTSIDE:
                offsetPosition = - 0.5 * this.strokeWidth;
                offsetSize = this.strokeWidth;
                break;
            case canvasfx.scene.shape.StrokeType.INSIDE:
                offsetPosition = 0.5 * this.strokeWidth;
                offsetSize = - this.strokeWidth;
                break;
            case canvasfx.scene.shape.StrokeType.CENTERED:
            default:
                offsetPosition = 0.5 * (this.strokeWidth % 2);
                offsetSize = 0;
                break;
        }
        context.strokeRect(
            parseInt(this.getCurrentX()) + offsetPosition,
            parseInt(this.getCurrentY()) + offsetPosition,
            parseInt(this.width) + offsetSize,
            parseInt(this.height) + offsetSize
        );
    }
};

/**
 * @protected
 * @return {number}
 */
canvasfx.scene.shape.Rectangle.prototype.getCurrentX = function() {
    return this.x + this.layoutX;
};

/**
 * @protected
 * @return {number}
 */
canvasfx.scene.shape.Rectangle.prototype.getCurrentY = function() {
    return this.y + this.layoutY;
};

/**
 * @return {number}
 */
canvasfx.scene.shape.Rectangle.prototype.getHeight = function() {
    return this.height;
};

/**
 * @return {number}
 */
canvasfx.scene.shape.Rectangle.prototype.getWitdh = function() {
    return this.width;
};

/**
 * @return {number}
 */
canvasfx.scene.shape.Rectangle.prototype.getX = function() {
    return this.x;
};

/**
 * @return {number}
 */
canvasfx.scene.shape.Rectangle.prototype.getY = function() {
    return this.y;
};

/**
 * @param {number} value
 */
canvasfx.scene.shape.Rectangle.prototype.setHeight = function(value) {
    this.height = value;
};

/**
 * @param {number} value
 */
canvasfx.scene.shape.Rectangle.prototype.setWidth = function(value) {
    this.width = value;
};

/**
 * @param {number} value
 */
canvasfx.scene.shape.Rectangle.prototype.setX = function(value) {
    this.x = value;
};

/**
 * @param {number} value
 */
canvasfx.scene.shape.Rectangle.prototype.setY = function(value) {
    this.y = value;
};


/**
 * @param {number=} startX Start position x.
 * @param {number=} startY Start position y.
 * @param {number=} endX End position x.
 * @param {number=} endY End position y.
 * @constructor
 * @extends {canvasfx.scene.Shape}
 */
canvasfx.scene.shape.Line = function(startX, startY, endX, endY) {
    canvasfx.scene.shape.Shape.call(this);

    startX = canvasfx.supplement(startX, 0.0);
    startY = canvasfx.supplement(startY, 0.0);
    endX = canvasfx.supplement(endX, 0.0);
    endY = canvasfx.supplement(endY, 0.0);

    /**
     * Start position x
     * @protected
     * @type {number}
     */
    this.startX = startX;

    /**
     * Start position y
     * @protected
     * @type {number}
     */
    this.startY = startY;

    /**
     * End position x
     * @protected
     * @type {number}
     */
    this.endX = endX;

    /**
     * End position y
     * @protected
     * @type {number}
     */
    this.endY = endY;

    this.stroke = canvasfx.scene.paint.Color.BLACK;
};
canvasfx.inherit(canvasfx.scene.shape.Line, canvasfx.scene.shape.Shape);

/**
 * @param {number|canvasfx.geometry.Point} x
 * @param {number=} y
 * @return {boolean}
 */
canvasfx.scene.shape.Line.prototype.contains = function(x, y) {
    return false;
};

/**
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 * @override
 */
canvasfx.scene.shape.Line.prototype.draw = function(context) {
    if (this.stroke === null) return;

    context.beginPath();
    context.strokeStyle = this.stroke.getWeb();
    context.globalAlpha = this.stroke.getOpacity();
    context.lineWidth = this.strokeWidth;

    var offset = 0.5 * (this.strokeWidth % 2);
    context.moveTo(
        parseInt(this.getCurrentStartX()) + offset,
        parseInt(this.getCurrentStartY()) + offset
    );
    context.lineTo(
        parseInt(this.getCurrentEndX()) + offset,
        parseInt(this.getCurrentEndY()) + offset
    );
    context.stroke();
};

/**
 * @protected
 * @return {number}
 */
canvasfx.scene.shape.Line.prototype.getCurrentEndX = function() {
    return this.endX + this.layoutX;
};

/**
 * @protected
 * @return {number}
 */
canvasfx.scene.shape.Line.prototype.getCurrentEndY = function() {
    return this.endY + this.layoutY;
};

/**
 * @protected
 * @return {number}
 */
canvasfx.scene.shape.Line.prototype.getCurrentStartX = function() {
    return this.startX + this.layoutX;
};

/**
 * @protected
 * @return {number}
 */
canvasfx.scene.shape.Line.prototype.getCurrentStartY = function() {
    return this.startY + this.layoutY;
};

/**
 * @return {number}
 */
canvasfx.scene.shape.Line.prototype.getEndX = function() {
    return this.endX;
};

/**
 * @return {number}
 */
canvasfx.scene.shape.Line.prototype.getEndY = function() {
    return this.endY;
};

/**
 * @return {number}
 */
canvasfx.scene.shape.Line.prototype.getStartX = function() {
    return this.startX;
};

/**
 * @return {number}
 */
canvasfx.scene.shape.Line.prototype.getStartY = function() {
    return this.startY;
};

/**
 * @param {number} value
 */
canvasfx.scene.shape.Line.prototype.setEndX = function(value) {
    this.endX = value;
};

/**
 * @param {number} value
 */
canvasfx.scene.shape.Line.prototype.setEndY = function(value) {
    this.endY = value;
};

/**
 * @param {number} value
 */
canvasfx.scene.shape.Line.prototype.seStartX = function(value) {
    this.startX = value;
};

/**
 * @param {number} value
 */
canvasfx.scene.shape.Line.prototype.seStartY = function(value) {
    this.startY = value;
};
