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
     * Specify the scene to be used on this stage.
     * @private
     * @type {fiahfy.mod.scene.Scene}
     */
    this.scene_ = null;

    /**
     * The width of this Stage.
     * @type {number}
     * @private
     */
    this.width_ = element.offsetWidth;

    /**
     * The height of this Stage.
     * @type {number}
     * @private
     */
    this.height_ = element.offsetHeight;


    this.addEventLinstener_();
};
goog.inherits(fiahfy.mod.stage.Stage, fiahfy.mod.Object);

/**
 * @public
 * @return {number} The width of this Scene.
 */
fiahfy.mod.stage.Stage.prototype.getWidth = function() {
    return this.width_;
};

/**
 * @public
 * @return {number} The height of this Scene.
 */
fiahfy.mod.stage.Stage.prototype.getHeight = function() {
    return this.height_;
};

/**
 * @public
 * @param {fiahfy.mod.scene.Scene} scene Specify the scene
 *     to be used on this stage.
 */
fiahfy.mod.stage.Stage.prototype.setScene = function(scene) {
    this.scene_ = scene;
    if (this.scene_.getWidth() && this.scene_.getHeight()) {
        this.width_ = this.scene_.getWidth();
        this.height_ = this.scene_.getHeight();
    }
    this.canvas_.width = this.width_;
    this.canvas_.height = this.height_;
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
        this.width_, this.height_
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
