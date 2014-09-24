//


/**
 * @fileoverview Provides the core set of base classes for Scene Graph API.
 */


canvasfx.scene = {};


/**
 * The Scene class is the container for all content in a scene graph.
 * @param {canvasfx.scene.Node} root The root node of the scene graph.
 * @param {number=} width The width of the scene.
 * @param {number=} height The height of the scene.
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.scene.Scene = function(root, width, height) {
    canvasfx.Object.call(this);

    /**
     * The root node of the scene graph.
     * @private
     * @type {canvasfx.scene.Node}
     */
    this.root_ = root;

    /**
     * The width of the scene.
     * @private
     * @type {number}
     */
    this.width_ = width;

    /**
     * The height of the scene.
     * @private
     * @type {number}
     */
    this.height_ = height;

    /**
     * @private
     * @type {canvasfx.event.EventHandler}
     */
    this.onMouseClicked_ = null;

    /**
     * @private
     * @type {canvasfx.event.EventHandler}
     */
    this.onMouseDragged_ = null;
};
canvasfx.inherit(canvasfx.scene.Scene, canvasfx.Object);

/**
 * @return {number} The height of this Scene.
 */
canvasfx.scene.Scene.prototype.getHeight = function() {
    return this.height_;
};

/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Scene.prototype.getOnMouseClicked = function() {
    return this.onMouseClicked_;
};

/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Scene.prototype.getOnMouseDragged = function() {
    return this.onMouseDragged_;
};

/**
 * @return {canvasfx.scene.Node} The root node of the scene graph.
 */
canvasfx.scene.Scene.prototype.getRoot = function() {
    return this.root_;
};

/**
 * @return {number} The width of this Scene.
 */
canvasfx.scene.Scene.prototype.getWidth = function() {
    return this.width_;
};

/**
 * @param {canvasfx.scene.input.MouseEvent} event
 */
canvasfx.scene.Scene.prototype.handleEvent = function(event) {
    this.root_.handleEvent(event);

    if (0 <= event.getX() && event.getX() <= this.width_ &&
        0 <= event.getY() && event.getY() <= this.height_) {
        if (this.onMouseClicked_ &&
            event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_CLICKED) {
            this.onMouseClicked_.handle(event);
        }
        if (this.onMouseDragged_ &&
            event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_DRAGGED) {
            this.onMouseDragged_.handle(event);
        }
    }
};

/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Scene.prototype.setOnMouseClicked = function(value) {
    this.onMouseClicked_ = value;
};

/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Scene.prototype.setOnMouseDragged = function(value) {
    this.onMouseDragged_ = value;
};

/**
 * @param {number} value
 */
canvasfx.scene.Scene.prototype.setWidth = function(value) {
    this.width_ = value;
};

/**
 * @param {number} value
 */
canvasfx.scene.Scene.prototype.setHeight = function(value) {
    this.height_ = value;
};


/**
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.scene.Node = function() {
    canvasfx.Object.call(this);

    /**
     * @protected
     * @type {number}
     */
    this.layoutX = 0.0;

    /**
     * @protected
     * @type {number}
     */
    this.layoutY = 0.0;

    /**
     * @protected
     * @type {number}
     */
    this.opacity = 1.0;

    /**
     * @protected
     * @type {canvasfx.event.EventHandler}
     */
    this.onMouseClicked = null;

    /**
     * @protected
     * @type {canvasfx.event.EventHandler}
     */
    this.onMouseDragged = null;
};
canvasfx.inherit(canvasfx.scene.Node, canvasfx.Object);

/**
 * @param {number|canvasfx.geometry.Point} x
 * @param {number} y
 */
canvasfx.scene.Node.prototype.contains = canvasfx.abstractMethod;

/**
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 */
canvasfx.scene.Node.prototype.draw = canvasfx.abstractMethod;

/**
 * @return {number}
 */
canvasfx.scene.Node.prototype.getLayoutX = function() {
    return this.layoutX;
};

/**
 * @return {number}
 */
canvasfx.scene.Node.prototype.getLayoutY = function() {
    return this.layoutY;
};

/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Node.prototype.getOnMouseClicked = function() {
    return this.onMouseClicked;
};

/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.scene.Node.prototype.getOnMouseDragged = function() {
    return this.onMouseDragged;
};

/**
 * @return {number}
 */
canvasfx.scene.Node.prototype.getOpacity = function() {
    return this.opacity;
};

/**
 * @param {canvasfx.scene.input.MouseEvent} event
 */
canvasfx.scene.Node.prototype.handleEvent = function(event) {
    if (this.contains(event.getX(), event.getY())) {
        if (this.onMouseClicked &&
            event.getEventType() ==
                canvasfx.scene.input.MouseEvent.MOUSE_CLICKED) {
            this.onMouseClicked.handle(event);
        }
        if (this.onMouseDragged &&
            event.getEventType() ==
                canvasfx.scene.input.MouseEvent.MOUSE_DRAGGED) {
            this.onMouseDragged.handle(event);
        }
    }
};

/**
 * @param {number} value
 */
canvasfx.scene.Node.prototype.setLayoutX = function(value) {
    this.layoutX = value;
};

/**
 * @param {number} value
 */
canvasfx.scene.Node.prototype.setLayoutY = function(value) {
    this.layoutY = value;
};

/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Node.prototype.setOnMouseClicked = function(value) {
    this.onMouseClicked = value;
};

/**
 * @param {canvasfx.event.EventHandler} value
 */
canvasfx.scene.Node.prototype.setOnMouseDragged = function(value) {
    this.onMouseDragged = value;
};

/**
 * @param {number} value
 */
canvasfx.scene.Node.prototype.setOpacity = function(value) {
    this.opacity = value;
};


/**
 * @param {...canvasfx.scene.Node} var_args Child nodes
 * @constructor
 * @extends {canvasfx.scene.Node}
 */
canvasfx.scene.Group = function(var_args) {
    canvasfx.scene.Node.call(this);

    /**
     * Child nodes
     * @private
     * @type {Array}
     */
    this.children_ = Array.prototype.slice.call(arguments);
};
canvasfx.inherit(canvasfx.scene.Group, canvasfx.scene.Node);

/**
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
canvasfx.scene.Group.prototype.contains = function(x, y) {
    return this.children_.some(function(element) {
        return element.contains(x, y);
    });
};

/**
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 * @override
 */
canvasfx.scene.Group.prototype.draw = function(context) {
    this.children_.forEach(function(element) {
        element.draw(context);
    });
};

/**
 * @return {Array} Child nodes.
 */
canvasfx.scene.Group.prototype.getChildren = function() {
    return this.children_;
};

/**
 * @param {number} value
 * @override
 */
canvasfx.scene.Group.prototype.setLayoutX = function(value) {
    this.layoutX = value;
    this.children_.forEach(function(element) {
        element.setLayoutX(value);
    });
};

/**
 * @param {number} value
 * @override
 */
canvasfx.scene.Group.prototype.setLayoutY = function(value) {
    this.layoutY = value;
    this.children_.forEach(function(element) {
        element.setLayoutY(value);
    });
};

/**
 * @param {canvasfx.scene.input.MouseEvent} event
 */
canvasfx.scene.Group.prototype.handleEvent = function(event) {
    this.children_.forEach(function(element) {
        element.handleEvent(event);
    });

    canvasfx.scene.Node.prototype.handleEvent.call(this, event);
};
