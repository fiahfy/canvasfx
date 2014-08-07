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
 * @constructor
 * @extends {fiahfy.mod.Object}
 */
fiahfy.mod.scene.Scene = function() {
    fiahfy.mod.Object.call(this);

    /**
     * Placed nodes on this scene
     * @private
     * @type {Array}
     */
    this.nodes_ = [];

    /**
     * Size
     * @private
     * @type {fiahfy.mod.geometry.Dimension}
     */
    this.size_ = new fiahfy.mod.geometry.Dimension();
};
goog.inherits(fiahfy.mod.scene.Scene, fiahfy.mod.Object);

/**
 * @public
 * @param {number|fiahfy.mod.geometry.Dimension} width Width or dimension.
 * @param {number=} height height.
 */
fiahfy.mod.scene.Scene.prototype.setSize = function(width, height) {
    if (width instanceof fiahfy.mod.geometry.Dimension) {
        this.size_ = width.clone();
    } else {
        this.size_ = new fiahfy.mod.geometry.Dimension(width, height);
    }
};

/**
 * @public
 * @param {fiahfy.mod.scene.Node} node Node object.
 */
fiahfy.mod.scene.Scene.prototype.add = function(node) {
    this.nodes_.push(node);
};

/**
 * @public
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 */
fiahfy.mod.scene.Scene.prototype.draw = function(context) {
    this.clear(context);

    for (var i = 0; i < this.nodes_.length; i++)
    {
        var node = this.nodes_[i];
        node.draw(context);
    }
};

/**
 * @public
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 */
fiahfy.mod.scene.Scene.prototype.clear = function(context) {
    var rect = new fiahfy.mod.scene.shape.Rectangle(
        0, 0,
        this.size_.getWidth(), this.size_.getHeight()
    );
    rect.setFill(fiahfy.mod.scene.paint.Color.WHITE);
    rect.draw(context);
};


/**
 * @constructor
 * @extends {fiahfy.mod.Object}
 */
fiahfy.mod.scene.Node = function() {
    fiahfy.mod.Object.call(this);
};
goog.inherits(fiahfy.mod.scene.Node, fiahfy.mod.Object);

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
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 */
fiahfy.mod.scene.Node.prototype.draw = goog.abstractMethod;


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
 * @param {CanvasRenderingContext2D} context Canvas DOM element.
 * @override
 */
fiahfy.mod.scene.Node.prototype.draw = function(context) {
    for (var i = 0; i < this.children_.length; i++)
    {
        var child = this.children_[i];
        child.draw(context);
    }
};
