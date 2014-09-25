//


/**
 * @fileoverview xxx
 */


canvasfx.animation = {};


/**
 * @param {number=} targetFramerate
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.animation.Animation = function(targetFramerate) {
    canvasfx.Object.call(this);

    /**
     * @protected
     * @type {canvasfx.util.Duration}
     */
    this.currentTime = canvasfx.util.Duration.ZERO;

    /**
     * @protected
     * @type {canvasfx.util.Duration}
     */
    this.delay = canvasfx.util.Duration.ZERO;

    /**
     * @protected
     * @type {canvasfx.event.EventHandler}
     */
    this.onFinished = null;

    /**
     * @protected
     * @type {canvasfx.animation.Animation.Status}
     */
    this.status = canvasfx.animation.Animation.Status.STOPPED;

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
    return this.currentTime;
};

/**
 * @return {canvasfx.util.Duration}
 */
canvasfx.animation.Animation.prototype.getDelay = function() {
    return this.delay;
};

/**
 * @return {canvasfx.event.EventHandler}
 */
canvasfx.animation.Animation.prototype.getOnFinished = function() {
    return this.onFinished;
};

/**
 */
canvasfx.animation.Animation.prototype.pause = function() {
    if (this.status != canvasfx.animation.Animation.Status.RUNNING) {
        return;
    }
    this.status = canvasfx.animation.Animation.Status.PAUSED;
};

/**
 * @todo private access
 */
canvasfx.animation.Animation.prototype.play = function() {
    if (this.status == canvasfx.animation.Animation.Status.RUNNING) {
        return;
    }
    this.status = canvasfx.animation.Animation.Status.RUNNING;

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

            if (me.status == canvasfx.animation.Animation.Status.RUNNING) {
                me.currentTime =
                    me.currentTime.add(new canvasfx.util.Duration(delta));
                if (me.currentTime.greaterThan(me.delay)) {
                    me.currentTime = me.delay;
                }
                me.update();
            }

            if (me.currentTime.greaterThanOrEqualTo(me.delay)) {
                var event = new canvasfx.event.ActionEvent();
                if (me.onFinished) {
                    me.onFinished.handle(event);
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
    this.delay = value;
};

/**
 * @param {canvasfx.event.EventListener} value
 */
canvasfx.animation.Animation.prototype.setOnFinished = function(value) {
    this.onFinished = value;
};

/**
 * @protected
 */
canvasfx.animation.Animation.prototype.update = function() {};


/**
 */
canvasfx.animation.Animation.prototype.stop = function() {
    if (this.status != canvasfx.animation.Animation.Status.RUNNING) {
        return;
    }
    this.status = canvasfx.animation.Animation.Status.STOPPED;
    if (this.timer_) {
        this.timer_.stop();
        this.timer_ = null;
    }
    this.currentTime = canvasfx.util.Duration.ZERO;
};


/**
 * @param {...canvasfx.animation.KeyFrame} var_args
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
 * @override
 */
canvasfx.animation.Timeline.prototype.pause = function() {
    this.animations_.forEach(function(element) {
        element.pause();
    });
};

/**
 * @override
 */
canvasfx.animation.Timeline.prototype.play = function() {
    var me = this;
    this.keyFrames_.forEach(function(element, index) {
        var animation = me.animations_[index];
        if (animation &&
            animation.status != canvasfx.animation.Animation.Status.STOPPED) {
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
 * @override
 */
canvasfx.animation.Timeline.prototype.stop = function() {
    this.animations_.forEach(function(element) {
        element.stop();
    });
};

/**
 * @override
 */
canvasfx.animation.Timeline.prototype.update = function() {};


/**
 * @param {canvasfx.util.Duration} time
 * @param {canvasfx.event.EventHandler} onFinished
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
};

/**
 * @return {canvasfx.util.Duration}
 */
canvasfx.animation.KeyFrame.prototype.getTime = function() {
    return this.time_;
};


/**
 * @constructor
 * @extends {canvasfx.animation.Animation}
 */
canvasfx.animation.Transition = function() {
    canvasfx.animation.Animation.call(this);
};
canvasfx.inherit(canvasfx.animation.Transition, canvasfx.animation.Animation);


/**
 * @param {canvasfx.util.Duration=} duration
 * @param {canvasfx.scene.Node=} node
 * @constructor
 * @extends {canvasfx.animation.Transition}
 */
canvasfx.animation.FadeTransition = function(duration, node) {
    canvasfx.animation.Transition.call(this);

    duration = canvasfx.supplement(duration, new canvasfx.util.Duration(400));

    /**
     * @private
     * @type {canvasfx.util.Duration}
     */
    this.duration_ = duration;

    /**
     * @private
     * @type {?canvasfx.scene.Node}
     */
    this.node_ = node;

    /**
     * @private
     * @type {number}
     */
    this.byValue_ = 0.0;

    /**
     * @private
     * @type {number|NaN}
     */
    this.fromValue_ = NaN;

    /**
     * @private
     * @type {number|NaN}
     */
    this.toValue_ = NaN;

    /**
     * @private
     * @type {number|NaN}
     */
    this.start_ = NaN;

    /**
     * @private
     * @type {number|NaN}
     */
    this.end_ = NaN;
};
canvasfx.inherit(canvasfx.animation.FadeTransition,
    canvasfx.animation.Transition);

/**
 * @return {number}
 */
canvasfx.animation.FadeTransition.prototype.getByValue = function() {
    return this.byValue_;
};

/**
 * @return {canvasfx.util.Duration}
 */
canvasfx.animation.FadeTransition.prototype.getDuration = function() {
    return this.duration_;
};

/**
 * @return {number|NaN}
 */
canvasfx.animation.FadeTransition.prototype.getFromValue = function() {
    return this.fromValue_;
};

/**
 * @return {canvasfx.scene.Node}
 */
canvasfx.animation.FadeTransition.prototype.getNode = function() {
    return this.node_;
};

/**
 * @return {number|NaN}
 */
canvasfx.animation.FadeTransition.prototype.getToValue = function() {
    return this.toValue_;
};

/**
 * @override
 */
canvasfx.animation.FadeTransition.prototype.play = function() {
    this.start_ = NaN;
    this.end_ = NaN;

    if (!this.node_) {
        return;
    }

    this.start_ = this.fromValue_;
    if (isNaN(this.start_)) {
        this.start_ = this.node_.getOpacity();
    }
    this.end_ = this.toValue_;
    if (isNaN(this.end_)) {
        if (!this.byValue_) {
            return;
        }
        this.end_ = this.start_ + this.byValue_;
    }

    this.delay = this.duration_;

    canvasfx.animation.Animation.prototype.play.call(this);
}

/**
 * @param {number} value
 */
canvasfx.animation.FadeTransition.prototype.setByValue = function(value) {
    this.byValue_ = value;
};

/**
 * @param {canvasfx.util.Duration} value
 */
canvasfx.animation.FadeTransition.prototype.setDuration = function(value) {
    this.duration_ = value;
};

/**
 * @param {number|NaN} value
 */
canvasfx.animation.FadeTransition.prototype.setFromValue = function(value) {
    this.fromValue_ = value;
};

/**
 * @param {canvasfx.scene.Node} value
 */
canvasfx.animation.FadeTransition.prototype.setNode = function(value) {
    this.node_ = value;
};

/**
 * @param {number|NaN} value
 */
canvasfx.animation.FadeTransition.prototype.setToValue = function(value) {
    this.toValue_ = value;
};

/**
 * @override
 */
canvasfx.animation.FadeTransition.prototype.update = function() {
    if (!this.node_ || isNaN(this.start_) || isNaN(this.end_)) {
        return;
    }

    var opacity = this.start_ -
        this.start_ * this.currentTime.toMillis() / this.duration_.toMillis() +
        this.end_ * this.currentTime.toMillis() / this.duration_.toMillis();

    this.node_.setOpacity(opacity);
};


/**
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.animation.AnimationTimer = function() {
    canvasfx.Object.call(this);

    /**
     * @private
     * @type {number}
     */
    this.id_ = null;
};
canvasfx.inherit(canvasfx.animation.AnimationTimer, canvasfx.Object);

/**
 * @param {number} now
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
 * @return {Function}
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
 * @return {Function}
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
