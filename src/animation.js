//


/**
 * @fileoverview Provides the set of classes
 * for ease of use transition based animations.
 */


canvasfx.animation = {};


/**
 * @param {number=} targetFramerate The custom target frame rate
 *     for this Animation.
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.animation.Animation = function(targetFramerate) {
    canvasfx.Object.call(this);

    /**
     * @private
     * @type {canvasfx.util.Duration}
     */
    this.currentTime_ = canvasfx.util.Duration.ZERO;

    /**
     * @private
     * @type {canvasfx.util.Duration}
     */
    this.delay_ = canvasfx.util.Duration.ZERO;

    /**
     * @private
     * @type {canvasfx.event.EventHandler}
     */
    this.onFinished_ = null;

    /**
     * @private
     * @type {canvasfx.animation.Animation.Status}
     */
    this.status_ = canvasfx.animation.Animation.Status.STOPPED;

    /**
     * @private
     * @type {canvasfx.animation.AnimationTimer}
     */
    this.timer_ = null;
};
canvasfx.inherit(canvasfx.animation.Animation, canvasfx.Object);

/**
 * @enum {string}
 */
canvasfx.animation.Animation.Status = {
    PAUSED: 'paused',
    RUNNING: 'running',
    STOPPED: 'stopped'
};

/**
 * @return {canvasfx.util.Duration}
 */
canvasfx.animation.Animation.prototype.getCurrentTime = function() {
    return this.currentTime_;
};

/**
 * @return {canvasfx.util.Duration}
 */
canvasfx.animation.Animation.prototype.getDelay = function() {
    return this.delay_;
};

/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.animation.Animation.prototype.getOnFinished = function() {
    return this.onFinished_;
};

/**
 */
canvasfx.animation.Animation.prototype.pause = function() {
    if (this.status_ != canvasfx.animation.Animation.Status.RUNNING) {
        return;
    }
    this.status_ = canvasfx.animation.Animation.Status.PAUSED;
};

/**
 * @todo private access
 */
canvasfx.animation.Animation.prototype.play = function() {
    if (this.status_ == canvasfx.animation.Animation.Status.RUNNING) {
        return;
    }
    this.status_ = canvasfx.animation.Animation.Status.RUNNING;

    if (this.timer_) {
        return;
    }

    var me = this;
    this.timer_ = (function() {
        var beforeTime = Date.now();
        var delta = 0;
        var t = new canvasfx.animation.AnimationTimer();
        t.handle = function(now) {
            delta = now - beforeTime;
            beforeTime = now;

            if (me.status_ == canvasfx.animation.Animation.Status.RUNNING) {
                me.currentTime_ =
                    me.currentTime_.add(new canvasfx.util.Duration(delta));
            }

            if (me.currentTime_.greaterThanOrEqualTo(me.delay_)) {
                var event = new canvasfx.event.ActionEvent();
                if (me.onFinished_) {
                    me.onFinished_.handle(event);
                }
                t.stop();
                me.stop();
            }
        };
        return t;
    })();
    this.timer_.start();
};

/**
 * @param {canvasfx.util.Duration} value
 */
canvasfx.animation.Animation.prototype.setDelay = function(value) {
    this.delay_ = value;
};

/**
 * @param {canvasfx.event.EventListener} value
 */
canvasfx.animation.Animation.prototype.setOnFinished = function(value) {
    this.onFinished_ = value;
};

/**
 */
canvasfx.animation.Animation.prototype.stop = function() {
    if (this.status_ != canvasfx.animation.Animation.Status.RUNNING) {
        return;
    }
    this.status_ = canvasfx.animation.Animation.Status.STOPPED;
    if (this.timer_) {
        this.timer_.stop();
        this.timer_ = null;
    }
    this.currentTime_ = canvasfx.util.Duration.ZERO;
};


/**
 * @param {...canvasfx.animation.KeyFrame} var_args The keyframes
 *     of this Timeline.
 * @constructor
 * @extends {canvasfx.animation.Animation}
 */
canvasfx.animation.Timeline = function(var_args) {
    canvasfx.animation.Animation.call(this);

    /**
     * @private
     * @type {Array}
     */
    this.keyFrames_ = Array.prototype.slice.call(arguments);

    /**
     * @private
     * @type {Array}
     */
    this.animations_ = [];
};
canvasfx.inherit(canvasfx.animation.Timeline, canvasfx.animation.Animation);

/**
 * @return {Array}
 */
canvasfx.animation.Timeline.prototype.getKeyFrames = function() {
    return this.keyFrames_;
};

/**
 */
canvasfx.animation.Timeline.prototype.pause = function() {
    this.animations_.forEach(function(element) {
        element.pause();
    });
};

/**
 */
canvasfx.animation.Timeline.prototype.play = function() {
    var me = this;
    this.keyFrames_.forEach(function(element, index) {
        var animation = me.animations_[index];
        if (animation &&
            animation.status_ != canvasfx.animation.Animation.Status.STOPPED) {
            //
        } else {
            animation = new canvasfx.animation.Animation();
            animation.setDelay(element.getTime());
            animation.setOnFinished(element.getOnFinished());
            me.animations_[index] = animation;
        }
    });
    this.animations_ = this.animations_.slice(0, this.keyFrames_.length);
    this.animations_.forEach(function(element) {
        element.play();
    });
};

/**
 */
canvasfx.animation.Timeline.prototype.stop = function() {
    this.animations_.forEach(function(element) {
        element.stop();
    });
};


/**
 * @param {canvasfx.util.Duration} time The time.
 * @param {canvasfx.event.EventHandler} onFinished The onFinished-handler.
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.animation.KeyFrame = function(time, onFinished) {
    canvasfx.Object.call(this);

    /**
     * @private
     * @type {canvasfx.util.Duration}
     */
    this.time_ = time;

    /**
     * @private
     * @type {canvasfx.event.EventHandler}
     */
    this.onFinished_ = onFinished;
};
canvasfx.inherit(canvasfx.animation.KeyFrame, canvasfx.Object);

/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.animation.KeyFrame.prototype.getOnFinished = function() {
    return this.onFinished_;
}

/**
 * @return {canvasfx.util.Duration}
 */
canvasfx.animation.KeyFrame.prototype.getTime = function() {
    return this.time_;
}


/**
 * The class AnimationTimer allows to create a timer,
 * that is called in each frame while it is active.
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.animation.AnimationTimer = function() {
    canvasfx.Object.call(this);

    /**
     * Timer id
     * @private
     * @type {number}
     */
    this.id_ = null;
};
canvasfx.inherit(canvasfx.animation.AnimationTimer, canvasfx.Object);

/**
 * @param {number} now The timestamp of the current frame given in milliseconds.
 */
canvasfx.animation.AnimationTimer.prototype.handle = canvasfx.abstractMethod;

/**
 */
canvasfx.animation.AnimationTimer.prototype.start = function() {
    this.stop();

    var me = this;
    (function animationLoop() {
        me.id_ = canvasfx.animation.AnimationTimer.requestAnimationFrame_()(
            animationLoop
        );
        me.handle(Date.now());
    })();
};

/**
 */
canvasfx.animation.AnimationTimer.prototype.stop = function() {
    canvasfx.animation.AnimationTimer.cancelAnimationFrame_()(
        this.id_
    );
    this.id_ = null;
};

/**
 * @const
 * @private
 * @return {Function} Enable request animation frame func.
 */
canvasfx.animation.AnimationTimer.requestAnimationFrame_ = function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        /** @param {Function} callback */
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
};

/**
 * @const
 * @private
 * @return {Function} Enable cancel animation frame func.
 */
canvasfx.animation.AnimationTimer.cancelAnimationFrame_ = function() {
    return window.cancelAnimationFrame ||
        window.cancelRequestAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        /** @param {number} id */
        function(id) {
            window.clearTimeout(id);
        };
};
