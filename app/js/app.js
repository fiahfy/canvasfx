//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.sample.App');

goog.require('fiahfy.mod.animation.AnimationTimer');
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




    var me = this;
    var timer = (function() {
        var start = 0;
        var before = 0;
        var time = 0;
        var sec = 0;
        var t = new fiahfy.mod.animation.AnimationTimer();
        t.handle = function(now) {
            if (!start) start = now;
            time = now - start;
            //if ()
            //console.log(time / 1000);
            if (time > sec * 1000) {
                console.log(parseInt(1000 / (now - before)));
                sec++;
            }
            if (time > 10 * 1000) timer.stop();
            before = now;
            this.update();
        };
        t.update = function() {

            // scene
            var scene = new fiahfy.mod.scene.Scene();
            me.stage.setScene(scene);

            // draw grid
            for (var i = 0; i <= me.stage.getSize().getWidth(); i += 10)
            {
                var y = new fiahfy.mod.scene.shape.Line(
                    i, 0,
                    i, me.stage.getSize().getHeight()
                );
                y.setStroke(fiahfy.mod.scene.paint.Color.GRAY);
                if (i % 100 == 0) y.setStrokeWidth(2.0);
                scene.add(y);
            }
            for (var j = 0; j <= me.stage.getSize().getHeight(); j += 10)
            {
                var x = new fiahfy.mod.scene.shape.Line(
                    0, j,
                    me.stage.getSize().getWidth(), j
                );
                x.setStroke(fiahfy.mod.scene.paint.Color.GRAY);
                if (j % 100 == 0) x.setStrokeWidth(2.0);
                scene.add(x);
            }

            // draw rectangle
            /*
            var rect = new fiahfy.mod.scene.shape.Rectangle(50, 150, 100, 100);
            rect.setFill(fiahfy.mod.scene.paint.Color.GREEN);
            rect.setStroke(fiahfy.mod.scene.paint.Color.RED);
            rect.setStrokeWidth(1);
            rect.setStrokeType(fiahfy.mod.scene.shape.StrokeType.CENTERED);
            scene.add(rect);
            */
            //
            var circle = new fiahfy.mod.scene.shape.Circle(100*time/1000*0.2, 100, 5);
            //circle.setFill(fiahfy.mod.scene.paint.Color.BLUE);
            //circle.setStroke(fiahfy.mod.scene.paint.Color.RED);
            //circle.setStrokeWidth(1);
            //circle.setStrokeType(fiahfy.mod.scene.shape.StrokeType.CENTERED);
            scene.add(circle);

            // show
            me.stage.show();
        };
        return t;
    })();
    timer.start();
};
