//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.stage.Stage');

goog.require('fiahfy.mod.geometry.Dimension');
goog.require('fiahfy.mod.scene.Scene');


/**
 * @param {Element} element DOM node
 * @constructor
 */
fiahfy.mod.stage.Stage = function(element) {
    /**
     * Canvas DOM element
     * @private
     * @type {Element}
     */
    this.canvas_ = document.createElement('canvas');
    element.appendChild(this.canvas_);

    /**
     * Canvas Context
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
    this.size_ = new fiahfy.mod.geometry.Dimension(0, 0);
};

/**
 * @public
 * @param {number} width width
 * @param {number} height height
 */
fiahfy.mod.stage.Stage.prototype.setSize = function(width, height) {
    this.size_ = new fiahfy.mod.geometry.Dimension(width, height);
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
};

/**
 * @public
 */
fiahfy.mod.stage.Stage.prototype.show = function() {
    this.resize_();
    this.scene_.draw(this.context_);
};

/**
 * @private
 */
fiahfy.mod.stage.Stage.prototype.resize_ = function() {
    this.canvas_.width = this.size_.getWidth();
    this.canvas_.height = this.size_.getHeight();
};
