//


/**
 * @fileoverview Provides the core set of base classes for Scene Graph API.
 */


fmod.scene = {};


/**
 * The Scene class is the container for all content in a scene graph.
 * @param {fmod.scene.Node} root The root node of the scene graph.
 * @param {number=} width The width of the scene.
 * @param {number=} height The height of the scene.
 * @constructor
 * @extends {fmod.Object}
 */
fmod.scene.Scene = function(root, width, height) {
    fmod.Object.call(this);

    /**
     * The root node of the scene graph.
     * @private
     * @type {fmod.scene.Node}
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
     * @type {fmod.event.EventHandler}
     */
    this.onMouseClicked_ = null;

    /**
     * @private
     * @type {fmod.event.EventHandler}
     */
    this.onMouseDragged_ = null;
};
fmod.inherit(fmod.scene.Scene, fmod.Object);

/**
 * @return {number} The height of this Scene.
 */
fmod.scene.Scene.prototype.getHeight = function() {
    return this.height_;
};

/**
 * @return {fmod.event.EventListener}
 */
fmod.scene.Scene.prototype.getOnMouseClicked = function() {
    return this.onMouseClicked_;
};

/**
 * @return {fmod.event.EventListener}
 */
fmod.scene.Scene.prototype.getOnMouseDragged = function() {
    return this.onMouseDragged_;
};

/**
 * @return {fmod.scene.Node} The root node of the scene graph.
 */
fmod.scene.Scene.prototype.getRoot = function() {
    return this.root_;
};

/**
 * @return {number} The width of this Scene.
 */
fmod.scene.Scene.prototype.getWidth = function() {
    return this.width_;
};

/**
 * @param {fmod.scene.input.MouseEvent} event
 */
fmod.scene.Scene.prototype.handleEvent = function(event) {
    this.root_.handleEvent(event);

    if (0 <= event.getX() && event.getX() <= this.width_ &&
        0 <= event.getY() && event.getY() <= this.height_) {
        if (this.onMouseClicked_ &&
            event.getEventType() == fmod.scene.input.MouseEvent.MOUSE_CLICKED) {
            this.onMouseClicked_.handle(event);
        }
        if (this.onMouseDragged_ &&
            event.getEventType() == fmod.scene.input.MouseEvent.MOUSE_DRAGGED) {
            this.onMouseDragged_.handle(event);
        }
    }
};

/**
 * @param {fmod.event.EventHandler} handler
 */
fmod.scene.Scene.prototype.setOnMouseClicked = function(handler) {
    this.onMouseClicked_ = handler;
};

/**
 * @param {fmod.event.EventHandler} handler
 */
fmod.scene.Scene.prototype.setOnMouseDragged = function(handler) {
    this.onMouseDragged_ = handler;
};

/**
 * @param {number} width
 */
fmod.scene.Scene.prototype.setWidth = function(width) {
    this.width_ = width;
};

/**
 * @param {number} height
 */
fmod.scene.Scene.prototype.setHeight = function(height) {
    this.height_ = height;
};


/**
 * @constructor
 * @extends {fmod.Object}
 */
fmod.scene.Node = function() {
    fmod.Object.call(this);

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
     * @type {fmod.event.EventHandler}
     */
    this.onMouseClicked = null;

    /**
     * @protected
     * @type {fmod.event.EventHandler}
     */
    this.onMouseDragged = null;
};
fmod.inherit(fmod.scene.Node, fmod.Object);

/**
 * @param {number|fmod.geometory.Point} x
 * @param {number} y
 */
fmod.scene.Node.prototype.contains = fmod.abstractMethod;

/**
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 */
fmod.scene.Node.prototype.draw = fmod.abstractMethod;

/**
 * @return {number}
 */
fmod.scene.Node.prototype.getLayoutX = function() {
    return this.layoutX;
};

/**
 * @return {number}
 */
fmod.scene.Node.prototype.getLayoutY = function() {
    return this.layoutY;
};

/**
 * @return {fmod.event.EventListener}
 */
fmod.scene.Node.prototype.getOnMouseClicked = function() {
    return this.onMouseClicked;
};

/**
 * @return {fmod.event.EventListener}
 */
fmod.scene.Node.prototype.getOnMouseDragged = function() {
    return this.onMouseDragged;
};

/**
 * @param {fmod.scene.input.MouseEvent} event
 */
fmod.scene.Node.prototype.handleEvent = function(event) {
    if (this.contains(event.getX(), event.getY())) {
        if (this.onMouseClicked &&
            event.getEventType() == fmod.scene.input.MouseEvent.MOUSE_CLICKED) {
            this.onMouseClicked.handle(event);
        }
        if (this.onMouseDragged &&
            event.getEventType() == fmod.scene.input.MouseEvent.MOUSE_DRAGGED) {
            this.onMouseDragged.handle(event);
        }
    }
};

/**
 * @param {number} layoutX
 */
fmod.scene.Node.prototype.setLayoutX = function(layoutX) {
    this.layoutX = layoutX;
};

/**
 * @param {number} layoutY
 */
fmod.scene.Node.prototype.setLayoutY = function(layoutY) {
    this.layoutY = layoutY;
};

/**
 * @param {fmod.event.EventHandler} handler
 */
fmod.scene.Node.prototype.setOnMouseClicked = function(handler) {
    this.onMouseClicked = handler;
};

/**
 * @param {fmod.event.EventHandler} handler
 */
fmod.scene.Node.prototype.setOnMouseDragged = function(handler) {
    this.onMouseDragged = handler;
};


/**
 * @param {...fmod.scene.Node} var_args Child nodes
 * @constructor
 * @extends {fmod.scene.Node}
 */
fmod.scene.Group = function(var_args) {
    fmod.scene.Node.call(this);

    /**
     * Child nodes
     * @private
     * @type {Array}
     */
    this.children_ = Array.prototype.slice.call(arguments);
};
fmod.inherit(fmod.scene.Group, fmod.scene.Node);

/**
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
fmod.scene.Group.prototype.contains = function(x, y) {
    return this.children_.some(function(element) {
        return element.contains(x, y);
    });
};

/**
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 * @override
 */
fmod.scene.Group.prototype.draw = function(context) {
    this.children_.forEach(function(element) {
        element.draw(context);
    });
};

/**
 * @return {Array} Child nodes.
 */
fmod.scene.Group.prototype.getChildren = function() {
    return this.children_;
};

/**
 * @param {number} layoutX
 * @override
 */
fmod.scene.Group.prototype.setLayoutX = function(layoutX) {
    this.layoutX = layoutX;
    this.children_.forEach(function(element) {
        element.setLayoutX(layoutX);
    });
};

/**
 * @param {number} layoutY
 * @override
 */
fmod.scene.Group.prototype.setLayoutY = function(layoutY) {
    this.layoutY = layoutY;
    this.children_.forEach(function(element) {
        element.setLayoutY(layoutY);
    });
};

/**
 * @param {fmod.scene.input.MouseEvent} event
 */
fmod.scene.Group.prototype.handleEvent = function(event) {
    this.children_.forEach(function(element) {
        element.handleEvent(event);
    });

    fmod.scene.Node.prototype.handleEvent.call(this, event);
};
