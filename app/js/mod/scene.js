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
     * @type {number}
     * @private
     */
    this.width_ = width;

    /**
     * The height of the scene.
     * @type {number}
     * @private
     */
    this.height_ = height;
};
fmod.inherit(fmod.scene.Scene, fmod.Object);

/**
 * @public
 * @return {fmod.scene.Node} The root node of the scene graph.
 */
fmod.scene.Scene.prototype.getRoot = function() {
    return this.root_;
};

/**
 * @public
 * @return {number} The width of this Scene.
 */
fmod.scene.Scene.prototype.getWidth = function() {
    return this.width_;
};

/**
 * @public
 * @return {number} The height of this Scene.
 */
fmod.scene.Scene.prototype.getHeight = function() {
    return this.height_;
};


/**
 * @constructor
 * @extends {fmod.Object}
 */
fmod.scene.Node = function() {
    fmod.Object.call(this);

    /**
     * @private
     * @type {fmod.event.EventListener}
     */
     this.onMouseClicked = null;
};
fmod.inherit(fmod.scene.Node, fmod.Object);

/**
 * @public
 * @param {number|fmod.geometory.Point} x
 * @param {number} y
 */
fmod.scene.Node.prototype.contains = fmod.abstractMethod;

/**
 * @public
 * @return {fmod.event.EventListener}
 */
fmod.scene.Node.prototype.getOnMouseClicked = function() {
    return this.onMouseClicked;
};

/**
 * @public
 * @param {number} x
 */
fmod.scene.Node.prototype.setLayoutX = fmod.abstractMethod;

/**
 * @public
 * @param {number} y
 */
fmod.scene.Node.prototype.setLayoutY = fmod.abstractMethod;

/**
 * @public
 * @param {fmod.event.EventListener} listener
 */
fmod.scene.Node.prototype.setOnMouseClicked = function(listener) {
    this.onMouseClicked_ = listener;
};

/**
 * @public
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 */
fmod.scene.Node.prototype.draw = fmod.abstractMethod;

/**
 * @public
 * @param {fmod.event.Event} event
 */
fmod.scene.Node.prototype.handleEvent = function(event) {
    if (this.contains(event.getX(), event.getY()) && this.onMouseClicked_) {
        this.onMouseClicked_.handle(event);
    }
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
     * @type {Array}
     * @private
     */
    this.children_ = Array.prototype.slice.call(arguments);
};
fmod.inherit(fmod.scene.Group, fmod.scene.Node);

/**
 * @public
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 * @override
 */
fmod.scene.Group.prototype.draw = function(context) {
    for (var i = 0; i < this.children_.length; i++)
    {
        var child = this.children_[i];
        child.draw(context);
    }
};

/**
 * @public
 * @return {Array} Child nodes.
 */
fmod.scene.Group.prototype.getChildren = function() {
    return this.children_;
};

/**
 * @public
 * @param {number} x
 * @override
 */
fmod.scene.Group.prototype.setLayoutX = function(x) {
    for (var i = 0; i < this.children_.length; i++)
    {
        var child = this.children_[i];
        child.setLayoutX(x);
    }
};

/**
 * @public
 * @param {number} y
 * @override
 */
fmod.scene.Group.prototype.setLayoutY = function(y) {
    for (var i = 0; i < this.children_.length; i++)
    {
        var child = this.children_[i];
        child.setLayoutY(x);
    }
};

/**
 * @public
 * @param {fmod.event.Event} event
 */
fmod.scene.Group.prototype.handleEvent = function(event) {
    var result = false;
    for (var i = 0; i < this.children_.length; i++)
    {
        var child = this.children_[i];
        if (child.contains(event.getX(), event.getY())) {
            result = true;
            break;
        }
    }
    if (!result) return;

    for (var i = 0; i < this.children_.length; i++)
    {
        var child = this.children_[i];
        child.handleEvent(event);
    }
    
    if (this.onMouseClicked_) {
        this.onMouseClicked_.handle(event);
    }
};
