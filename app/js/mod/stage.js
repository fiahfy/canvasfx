//


/**
 * @fileoverview Provides the top-level container classes.
 */


goog.provide('fiahfy.mod.stage.Stage');

goog.require('fiahfy.mod.Object');
goog.require('fiahfy.mod.geometry.Dimension');
goog.require('fiahfy.mod.scene.Scene');
goog.require('fiahfy.mod.scene.input.MouseEvent');


/**
 * The top level container.
 * @param {HTMLElement} element Target DOM node.
 * @constructor
 * @extends {fiahfy.mod.Object}
 */
fiahfy.mod.stage.Stage = function(element) {
    fiahfy.mod.Object.call(this);

    /**
     * Canvas DOM element.
     * @private
     * @type {HTMLElement}
     */
    this.canvas_ = document.createElement('canvas');
    element.appendChild(this.canvas_);

    /**
     * Canvas context.
     * @private
     * @type {CanvasRenderingContext2D}
     */
    this.context_ = this.canvas_.getContext('2d');

    /**
     * Current Scene.
     * @private
     * @type {fiahfy.mod.scene.Scene}
     */
    this.scene_ = null;

    /**
     * Size
     * @private
     * @type {fiahfy.mod.geometry.Dimension}
     */
    this.size_ = new fiahfy.mod.geometry.Dimension();

    this.setSize(element.offsetWidth, element.offsetHeight);
    this.addEventLinstener_();
};
goog.inherits(fiahfy.mod.stage.Stage, fiahfy.mod.Object);

/**
 * @public
 * @return {fiahfy.mod.geometry.Dimension} Size
 */
fiahfy.mod.stage.Stage.prototype.getSize = function() {
    return this.size_;
};

/**
 * @public
 * @param {fiahfy.mod.scene.Scene} scene
 */
fiahfy.mod.stage.Stage.prototype.setScene = function(scene) {
    this.scene_ = scene;
};

/**
 * @public
 * @param {number|fiahfy.mod.geometry.Dimension} width Width or dimension.
 * @param {number=} height Height.
 */
fiahfy.mod.stage.Stage.prototype.setSize = function(width, height) {
    if (width instanceof fiahfy.mod.geometry.Dimension) {
        this.size_ = width.clone();
    } else {
        this.size_ = new fiahfy.mod.geometry.Dimension(width, height);
    }
    this.canvas_.width = this.size_.getWidth();
    this.canvas_.height = this.size_.getHeight();
};

/**
 * @public
 */
fiahfy.mod.stage.Stage.prototype.show = function() {
    this.clear();
    this.scene_.getRoot().draw(this.context_);
};

/**
 * @public
 */
fiahfy.mod.stage.Stage.prototype.clear = function() {
    var rect = new fiahfy.mod.scene.shape.Rectangle(
        0, 0,
        this.size_.getWidth(), this.size_.getHeight()
    );
    rect.setFill(fiahfy.mod.scene.paint.Color.WHITE);
    rect.draw(this.context_);
};

/**
 * @private
 */
fiahfy.mod.stage.Stage.prototype.addEventLinstener_ = function() {
    //
    var me = this;
    this.canvas_.onclick = (function(e) {
        //console.log(e);
        //console.log(e.target.getBoundingClientRect());
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        //console.log(x, y);
        var event = new fiahfy.mod.scene.input.MouseEvent(x, y);
        var root = me.scene_.getRoot();
        //if (root.contains(x, y)) {
            root.handleEvent(event);
       // }
    });
};
