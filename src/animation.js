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
};
canvasfx.inherit(canvasfx.animation.Animation, canvasfx.Object);


/**
 * @param {...canvasfx.animation.KeyFrame} var_args The keyframes
 *     of this Timeline.
 * @constructor
 * @extends {canvasfx.animation.Animation}
 */
canvasfx.animation.Timeline = function(var_args) {
    canvasfx.animation.Animation.call(this);
};
canvasfx.inherit(canvasfx.animation.Timeline, canvasfx.animation.Animation);


/**
 * @param {canvasfx.time.Duration} duration The time.
 * @constructor
 * @extends {canvasfx.Object}
 */
canvasfx.animation.KeyFrame = function(duration) {
    canvasfx.Object.call(this);
};
canvasfx.inherit(canvasfx.animation.KeyFrame, canvasfx.Object);


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
