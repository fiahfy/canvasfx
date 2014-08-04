//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.stage.Stage');

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
x     */
    this.scene_ = null;
};

/**
 * @public
 * @param {fiahfy.mod.scene.Scene} scene
 */
fiahfy.mod.stage.Stage.prototype.setScene = function(scene) {
    this.scene_ = scene;
};

/** @public */
fiahfy.mod.stage.Stage.prototype.show = function() {
    this.scene_.draw(this.context_);
};
