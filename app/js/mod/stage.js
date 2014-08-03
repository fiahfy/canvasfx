//


/**
 * @fileoverview xxx
 */


goog.provide('com.blogspot.fiahfy.mod.stage.Stage');

goog.require('com.blogspot.fiahfy.mod.scene.Scene');


/**
 * @constructor
 */
com.blogspot.fiahfy.mod.stage.Stage = function(element) {
    /**
     * Canvas DOM element
     * @type {Element}
     * @private
     */
	this.canvas_ = document.createElement('canvas');
	element.appendChild(this.canvas_);

    /**
     * Canvas Context
     * @type {CanvasRenderingContext2D}
     * @private
     */
	this.context_ = this.canvas_.getContext('2d');

    /**
     * Current Scene
     * @type {com.blogspot.fiahfy.mod.scene.Scene}
     * @private
     */
    this.scene_ = null;
};

/**
 * @public
 * @param {com.blogspot.fiahfy.mod.scene.Scene} scene
 */
com.blogspot.fiahfy.mod.stage.Stage.prototype.setScene = function(scene) {
	this.scene_ = scene;
};

/** @public */
com.blogspot.fiahfy.mod.stage.Stage.prototype.show = function() {
	this.scene_.draw(this.context_);
};
