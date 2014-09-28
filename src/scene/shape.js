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
   * @protected
   * @type {?canvasfx.scene.paint.Color}
   */
  this.fill = null;

  /**
   * @protected
   * @type {?canvasfx.scene.paint.Color}
   */
  this.stroke = null;

  /**
   * @protected
   * @type {canvasfx.scene.shape.StrokeType}
   */
  this.strokeType = canvasfx.scene.shape.StrokeType.CENTERED;

  /**
   * @protected
   * @type {number}
   */
  this.strokeWidth = 1.0;
};
canvasfx.inherit(canvasfx.scene.shape.Shape, canvasfx.scene.Node);


/**
 * @protected
 * @return {?canvasfx.scene.paint.Color}
 */
canvasfx.scene.shape.Shape.prototype.getCurrentFill = function() {
  if (!this.fill) {
    return null;
  }
  return canvasfx.scene.paint.Color.color(
      this.fill.getRed(), this.fill.getGreen(), this.fill.getBlue(),
      this.fill.getOpacity() * this.opacity
  );
};


/**
 * @protected
 * @return {?canvasfx.scene.paint.Color}
 */
canvasfx.scene.shape.Shape.prototype.getCurrentStroke = function() {
  if (!this.stroke) {
    return null;
  }
  return canvasfx.scene.paint.Color.color(
      this.stroke.getRed(), this.stroke.getGreen(), this.stroke.getBlue(),
      this.stroke.getOpacity() * this.opacity
  );
};


/**
 * @return {?canvasfx.scene.paint.Color}
 */
canvasfx.scene.shape.Shape.prototype.getFill = function() {
  return this.fill;
};


/**
 * @return {?canvasfx.scene.paint.Color}
 */
canvasfx.scene.shape.Shape.prototype.getStroke = function() {
  return this.stroke;
};


/**
 * @return {canvasfx.scene.shape.StrokeType}
 */
canvasfx.scene.shape.Shape.prototype.getStrokeType = function() {
  return this.strokeType;
};


/**
 * @return {number}
 */
canvasfx.scene.shape.Shape.prototype.getStrokeWidth = function() {
  return this.strokeWidth;
};


/**
 * @param {?canvasfx.scene.paint.Color} value
 */
canvasfx.scene.shape.Shape.prototype.setFill = function(value) {
  this.fill = value;
};


/**
 * @param {?canvasfx.scene.paint.Color} value
 */
canvasfx.scene.shape.Shape.prototype.setStroke = function(value) {
  this.stroke = value;
};


/**
 * @param {canvasfx.scene.shape.StrokeType} value
 */
canvasfx.scene.shape.Shape.prototype.setStrokeType = function(value) {
  this.strokeType = value;
};


/**
 * @param {number} value
 */
canvasfx.scene.shape.Shape.prototype.setStrokeWidth = function(value) {
  this.strokeWidth = value;
};



/**
 * @param {number=} opt_centerX
 * @param {number=} opt_centerY
 * @param {number=} opt_radius
 * @constructor
 * @extends {canvasfx.scene.Shape}
 */
canvasfx.scene.shape.Circle = function(opt_centerX, opt_centerY, opt_radius) {
  canvasfx.scene.shape.Shape.call(this);

  /**
   * @protected
   * @type {number}
   */
  this.centerX = canvasfx.supplement(opt_centerX, 0.0);

  /**
   * @protected
   * @type {number}
   */
  this.centerY = canvasfx.supplement(opt_centerY, 0.0);

  /**
   * @protected
   * @type {number}
   */
  this.radius = canvasfx.supplement(opt_radius, 0.0);

  this.fill = canvasfx.scene.paint.Color.BLACK;
};
canvasfx.inherit(canvasfx.scene.shape.Circle, canvasfx.scene.shape.Shape);


/**
 * @param {number|canvasfx.geometry.Point} x
 * @param {number=} opt_y
 * @return {boolean}
 * @override
 */
canvasfx.scene.shape.Circle.prototype.contains = function(x, opt_y) {
  if (x instanceof canvasfx.geometry.Point) {
    opt_y = x.getY();
    x = x.getX();
  }
  var point = new canvasfx.geometry.Point(
      this.getCurrentCenterX(), this.getCurrentCenterY()
      );
  return (point.distance(x, opt_y) <= this.radius);
};


/**
 * @param {CanvasRenderingContext2D} context
 * @override
 */
canvasfx.scene.shape.Circle.prototype.draw = function(context) {
  if (this.getCurrentFill()) {
    context.fillStyle = this.getCurrentFill().getWeb();
    context.globalAlpha = this.getCurrentFill().getOpacity();
    context.setTransform(1, 0, 0, 1, 0, 0);
    this.transform(context);
    context.beginPath();
    context.arc(
        0, 0, this.radius,
        0, Math.PI * 2, false
    );
    context.fill();
  }

  if (this.getCurrentStroke()) {
    context.strokeStyle = this.getCurrentStroke().getWeb();
    context.globalAlpha = this.getCurrentStroke().getOpacity();
    context.lineWidth = this.strokeWidth;

    var offset = 0;
    switch (this.strokeType) {
      case canvasfx.scene.shape.StrokeType.OUTSIDE:
        offset = this.strokeWidth / 2;
        break;
      case canvasfx.scene.shape.StrokeType.INSIDE:
        offset = -this.strokeWidth / 2;
        break;
      case canvasfx.scene.shape.StrokeType.CENTERED:
      default:
        offset = 0;
        break;
    }

    context.setTransform(1, 0, 0, 1, 0, 0);
    this.transform(context);
    context.beginPath();
    context.arc(
        0, 0, this.radius + offset,
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
  return this.centerX + this.layoutX + this.translateX;
};


/**
 * @protected
 * @return {number}
 */
canvasfx.scene.shape.Circle.prototype.getCurrentCenterY = function() {
  return this.centerY + this.layoutY + this.translateY;
};


/**
 * @return {canvasfx.geometry.Bounds}
 * @override
 */
canvasfx.scene.shape.Circle.prototype.getLayoutBounds = function() {
  return new canvasfx.geometry.Bounds(
      this.centerX - this.radius, this.centerY - this.radius,
      2 * this.radius, 2 * this.radius
  );
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
 * @param {number=} opt_x
 * @param {number=} opt_y
 * @param {number=} opt_width
 * @param {number=} opt_height
 * @constructor
 * @extends {canvasfx.scene.Shape}
 */
canvasfx.scene.shape.Rectangle = function(opt_x, opt_y, opt_width, opt_height) {
  canvasfx.scene.shape.Shape.call(this);

  /**
   * @protected
   * @type {number}
   */
  this.height = canvasfx.supplement(opt_height, 0.0);

  /**
   * @protected
   * @type {number}
   */
  this.width = canvasfx.supplement(opt_width, 0.0);

  /**
   * @protected
   * @type {number}
   */
  this.x = canvasfx.supplement(opt_x, 0.0);

  /**
   * @protected
   * @type {number}
   */
  this.y = canvasfx.supplement(opt_y, 0.0);

  this.fill = canvasfx.scene.paint.Color.BLACK;
};
canvasfx.inherit(canvasfx.scene.shape.Rectangle, canvasfx.scene.shape.Shape);


/**
 * @param {number|canvasfx.geometry.Point} x
 * @param {number=} opt_y
 * @return {boolean}
 * @override
 */
canvasfx.scene.shape.Rectangle.prototype.contains = function(x, opt_y) {
  if (x instanceof canvasfx.geometry.Point) {
    opt_y = x.getY();
    x = x.getX();
  }
  return this.getCurrentX() <= x && x <= this.getCurrentX() &&
      this.getCurrentY() <= opt_y && opt_y <= this.getCurrentY();
};


/**
 * @param {CanvasRenderingContext2D} context
 * @override
 */
canvasfx.scene.shape.Rectangle.prototype.draw = function(context) {
  if (this.getCurrentFill()) {
    context.fillStyle = this.getCurrentFill().getWeb();
    context.globalAlpha = this.getCurrentFill().getOpacity();
    context.setTransform(1, 0, 0, 1, 0, 0);
    this.transform(context);
    context.fillRect(
        parseInt(-this.width / 2),
        parseInt(-this.height / 2),
        parseInt(this.width),
        parseInt(this.height)
    );
  }

  if (this.getCurrentStroke()) {
    context.strokeStyle = this.getCurrentStroke().getWeb();
    context.globalAlpha = this.getCurrentStroke().getOpacity();
    context.lineWidth = this.strokeWidth;

    var offsetPosition = 0;
    var offsetSize = 0;
    switch (this.strokeType) {
      case canvasfx.scene.shape.StrokeType.OUTSIDE:
        offsetPosition = -this.strokeWidth / 2;
        offsetSize = this.strokeWidth;
        break;
      case canvasfx.scene.shape.StrokeType.INSIDE:
        offsetPosition = this.strokeWidth / 2;
        offsetSize = -this.strokeWidth;
        break;
      case canvasfx.scene.shape.StrokeType.CENTERED:
      default:
        offsetPosition = (this.strokeWidth % 2) / 2;
        offsetSize = 0;
        break;
    }

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.transform(
        1, 0, 0, 1,
        offsetSize / 2 + offsetPosition,
        offsetSize / 2 + offsetPosition
    );
    this.transform(context);
    context.strokeRect(
        parseInt(-this.width / 2) - offsetSize / 2,
        parseInt(-this.height / 2) - offsetSize / 2,
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
  return this.x + this.layoutX + this.translateX;
};


/**
 * @protected
 * @return {number}
 */
canvasfx.scene.shape.Rectangle.prototype.getCurrentY = function() {
  return this.y + this.layoutY + this.translateY;
};


/**
 * @return {number}
 */
canvasfx.scene.shape.Rectangle.prototype.getHeight = function() {
  return this.height;
};


/**
 * @return {canvasfx.geometry.Bounds}
 * @override
 */
canvasfx.scene.shape.Rectangle.prototype.getLayoutBounds = function() {
  return new canvasfx.geometry.Bounds(
      this.x, this.y, this.width, this.height
  );
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
 * @param {number=} opt_startX
 * @param {number=} opt_startY
 * @param {number=} opt_endX
 * @param {number=} opt_endY
 * @constructor
 * @extends {canvasfx.scene.Shape}
 */
canvasfx.scene.shape.Line = function(
    opt_startX, opt_startY, opt_endX, opt_endY) {
  canvasfx.scene.shape.Shape.call(this);

  /**
   * @protected
   * @type {number}
   */
  this.endX = canvasfx.supplement(opt_endX, 0.0);

  /**
   * @protected
   * @type {number}
   */
  this.endY = canvasfx.supplement(opt_endY, 0.0);

  /**
   * @protected
   * @type {number}
   */
  this.startX = canvasfx.supplement(opt_startX, 0.0);

  /**
   * @protected
   * @type {number}
   */
  this.startY = canvasfx.supplement(opt_startY, 0.0);

  this.stroke = canvasfx.scene.paint.Color.BLACK;
};
canvasfx.inherit(canvasfx.scene.shape.Line, canvasfx.scene.shape.Shape);


/**
 * @param {number|canvasfx.geometry.Point} x
 * @param {number=} opt_y
 * @return {boolean}
 * @override
 */
canvasfx.scene.shape.Line.prototype.contains = function(x, opt_y) {
  return false;
};


/**
 * @param {CanvasRenderingContext2D} context
 * @override
 */
canvasfx.scene.shape.Line.prototype.draw = function(context) {
  if (this.getCurrentStroke()) {
    context.strokeStyle = this.getCurrentStroke().getWeb();
    context.globalAlpha = this.getCurrentStroke().getOpacity();
    context.lineWidth = this.strokeWidth;

    var offset = (this.strokeWidth % 2) / 2;

    var lb = this.getLayoutBounds();

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.transform(1, 0, 0, 1, offset, offset);
    this.transform(context);
    context.beginPath();
    context.moveTo(
        parseInt(this.startX - lb.getMinX() - lb.getWidth() / 2),
        parseInt(this.startY - lb.getMinY() - lb.getHeight() / 2)
    );
    context.lineTo(
        parseInt(this.endX - lb.getMinX() - lb.getWidth() / 2),
        parseInt(this.endY - lb.getMinY() - lb.getHeight() / 2)
    );
    context.stroke();
  }
};


/**
 * @protected
 * @return {number}
 */
canvasfx.scene.shape.Line.prototype.getCurrentEndX = function() {
  return this.endX + this.layoutX + this.translateX;
};


/**
 * @protected
 * @return {number}
 */
canvasfx.scene.shape.Line.prototype.getCurrentEndY = function() {
  return this.endY + this.layoutY + this.translateY;
};


/**
 * @protected
 * @return {number}
 */
canvasfx.scene.shape.Line.prototype.getCurrentStartX = function() {
  return this.startX + this.layoutX + this.translateX;
};


/**
 * @protected
 * @return {number}
 */
canvasfx.scene.shape.Line.prototype.getCurrentStartY = function() {
  return this.startY + this.layoutY + this.translateY;
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
 * @return {canvasfx.geometry.Bounds}
 * @override
 */
canvasfx.scene.shape.Line.prototype.getLayoutBounds = function() {
  return new canvasfx.geometry.Bounds(
      Math.min(this.startX, this.endX), Math.min(this.startY, this.endY),
      Math.abs(this.startX - this.endX), Math.abs(this.startY - this.endY)
  );
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
