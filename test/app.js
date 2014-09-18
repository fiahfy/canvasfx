//


/**
 * @fileoverview xxx
 */


var fiahfy = fiahfy || {};


/**
 * @type {{}}
 */
fiahfy.sample = {};


/**
 * @constructor
 * @extends {fmod.application.Application}
 */
fiahfy.sample.App = function() {
    fmod.application.Application.call(this);
};
fmod.inherit(fiahfy.sample.App, fmod.application.Application);

/**
 * @param {fmod.stage.Stage} stage
 * @override
 */
fiahfy.sample.App.prototype.start = function(stage) {
    var root = new fmod.scene.Group();
    var scene = new fmod.scene.Scene(root);
    stage.setScene(scene);

    var children = root.getChildren();

    // draw grid
    for (var i = 0; i <= stage.getWidth(); i += 10)
    {
        var y = new fmod.scene.shape.Line(
            i, 0,
            i, stage.getHeight()
        );
        y.setStroke(fmod.scene.paint.Color.GRAY);
        if (i % 100 == 0) y.setStrokeWidth(2.0);
        children.push(y);
    }
    for (var j = 0; j <= stage.getHeight(); j += 10)
    {
        var x = new fmod.scene.shape.Line(
            0, j,
            stage.getWidth(), j
        );
        x.setStroke(fmod.scene.paint.Color.GRAY);
        if (j % 100 == 0) x.setStrokeWidth(2.0);
        children.push(x);
    }

    var circle = new fmod.scene.shape.Circle(0, 0, 100);
    circle.setFill(new fmod.scene.paint.Color(1, 0, 0, 0.5));
    var rectangle = new fmod.scene.shape.Rectangle(0, 0, 10, 10);
    var group = new fmod.scene.Group(circle, rectangle);
    children.push(group);


    scene.setOnMouseDragged((function() {
        var e = new fmod.event.EventListener();
        e.handle = function(event) {
            circle.setLayoutX(event.getX() - circle.getCenterX());
            circle.setLayoutY(event.getY() - circle.getCenterX());
        };
        return e;
    })());

    (function() {
        var start = 0;
        var before = 0;
        var time = 0;
        var sec = 0;

        var t = new fmod.animation.AnimationTimer();
        t.handle = function(now) {
            if (!start) start = now;
            time = now - start;

            if (time > sec * 1000) {
                console.log(parseInt(1000 / (now - before)));
                sec++;
            }

            before = now;

            if (time > 10 * 6 * 1000) this.stop();

            this.update();
        };
        t.update = function() {
            var m = circle.getLayoutX();
            circle.setLayoutX(++m);

            stage.show();
        };
        return t;
    })().start();
};
