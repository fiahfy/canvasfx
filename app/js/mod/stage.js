//


/**
 * @fileoverview Provides the top-level container classes.
 */


fmod.stage = {};


/**
 * The top level container.
 * @param {string} id Target DOM id.
 * @constructor
 * @extends {fmod.Object}
 */
fmod.stage.Stage = function(id) {
    fmod.Object.call(this);

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
     * @type {fmod.scene.Scene}
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

    this.element_.appendChild(this.canvas_);
    this.addEventListener_();
};
fmod.inherit(fmod.stage.Stage, fmod.Object);

/**
 * @public
 * @return {number} The width of this Scene.
 */
fmod.stage.Stage.prototype.getWidth = function() {
    return this.width_;
};

/**
 * @public
 * @return {number} The height of this Scene.
 */
fmod.stage.Stage.prototype.getHeight = function() {
    return this.height_;
};

/**
 * @public
 * @param {fmod.scene.Scene} scene Specify the scene
 *     to be used on this stage.
 */
fmod.stage.Stage.prototype.setScene = function(scene) {
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
 * @public
 */
fmod.stage.Stage.prototype.show = function() {
    this.clear_();
    this.scene_.getRoot().draw(this.context_);
};

/**
 * @private
 */
fmod.stage.Stage.prototype.clear_ = function() {
    var rect = new fmod.scene.shape.Rectangle(
        0, 0,
        this.width_, this.height_
    );
    rect.setFill(fmod.scene.paint.Color.WHITE);
    rect.draw(this.context_);
};

/**
 * @private
 */
fmod.stage.Stage.prototype.addEventListener_ = function() {
    //
    var me = this;
    var callback = function(eventType) {
        return function(e) {
            var rect = e.target.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            var event = new fmod.scene.input.MouseEvent(x, y);
            event.setEventType(fmod.scene.input.MouseEvent[eventType]);

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
        callback('MOUSE_DRAGGED')(e);
        var mousemove = callback('MOUSE_DRAGGED');
        var mouseup = function() {
            me.canvas_.removeEventListener('mousemove', mousemove);
            me.canvas_.removeEventListener('mouseup', mouseup);
        };
        me.canvas_.addEventListener('mousemove', mousemove);
        me.canvas_.addEventListener('mouseup', mouseup);
    });
};
