//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.sample.App');

goog.require('fiahfy.mod.application.Application');
goog.require('fiahfy.mod.math.Math');
goog.require('fiahfy.mod.scene.Scene');
goog.require('fiahfy.mod.scene.paint.Color');
goog.require('fiahfy.mod.scene.shape.Line');
goog.require('fiahfy.mod.scene.shape.Rectangle');
goog.require('fiahfy.mod.stage.Stage');


/**
 * @param {Element} element DOM node
 * @constructor
 * @extends {fiahfy.mod.application.Application}
 */
fiahfy.sample.App = function(element) {
    fiahfy.mod.application.Application.call(this, element);
};
goog.inherits(fiahfy.sample.App, fiahfy.mod.application.Application);

/**
 * @public
 * @override
 */
fiahfy.sample.App.prototype.start = function() {
    this.stage.setSize(1000, 1000);

    var scene = new fiahfy.mod.scene.Scene();
    this.stage.setScene(scene);

    for (var i = 0; i <= this.stage.getSize().getWidth(); i += 10)
    {
        var y = new fiahfy.mod.scene.shape.Line(i, 0,
            i, this.stage.getSize().getHeight());
        y.setStroke(fiahfy.mod.scene.paint.Color.GRAY);
        scene.add(y);
    }
    for (var j = 0; j <= this.stage.getSize().getHeight(); j += 10)
    {
        var x = new fiahfy.mod.scene.shape.Line(0, j,
            this.stage.getSize().getWidth(), j);
        x.setStroke(fiahfy.mod.scene.paint.Color.GRAY);
        scene.add(x);
    }

    var rect = new fiahfy.mod.scene.shape.Rectangle(10, 20, 30, 40);
    scene.add(rect);

   this.stage.show();
};
