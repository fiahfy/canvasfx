//


/**
 * @fileoverview xxx
 */


var test = test || {};


/**
 * @constructor
 * @extends {canvasfx.application.Application}
 */
test.App = function() {
    canvasfx.application.Application.call(this);
};
canvasfx.inherit(test.App, canvasfx.application.Application);

/**
 * @param {canvasfx.stage.Stage} stage
 * @override
 */
test.App.prototype.start = function(stage) {
    var root = new canvasfx.scene.Group();
    var scene = new canvasfx.scene.Scene(root);
    stage.setScene(scene);

    var children = root.getChildren();

    // draw grid
    for (var i = 0; i <= stage.getWidth(); i += 10)
    {
        var y = new canvasfx.scene.shape.Line(
            i, 0,
            i, stage.getHeight()
        );
        y.setStroke(canvasfx.scene.paint.Color.GRAY);
        if (i % 100 == 0) y.setStrokeWidth(2.0);
        children.push(y);
    }
    for (var j = 0; j <= stage.getHeight(); j += 10)
    {
        var x = new canvasfx.scene.shape.Line(
            0, j,
            stage.getWidth(), j
        );
        x.setStroke(canvasfx.scene.paint.Color.GRAY);
        if (j % 100 == 0) x.setStrokeWidth(2.0);
        children.push(x);
    }

    var circle = new canvasfx.scene.shape.Circle(0, 0, 100);
    circle.setFill(new canvasfx.scene.paint.Color(1, 0, 0, 0.5));
    var rectangle = new canvasfx.scene.shape.Rectangle(0, 0, 10, 10);
    var group = new canvasfx.scene.Group(circle, rectangle);
    children.push(group);


    scene.setOnMouseDragged((function() {
        var e = new canvasfx.event.EventListener();
        e.handle = function(event) {
            circle.setLayoutX(event.getX() - circle.getCenterX());
            circle.setLayoutY(event.getY() - circle.getCenterX());
        };
        return e;
    })());

/*
    (function() {
        var start = 0;
        var before = 0;
        var time = 0;
        var sec = 0;

        var t = new canvasfx.animation.AnimationTimer();
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
        };
        return t;
    })().start();
*/
    stage.show();
};
