//


/**
 * @fileoverview xxx
 */


fmod.scene.shape = {};


/**
 * @enum {string}
 */
fmod.scene.shape.StrokeType = {
    CENTERED: 'centered',
    INSIDE: 'inside',
    OUTSIDE: 'outside'
};


/**
 * @constructor
 * @extends {fmod.scene.Node}
 */
fmod.scene.shape.Shape = function() {
    fmod.scene.Node.call(this);

    /**
     * Fill color
     * @protected
     * @type {?fmod.scene.paint.Color}
     */
    this.fill = null;

    /**
     * Stroke color
     * @protected
     * @type {?fmod.scene.paint.Color}
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
     * @type {fmod.scene.shape.StrokeType}
     */
    this.strokeType = fmod.scene.shape.StrokeType.CENTERED;
};
fmod.inherit(fmod.scene.shape.Shape, fmod.scene.Node);

/**
 * @public
 * @param {?fmod.scene.paint.Color} color Fill color.
 */
fmod.scene.shape.Shape.prototype.setFill = function(color) {
    this.fill = color;
};

/**
 * @public
 * @param {?fmod.scene.paint.Color} color Stroke color.
 */
fmod.scene.shape.Shape.prototype.setStroke = function(color) {
    this.stroke = color;
};

/**
 * @public
 * @param {fmod.scene.shape.StrokeType} type Stroke type.
 */
fmod.scene.shape.Shape.prototype.setStrokeType = function(type) {
    this.strokeType = type;
};

/**
 * @public
 * @param {number} width Stroke width.
 */
fmod.scene.shape.Shape.prototype.setStrokeWidth = function(width) {
    this.strokeWidth = width;
};


/**
 * @param {number=} centerX Center position x.
 * @param {number=} centerY Center position y.
 * @param {number=} radius Radius.
 * @constructor
 * @extends {fmod.scene.Shape}
 */
fmod.scene.shape.Circle = function(centerX, centerY, radius) {
    fmod.scene.shape.Shape.call(this);

    centerX = fmod.supplement(centerX, 0.0);
    centerY = fmod.supplement(centerY, 0.0);
    radius = fmod.supplement(radius, 0.0);

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

    this.fill = fmod.scene.paint.Color.BLACK;
};
fmod.inherit(fmod.scene.shape.Circle, fmod.scene.shape.Shape);

/**
 * @public
 * @param {number|fmod.geometry.Point} x
 * @param {number=} y
 * @return {boolean}
 */
fmod.scene.shape.Circle.prototype.contains = function(x, y) {
    var point = new fmod.geometry.Point(
        this.getCurrentCenterX(), this.getCurrentCenterY()
    );
    return (point.distance(x, y) <= this.radius);
};

/**
 * @public
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 * @override
 */
fmod.scene.shape.Circle.prototype.draw = function(context) {
    if (this.fill) {
        context.beginPath();
        context.fillStyle = this.fill.getWeb();
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
        context.lineWidth = this.strokeWidth;

        var offset = 0;
        switch (this.strokeType) {
            case fmod.scene.shape.StrokeType.OUTSIDE:
                offset = 0.5 * this.strokeWidth;
                break;
            case fmod.scene.shape.StrokeType.INSIDE:
                offset = - 0.5 * this.strokeWidth;
                break;
            case fmod.scene.shape.StrokeType.CENTERED:
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
 * @public
 * @return {number}
 */
fmod.scene.shape.Circle.prototype.getCenterX = function() {
    return this.centerX;
};

/**
 * @public
 * @return {number}
 */
fmod.scene.shape.Circle.prototype.getCenterY = function() {
    return this.centerY;
};

/**
 * @protected
 * @return {number}
 */
fmod.scene.shape.Circle.prototype.getCurrentCenterX = function() {
    return this.centerX + this.layoutX;
};

/**
 * @protected
 * @return {number}
 */
fmod.scene.shape.Circle.prototype.getCurrentCenterY = function() {
    return this.centerY + this.layoutY;
};

/**
 * @public
 * @return {number}
 */
fmod.scene.shape.Circle.prototype.getRadius = function() {
    return this.radius;
};

/**
 * @public
 * @param {number} centerX
 */
fmod.scene.shape.Circle.prototype.setCenterX = function(centerX) {
    this.centerX = centerX;
};

/**
 * @public
 * @param {number} centerY
 */
fmod.scene.shape.Circle.prototype.setCenterY = function(centerY) {
    this.centerY = centerY;
};

/**
 * @public
 * @param {number} radius
 */
fmod.scene.shape.Circle.prototype.setRadius = function(radius) {
    this.radius = radius;
};


/**
 * @param {number=} x Position x.
 * @param {number=} y Position y.
 * @param {number=} width Size width.
 * @param {number=} height Size height.
 * @constructor
 * @extends {fmod.scene.Shape}
 */
fmod.scene.shape.Rectangle = function(x, y, width, height) {
    fmod.scene.shape.Shape.call(this);

    x = fmod.supplement(x, 0.0);
    y = fmod.supplement(y, 0.0);
    width = fmod.supplement(width, 0.0);
    height = fmod.supplement(height, 0.0);

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

    this.fill = fmod.scene.paint.Color.BLACK;
};
fmod.inherit(fmod.scene.shape.Rectangle, fmod.scene.shape.Shape);

/**
 * @public
 * @param {number|fmod.geometry.Point} x
 * @param {number=} y
 * @return {boolean}
 */
fmod.scene.shape.Rectangle.prototype.contains = function(x, y) {
    if (x instanceof fmod.geometry.Dimension) {
        y = x.getY();
        x = x.getX();
    }
    return this.getCurrentX() <= x && x <= this.getCurrentX() &&
        this.getCurrentY() <= y && y <= this.getCurrentY();
};

/**
 * @public
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 * @override
 */
fmod.scene.shape.Rectangle.prototype.draw = function(context) {
    if (this.fill) {
        context.fillStyle = this.fill.getWeb();
        context.fillRect(
            parseInt(this.getCurrentX()),
            parseInt(this.getCurrentY()),
            parseInt(this.width),
            parseInt(this.height)
        );
    }

    if (this.stroke) {
        context.strokeStyle = this.stroke.getWeb();
        context.lineWidth = this.strokeWidth;

        var offsetPosition = 0;
        var offsetSize = 0;
        switch (this.strokeType) {
            case fmod.scene.shape.StrokeType.OUTSIDE:
                offsetPosition = - 0.5 * this.strokeWidth;
                offsetSize = this.strokeWidth;
                break;
            case fmod.scene.shape.StrokeType.INSIDE:
                offsetPosition = 0.5 * this.strokeWidth;
                offsetSize = - this.strokeWidth;
                break;
            case fmod.scene.shape.StrokeType.CENTERED:
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
fmod.scene.shape.Rectangle.prototype.getCurrentX = function() {
    return this.x + this.layoutX;
};

/**
 * @protected
 * @return {number}
 */
fmod.scene.shape.Rectangle.prototype.getCurrentY = function() {
    return this.y + this.layoutY;
};

/**
 * @public
 * @return {number}
 */
fmod.scene.shape.Rectangle.prototype.getHeight = function() {
    return this.height;
};

/**
 * @public
 * @return {number}
 */
fmod.scene.shape.Rectangle.prototype.getWitdh = function() {
    return this.width;
};

/**
 * @public
 * @return {number}
 */
fmod.scene.shape.Rectangle.prototype.getX = function() {
    return this.x;
};

/**
 * @public
 * @return {number}
 */
fmod.scene.shape.Rectangle.prototype.getY = function() {
    return this.y;
};

/**
 * @public
 * @param {number} height
 */
fmod.scene.shape.Rectangle.prototype.setHeight = function(height) {
    this.height = height;
};

/**
 * @public
 * @param {number} width
 */
fmod.scene.shape.Rectangle.prototype.setWidth = function(width) {
    this.width = width;
};

/**
 * @public
 * @param {number} x
 */
fmod.scene.shape.Rectangle.prototype.setX = function(x) {
    this.x = x;
};

/**
 * @public
 * @param {number} y
 */
fmod.scene.shape.Rectangle.prototype.setY = function(y) {
    this.y = y;
};


/**
 * @param {number=} startX Start position x.
 * @param {number=} startY Start position y.
 * @param {number=} endX End position x.
 * @param {number=} endY End position y.
 * @constructor
 * @extends {fmod.scene.Shape}
 */
fmod.scene.shape.Line = function(startX, startY, endX, endY) {
    fmod.scene.shape.Shape.call(this);

    startX = fmod.supplement(startX, 0.0);
    startY = fmod.supplement(startY, 0.0);
    endX = fmod.supplement(endX, 0.0);
    endY = fmod.supplement(endY, 0.0);

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

    this.stroke = fmod.scene.paint.Color.BLACK;
};
fmod.inherit(fmod.scene.shape.Line, fmod.scene.shape.Shape);

/**
 * @public
 * @param {number|fmod.geometry.Point} x
 * @param {number=} y
 * @return {boolean}
 */
fmod.scene.shape.Line.prototype.contains = function(x, y) {
    return false;
};

/**
 * @public
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 * @override
 */
fmod.scene.shape.Line.prototype.draw = function(context) {
    if (this.stroke === null) return;

    context.beginPath();
    context.strokeStyle = this.stroke.getWeb();
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
fmod.scene.shape.Line.prototype.getCurrentEndX = function() {
    return this.endX + this.layoutX;
};

/**
 * @protected
 * @return {number}
 */
fmod.scene.shape.Line.prototype.getCurrentEndY = function() {
    return this.endY + this.layoutY;
};

/**
 * @protected
 * @return {number}
 */
fmod.scene.shape.Line.prototype.getCurrentStartX = function() {
    return this.startX + this.layoutX;
};

/**
 * @protected
 * @return {number}
 */
fmod.scene.shape.Line.prototype.getCurrentStartY = function() {
    return this.startY + this.layoutY;
};

/**
 * @public
 * @return {number}
 */
fmod.scene.shape.Line.prototype.getEndX = function() {
    return this.endX;
};

/**
 * @public
 * @return {number}
 */
fmod.scene.shape.Line.prototype.getEndY = function() {
    return this.endY;
};

/**
 * @public
 * @return {number}
 */
fmod.scene.shape.Line.prototype.getStartX = function() {
    return this.startX;
};

/**
 * @public
 * @return {number}
 */
fmod.scene.shape.Line.prototype.getStartY = function() {
    return this.startY;
};

/**
 * @public
 * @param {number} endX
 */
fmod.scene.shape.Line.prototype.setEndX = function(endX) {
    this.endX = endX;
};

/**
 * @public
 * @param {number} endY
 */
fmod.scene.shape.Line.prototype.setEndY = function(endY) {
    this.endY = endY;
};

/**
 * @public
 * @param {number} startX
 */
fmod.scene.shape.Line.prototype.seStartX = function(startX) {
    this.startX = startX;
};

/**
 * @public
 * @param {number} startY
 */
fmod.scene.shape.Line.prototype.seStartY = function(startY) {
    this.startY = startY;
};
