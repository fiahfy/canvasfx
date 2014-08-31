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
 * @param {number=} x Position x.
 * @param {number=} y Position y.
 * @param {number=} width Size width.
 * @param {number=} height Size height.
 * @constructor
 * @extends {fmod.scene.Shape}
 */
fmod.scene.shape.Rectangle = function(x, y, width, height) {
    fmod.scene.shape.Shape.call(this);

    x = this.supplement(x, 0.0);
    y = this.supplement(y, 0.0);
    width = this.supplement(width, 0.0);
    height = this.supplement(height, 0.0);

    /**
     * Position
     * @protected
     * @type {fmod.geometry.Point}
     */
    this.position = new fmod.geometry.Point(x, y);

    /**
     * Size
     * @protected
     * @type {fmod.geometry.Dimension}
     */
    this.size = new fmod.geometry.Dimension(width, height);

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
    return this.position.getX() <= x && x <= this.position.getX() &&
        this.position.getY() <= y && y <= this.position.getY();
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
            parseInt(this.position.getX()),
            parseInt(this.position.getY()),
            parseInt(this.size.getWidth()),
            parseInt(this.size.getHeight())
        );
    }

    if (this.stroke) {
        context.strokeStyle = this.stroke.getWeb();
        context.lineWidth = this.strokeWidth;

        var offsetPosition = offsetSize = 0;
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
            parseInt(this.position.getX()) + offsetPosition,
            parseInt(this.position.getY()) + offsetPosition,
            parseInt(this.size.getWidth()) + offsetSize,
            parseInt(this.size.getHeight()) + offsetSize
        );
    }
};


/**
 * @param {number=} x Position x.
 * @param {number=} y Position y.
 * @param {number=} radius Radius.
 * @constructor
 * @extends {fmod.scene.Shape}
 */
fmod.scene.shape.Circle = function(x, y, radius) {
    fmod.scene.shape.Shape.call(this);

    x = this.supplement(x, 0.0);
    y = this.supplement(y, 0.0);
    radius = this.supplement(radius, 0.0);

    /**
     * Position
     * @protected
     * @type {fmod.geometry.Point}
     */
    this.position = new fmod.geometry.Point(x, y);

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
    if (x instanceof fmod.geometry.Dimension) {
        y = x.getY();
        x = x.getX();
    }
    return (this.position.distance(x, y) <= this.radius);
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
            parseInt(this.position.getX()),
            parseInt(this.position.getY()),
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
            parseInt(this.position.getX()),
            parseInt(this.position.getY()),
            this.radius + offset,
            0, Math.PI * 2, false
        );
        context.stroke();
    }
};

/**
 * @public
 * @param {number} x
 */
fmod.scene.shape.Circle.prototype.setCenterX = function(x) {
    this.position = new fmod.geometry.Point(x, this.position.getY());
};

/**
 * @public
 * @param {number} y
 */
fmod.scene.shape.Circle.prototype.setCenterY = function(y) {
    this.position = new fmod.geometry.Point(this.position.getX(), y);
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

    startX = this.supplement(startX, 0.0);
    startY = this.supplement(startY, 0.0);
    endX = this.supplement(endX, 0.0);
    endY = this.supplement(endY, 0.0);

    /**
     * Start position
     * @protected
     * @type {fmod.geometry.Point}
     */
    this.start = new fmod.geometry.Point(startX, startY);

    /**
     * End position
     * @protected
     * @type {fmod.geometry.Point}
     */
    this.end = new fmod.geometry.Point(endX, endY);

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
        parseInt(this.start.getX()) + offset,
        parseInt(this.start.getY()) + offset
    );
    context.lineTo(
        parseInt(this.end.getX()) + offset,
        parseInt(this.end.getY()) + offset
    );
    context.stroke();
};
