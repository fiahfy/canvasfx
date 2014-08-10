//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.scene.Node');
goog.provide('fiahfy.mod.scene.Scene');

goog.require('fiahfy.mod.Object');
goog.require('fiahfy.mod.geometry.Dimension');
goog.require('fiahfy.mod.scene.shape.Shape');


/**
 * @param {fiahfy.mod.scene.Node} root
 * @constructor
 * @extends {fiahfy.mod.Object}
 */
fiahfy.mod.scene.Scene = function(root) {
    fiahfy.mod.Object.call(this);

    /**
     * Root node on this scene
     * @private
     * @type {Array}
     */
    this.root_ = root;
};
goog.inherits(fiahfy.mod.scene.Scene, fiahfy.mod.Object);

/**
 * @public
 * @return {fiahfy.mod.scene.Node} Root node.
 */
fiahfy.mod.scene.Scene.prototype.getRoot = function() {
    return this.root_;
};


/**
 * @constructor
 * @extends {fiahfy.mod.Object}
 */
fiahfy.mod.scene.Node = function() {
    fiahfy.mod.Object.call(this);

    /**
     * @private
     * @type {fiahfy.mod.event.EventListener}
     */
     this.onMouseClicked = null;
};
goog.inherits(fiahfy.mod.scene.Node, fiahfy.mod.Object);

/**
 * @public
 * @param {number|fiahfy.mod.geometory.Point} x
 * @param {number} y
 */
fiahfy.mod.scene.Node.prototype.contains = goog.abstractMethod;

/**
 * @public
 * @return {fiahfy.mod.event.EventListener}
 */
fiahfy.mod.scene.Node.prototype.getOnMouseClicked = function() {
    return this.onMouseClicked;
};

/**
 * @public
 * @param {number} x
 */
fiahfy.mod.scene.Node.prototype.setLayoutX = goog.abstractMethod;

/**
 * @public
 * @param {number} y
 */
fiahfy.mod.scene.Node.prototype.setLayoutY = goog.abstractMethod;

/**
 * @public
 * @param {fiahfy.mod.event.EventListener} listener
 */
fiahfy.mod.scene.Node.prototype.setOnMouseClicked = function(listener) {
    this.onMouseClicked_ = listener;
};

/**
 * @public
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 */
fiahfy.mod.scene.Node.prototype.draw = goog.abstractMethod;

/**
 * @public
 * @param {fiahfy.mod.event.Event} event
 */
fiahfy.mod.scene.Node.prototype.handleEvent = function(event) {
    if (this.contains(event.getX(), event.getY()) && this.onMouseClicked_) {
        this.onMouseClicked_.handle(event);
    }
};


/**
 * @param {...fiahfy.mod.scene.Node} var_args Child nodes
 * @constructor
 * @extends {fiahfy.mod.scene.Node}
 */
fiahfy.mod.scene.Group = function(var_args) {
    fiahfy.mod.scene.Node.call(this);

    /**
     * Child nodes
     * @type {Array}
     * @private
     */
    this.children_ = Array.prototype.slice.call(arguments);
};
goog.inherits(fiahfy.mod.scene.Group, fiahfy.mod.scene.Node);

/**
 * @public
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 * @override
 */
fiahfy.mod.scene.Group.prototype.draw = function(context) {
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
fiahfy.mod.scene.Group.prototype.getChildren = function() {
    return this.children_;
};

/**
 * @public
 * @param {number} x
 * @override
 */
fiahfy.mod.scene.Group.prototype.setLayoutX = function(x) {
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
fiahfy.mod.scene.Group.prototype.setLayoutY = function(y) {
    for (var i = 0; i < this.children_.length; i++)
    {
        var child = this.children_[i];
        child.setLayoutY(x);
    }
};

/**
 * @public
 * @param {fiahfy.mod.event.Event} event
 */
fiahfy.mod.scene.Group.prototype.handleEvent = function(event) {
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
