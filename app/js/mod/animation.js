//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.animation.Animation');
goog.provide('fiahfy.mod.animation.AnimationTimer');
goog.provide('fiahfy.mod.animation.Timeline');

goog.require('fiahfy.mod.Object');
goog.require('fiahfy.mod.time.Duration');


/**
 * @param {number=} targetFramerate Frame rate for this animation.
 * @constructor
 */
fiahfy.mod.animation.Animation = function(targetFramerate) {
    fiahfy.mod.Object.call(this);
};
goog.inherits(fiahfy.mod.animation.Animation, fiahfy.mod.Object);


/**
 * @param {...fiahfy.mod.animation.KeyFrame} var_args Key frame for timeline.
 * @constructor
 * @extends {fiahfy.mod.animation.Animation}
 */
fiahfy.mod.animation.Timeline = function(var_args) {
    fiahfy.mod.animation.Animation.call(this);
};
goog.inherits(fiahfy.mod.animation.Timeline, fiahfy.mod.animation.Animation);


/**
 * @param {fiahfy.mod.time.Duration} duration Key frame offset
 * @constructor
 */
fiahfy.mod.animation.KeyFrame = function(duration) {
    fiahfy.mod.Object.call(this);
};
goog.inherits(fiahfy.mod.animation.KeyFrame, fiahfy.mod.Object);


/**
 * @constructor
 */
fiahfy.mod.animation.AnimationTimer = function() {
    fiahfy.mod.Object.call(this);

    /**
     * Timer id
     * @private
     * @type {number}
     */
    this.id_ = null;
};
goog.inherits(fiahfy.mod.animation.AnimationTimer, fiahfy.mod.Object);

/**
 * @public
 * @param {number} now
 */
fiahfy.mod.animation.AnimationTimer.prototype.handle = goog.abstractMethod;

/**
 * @public
 */
fiahfy.mod.animation.AnimationTimer.prototype.start = function() {
    this.stop();

    var me = this;
    (function animationLoop() {
        me.id_ = fiahfy.mod.animation.AnimationTimer.requestAnimationFrame_()(
            animationLoop
        );
        me.handle(Date.now());
    })();
};

/**
 * @public
 */
fiahfy.mod.animation.AnimationTimer.prototype.stop = function() {
    fiahfy.mod.animation.AnimationTimer.canceRequestlAnimationFrame_()(
        this.id_
    );
    this.id_ = null;
};

/**
 * @const
 * @private
 * @return {Function} Enable request animation frame func
 */
fiahfy.mod.animation.AnimationTimer.requestAnimationFrame_ = function() {
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
 * @return {Function} Enable cancel request animation frame func
 */
fiahfy.mod.animation.AnimationTimer.canceRequestlAnimationFrame_ = function() {
    return window.cancelRequestAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        /** @param {number} id */
        function(id) {
            window.clearTimeout(id);
        };
};
