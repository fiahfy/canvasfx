//


/**
 * @fileoverview xxx
 */


var fiahfy = fiahfy || {};
fiahfy.sample = {};


/**
 * @param {Element} element DOM node
 * @constructor
 * @extends {fmod.application.Application}
 */
fiahfy.sample.App = function(element) {
    fmod.application.Application.call(this, element);
};
fmod.inherit(fiahfy.sample.App, fmod.application.Application);

/**
 * @public
 * @override
 */
fiahfy.sample.App.prototype.start = function() {
    // set stage size
    //this.stage.setSize(1000, 1000);

    var r = new fmod.scene.Group();
    var s = new fmod.scene.Scene(r);
    this.stage.setScene(s);

    var c = r.getChildren();
    // scene
    var scene = new fmod.scene.Scene();
    //me.stage.setScene(scene);

    // draw grid
    for (var i = 0; i <= this.stage.getWidth(); i += 10)
    {
        var y = new fmod.scene.shape.Line(
            i, 0,
            i, this.stage.getHeight()
        );
        y.setStroke(fmod.scene.paint.Color.GRAY);
        if (i % 100 == 0) y.setStrokeWidth(2.0);
        //scene.add(y);
        c.push(y);
    }
    for (var j = 0; j <= this.stage.getHeight(); j += 10)
    {
        var x = new fmod.scene.shape.Line(
            0, j,
            this.stage.getWidth(), j
        );
        x.setStroke(fmod.scene.paint.Color.GRAY);
        if (j % 100 == 0) x.setStrokeWidth(2.0);
        //scene.add(x);
        c.push(x);
    }

    var ci = new fmod.scene.shape.Circle(10, 10, 5);
    var r = new fmod.scene.shape.Rectangle(5, 20, 10, 10);
    var g = new fmod.scene.Group(ci, r);
    c.push(g);
    
    var me = this;
    g.setOnMouseClicked((function() {
        var e = new fmod.event.EventListener();
        e.handle = function(event) {
            console.log('c');
            ci.setCenterX(event.getX());
            ci.setCenterY(event.getY());
        };
        return e;
    })());
    (function() {
        var start = 0;
        var before = 0;
        var time = 0;
        var sec = 0;
        var d = 0;


        var ax = 0;
        var ay = 0.00098;

        var vx = 0.05;
        var vy = 0;

        var px = 0;
        var py = 0;

        var t = new fmod.animation.AnimationTimer();
        t.handle = function(now) {
            if (!start) start = now;
            time = now - start;
            //if ()
            //console.log(time / 1000);
            if (time > sec * 1000) {
                console.log(parseInt(1000 / (now - before)));
                sec++;
            }
            if (before) {
                d = now - before;
            }
            if (time > 10*6 * 1000) this.stop();
            before = now;
            this.update();
        };
        t.update = function() {

            // draw rectangle
            /*
            var rect = new fmod.scene.shape.Rectangle(50, 150, 100, 100);
            rect.setFill(fmod.scene.paint.Color.GREEN);
            rect.setStroke(fmod.scene.paint.Color.RED);
            rect.setStrokeWidth(1);
            rect.setStrokeType(fmod.scene.shape.StrokeType.CENTERED);
            scene.add(rect);
            */
            //
            
            //console.log(px,py);
            
            vx = vx + ax*d;
            vy = vy + ay*d;
            px = px + vx*d;
            py = py + vy*d;
            if (py > 500) {vy = - Math.abs(vy); }
            if (px < 0) vx = Math.abs(vx);
            if (px > 500) vx = - Math.abs(vx);
            /*
            px = 0 + vx*time + ax * time * time / 2;
            py = 0 + vy*time + ay * time * time / 2;

            if (py > 500) {vy = - Math.abs(vy); }
            if (px < 0) vx = Math.abs(vx);
            if (px > 500) vx = - Math.abs(vx);
            */
            //console.log(vx);
            var circle = new fmod.scene.shape.Circle(px, py, 5);
            circle.setFill(fmod.scene.paint.Color.BLUE);
            //circle.setStroke(fmod.scene.paint.Color.RED);
            //circle.setStrokeWidth(1);
            //circle.setStrokeType(fmod.scene.shape.StrokeType.CENTERED);
            //scene.add(circle);


            g.setLayoutX(0.1);
            // show
            me.stage.show();
        };
        return t;
    })().start();
};
