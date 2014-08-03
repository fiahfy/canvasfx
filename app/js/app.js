//


/**
 * @fileoverview xxx
 */


goog.provide('com.blogspot.fiahfy.sample.App');

goog.require('com.blogspot.fiahfy.mod.application.Application');
goog.require('com.blogspot.fiahfy.mod.stage.Stage');
goog.require('com.blogspot.fiahfy.mod.scene.Scene');
goog.require('com.blogspot.fiahfy.mod.scene.shape.Rectangle');
goog.require('com.blogspot.fiahfy.mod.math.Math');


/**
 * @param {Element} element DOM node
 * @constructor
 * @extends {com.blogspot.fiahfy.mod.application.Application}
 */
com.blogspot.fiahfy.sample.App = function(element) {
    com.blogspot.fiahfy.mod.application.Application.call(this, element);
};
goog.inherits(com.blogspot.fiahfy.sample.App, com.blogspot.fiahfy.mod.application.Application);

/**
 * @public
 * @override
 */
com.blogspot.fiahfy.sample.App.prototype.start = function() {
    console.log(com.blogspot.fiahfy.mod.math.Math.PI);
    
    var scene = new com.blogspot.fiahfy.mod.scene.Scene();
    this.stage.setScene(scene);

    var rect = new com.blogspot.fiahfy.mod.scene.shape.Rectangle(10, 20, 30, 40);
    scene.add(rect);

    this.stage.show();
};
