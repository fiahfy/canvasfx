//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.stage.Stage');

goog.require('fiahfy.mod.Object');
goog.require('fiahfy.mod.geometry.Dimension');
goog.require('fiahfy.mod.scene.Scene');


/**
 * @param {HTMLElement} element DOM node.
 * @constructor
 * @extends {fiahfy.mod.Object}
 */
fiahfy.mod.stage.Stage = function(element) {
    fiahfy.mod.Object.call(this);

    /**
     * Canvas DOM element
     * @private
     * @type {HTMLElement}
     */
    this.canvas_ = document.createElement('canvas');
    element.appendChild(this.canvas_);

    /**
     * Canvas context
     * @private
     * @type {CanvasRenderingContext2D}
     */
    this.context_ = this.canvas_.getContext('2d');

    /**
     * Current Scene
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
};
goog.inherits(fiahfy.mod.stage.Stage, fiahfy.mod.Object);

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
    this.scene_.setSize(this.size_);
};

/**
 * @public
 */
fiahfy.mod.stage.Stage.prototype.show = function() {
    this.scene_.draw(this.context_);
};
