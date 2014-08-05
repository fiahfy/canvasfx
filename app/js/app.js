//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.sample.App');

goog.require('fiahfy.mod.application.Application');
goog.require('fiahfy.mod.math.Math');
goog.require('fiahfy.mod.scene.Scene');
goog.require('fiahfy.mod.scene.paint.Color');
goog.require('fiahfy.mod.scene.shape.Circle');
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
    // set stage size
    //this.stage.setSize(1000, 1000);

    // scene
    var scene = new fiahfy.mod.scene.Scene();
    this.stage.setScene(scene);

    // draw grid
    for (var i = 0; i <= this.stage.getSize().getWidth(); i += 10)
    {
        var y = new fiahfy.mod.scene.shape.Line(i, 0,
            i, this.stage.getSize().getHeight());
        y.setStroke(fiahfy.mod.scene.paint.Color.GRAY);
        if (i % 100 == 0) y.setStrokeWidth(2.0);
        scene.add(y);
    }
    for (var j = 0; j <= this.stage.getSize().getHeight(); j += 10)
    {
        var x = new fiahfy.mod.scene.shape.Line(0, j,
            this.stage.getSize().getWidth(), j);
        x.setStroke(fiahfy.mod.scene.paint.Color.GRAY);
        if (j % 100 == 0) x.setStrokeWidth(2.0);
        scene.add(x);
    }

    // draw rectangle
    var rect = new fiahfy.mod.scene.shape.Rectangle(50, 150, 100, 100);
    rect.setFill(fiahfy.mod.scene.paint.Color.GREEN);
    rect.setStroke(fiahfy.mod.scene.paint.Color.RED)
    rect.setStrokeWidth(1);
    rect.setStrokeType(fiahfy.mod.scene.shape.StrokeType.CENTERD);
    scene.add(rect);

    //
    var circle = new fiahfy.mod.scene.shape.Circle(100, 100, 50);
    circle.setFill(fiahfy.mod.scene.paint.Color.BLUE);
    circle.setStroke(fiahfy.mod.scene.paint.Color.RED)
    circle.setStrokeWidth(1);
    circle.setStrokeType(fiahfy.mod.scene.shape.StrokeType.CENTERD);
    scene.add(circle);

    // show
    this.stage.show();
};
