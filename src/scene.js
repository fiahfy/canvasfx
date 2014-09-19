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
 * @return {canvasfx.event.EventListener}
 */
canvasfx.scene.Scene.prototype.getOnMouseClicked = function() {
    return this.onMouseClicked_;
};

/**
 * @return {canvasfx.event.EventListener}
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
 * @param {canvasfx.event.EventHandler} handler
 */
canvasfx.scene.Scene.prototype.setOnMouseClicked = function(handler) {
    this.onMouseClicked_ = handler;
};

/**
 * @param {canvasfx.event.EventHandler} handler
 */
canvasfx.scene.Scene.prototype.setOnMouseDragged = function(handler) {
    this.onMouseDragged_ = handler;
};

/**
 * @param {number} width
 */
canvasfx.scene.Scene.prototype.setWidth = function(width) {
    this.width_ = width;
};

/**
 * @param {number} height
 */
canvasfx.scene.Scene.prototype.setHeight = function(height) {
    this.height_ = height;
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
 * @return {canvasfx.event.EventListener}
 */
canvasfx.scene.Node.prototype.getOnMouseClicked = function() {
    return this.onMouseClicked;
};

/**
 * @return {canvasfx.event.EventListener}
 */
canvasfx.scene.Node.prototype.getOnMouseDragged = function() {
    return this.onMouseDragged;
};

/**
 * @param {canvasfx.scene.input.MouseEvent} event
 */
canvasfx.scene.Node.prototype.handleEvent = function(event) {
    if (this.contains(event.getX(), event.getY())) {
        if (this.onMouseClicked &&
            event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_CLICKED) {
            this.onMouseClicked.handle(event);
        }
        if (this.onMouseDragged &&
            event.getEventType() == canvasfx.scene.input.MouseEvent.MOUSE_DRAGGED) {
            this.onMouseDragged.handle(event);
        }
    }
};

/**
 * @param {number} layoutX
 */
canvasfx.scene.Node.prototype.setLayoutX = function(layoutX) {
    this.layoutX = layoutX;
};

/**
 * @param {number} layoutY
 */
canvasfx.scene.Node.prototype.setLayoutY = function(layoutY) {
    this.layoutY = layoutY;
};

/**
 * @param {canvasfx.event.EventHandler} handler
 */
canvasfx.scene.Node.prototype.setOnMouseClicked = function(handler) {
    this.onMouseClicked = handler;
};

/**
 * @param {canvasfx.event.EventHandler} handler
 */
canvasfx.scene.Node.prototype.setOnMouseDragged = function(handler) {
    this.onMouseDragged = handler;
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
 * @param {number} layoutX
 * @override
 */
canvasfx.scene.Group.prototype.setLayoutX = function(layoutX) {
    this.layoutX = layoutX;
    this.children_.forEach(function(element) {
        element.setLayoutX(layoutX);
    });
};

/**
 * @param {number} layoutY
 * @override
 */
canvasfx.scene.Group.prototype.setLayoutY = function(layoutY) {
    this.layoutY = layoutY;
    this.children_.forEach(function(element) {
        element.setLayoutY(layoutY);
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
