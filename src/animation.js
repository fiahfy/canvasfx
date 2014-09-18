//


/**
 * @fileoverview Provides the set of classes
 * for ease of use transition based animations.
 */


fmod.animation = {};


/**
 * @param {number=} targetFramerate The custom target frame rate
 *     for this Animation.
 * @constructor
 * @extends {fmod.Object}
 */
fmod.animation.Animation = function(targetFramerate) {
    fmod.Object.call(this);
};
fmod.inherit(fmod.animation.Animation, fmod.Object);


/**
 * @param {...fmod.animation.KeyFrame} var_args The keyframes
 *     of this Timeline.
 * @constructor
 * @extends {fmod.animation.Animation}
 */
fmod.animation.Timeline = function(var_args) {
    fmod.animation.Animation.call(this);
};
fmod.inherit(fmod.animation.Timeline, fmod.animation.Animation);


/**
 * @param {fmod.time.Duration} duration The time.
 * @constructor
 * @extends {fmod.Object}
 */
fmod.animation.KeyFrame = function(duration) {
    fmod.Object.call(this);
};
fmod.inherit(fmod.animation.KeyFrame, fmod.Object);


/**
 * The class AnimationTimer allows to create a timer,
 * that is called in each frame while it is active.
 * @constructor
 * @extends {fmod.Object}
 */
fmod.animation.AnimationTimer = function() {
    fmod.Object.call(this);

    /**
     * Timer id
     * @private
     * @type {number}
     */
    this.id_ = null;
};
fmod.inherit(fmod.animation.AnimationTimer, fmod.Object);

/**
 * @param {number} now The timestamp of the current frame given in milliseconds.
 */
fmod.animation.AnimationTimer.prototype.handle = fmod.abstractMethod;

/**
 */
fmod.animation.AnimationTimer.prototype.start = function() {
    this.stop();

    var me = this;
    (function animationLoop() {
        me.id_ = fmod.animation.AnimationTimer.requestAnimationFrame_()(
            animationLoop
        );
        me.handle(Date.now());
    })();
};

/**
 */
fmod.animation.AnimationTimer.prototype.stop = function() {
    fmod.animation.AnimationTimer.cancelAnimationFrame_()(
        this.id_
    );
    this.id_ = null;
};

/**
 * @const
 * @private
 * @return {Function} Enable request animation frame func.
 */
fmod.animation.AnimationTimer.requestAnimationFrame_ = function() {
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
fmod.animation.AnimationTimer.cancelAnimationFrame_ = function() {
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
