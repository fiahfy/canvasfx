//


/**
 * @fileoverview Provides the top-level container classes.
 */


canvasfx.stage = {};


/**
 * The top level container.
 * @param {string} id Target DOM id.
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.stage.Stage = function(id) {
    canvasfx.Object.call(this);

    /**
     * @private
     * @type {HTMLElement}
     */
    this.element_ = window.document.getElementById(id);

    /**
     * Canvas DOM element.
     * @private
     * @type {HTMLElement}
     */
    this.canvas_ = document.createElement('canvas');

    /**
     * Canvas context.
     * @private
     * @type {CanvasRenderingContext2D}
     */
    this.context_ = this.canvas_.getContext('2d');

    /**
     * Specify the scene to be used on this stage.
     * @private
     * @type {canvasfx.scene.Scene}
     */
    this.scene_ = null;

    /**
     * The width of this Stage.
     * @type {number}
     * @private
     */
    this.width_ = this.element_.offsetWidth;

    /**
     * The height of this Stage.
     * @type {number}
     * @private
     */
    this.height_ = this.element_.offsetHeight;

    /**
     * @type {boolean}
     * @private
     */
    this.isShow_ = false;

    this.element_.appendChild(this.canvas_);
    this.addEventListener_();
    this.update_();
};
canvasfx.inherit(canvasfx.stage.Stage, canvasfx.Object);

/**
 * @return {number} The width of this Scene.
 */
canvasfx.stage.Stage.prototype.getWidth = function() {
    return this.width_;
};

/**
 * @return {number} The height of this Scene.
 */
canvasfx.stage.Stage.prototype.getHeight = function() {
    return this.height_;
};

/**
 * @param {canvasfx.scene.Scene} scene Specify the scene
 *     to be used on this stage.
 */
canvasfx.stage.Stage.prototype.setScene = function(scene) {
    this.scene_ = scene;
    if (this.scene_.getWidth() && this.scene_.getHeight()) {
        this.width_ = this.scene_.getWidth();
        this.height_ = this.scene_.getHeight();
    } else {
        this.canvas_.width = this.width_;
        this.canvas_.height = this.height_;
        this.scene_.setWidth(this.width_);
        this.scene_.setHeight(this.height_);
    }
};

/**
 */
canvasfx.stage.Stage.prototype.show = function() {
    this.isShow_ = true;
};

/**
 * @private
 */
canvasfx.stage.Stage.prototype.clear_ = function() {
    var rect = new canvasfx.scene.shape.Rectangle(
        0, 0,
        this.width_, this.height_
    );
    rect.setFill(canvasfx.scene.paint.Color.WHITE);
    rect.draw(this.context_);
};

/**
 * @private
 */
canvasfx.stage.Stage.prototype.draw_ = function() {
    this.scene_.getRoot().draw(this.context_);
};

/**
 * @private
 */
canvasfx.stage.Stage.prototype.redraw_ = function() {
    this.clear_();
    this.draw_();
};

/**
 * @private
 * @todo
 */
canvasfx.stage.Stage.prototype.update_ = function() {
    var me = this;
    (function() {
        var t = new canvasfx.animation.AnimationTimer();
        t.handle = function() {
            if (!me.isShow_) return;
            me.redraw_();
        };
        return t;
    })().start();
};

/**
 * @private
 */
canvasfx.stage.Stage.prototype.addEventListener_ = function() {
    var me = this;
    var callback = function(eventType) {
        return function(e) {
            var rect = e.target.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            var event = new canvasfx.scene.input.MouseEvent(x, y);
            event.setEventType(canvasfx.scene.input.MouseEvent[eventType]);

            me.scene_.handleEvent(event);
        };
    };

    // basic events
    var events = {
        'click': 'MOUSE_CLICKED'
    };
    Object.keys(events).forEach(function(key) {
        var value = this[key];
        me.canvas_.addEventListener(key, callback(value));
    }, events);

    // drag
    this.canvas_.addEventListener('mousedown', function(e) {
        var event = e;
        callback('MOUSE_DRAGGED')(e);

        var mousemove = function(e) {
            event = e;
            callback('MOUSE_DRAGGED')(e);
        };

        var timer = null;
        (function animationLoop() {
            timer = canvasfx.animation.AnimationTimer.requestAnimationFrame_()(
                animationLoop
            );
            mousemove(event);
        })();

        var mouseup = function() {
            me.canvas_.removeEventListener('mousemove', mousemove);
            me.canvas_.removeEventListener('mouseup', mouseup);
            canvasfx.animation.AnimationTimer.cancelAnimationFrame_()(
                timer
            );
        };
        me.canvas_.addEventListener('mousemove', mousemove);
        me.canvas_.addEventListener('mouseup', mouseup);
    });
};
