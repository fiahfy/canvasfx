//


/**
 * @fileoverview Application class from which applications extend.
 */


fmod.application = {};


/**
 * @constructor
 * @extends {fmod.Object}
 */
fmod.application.Application = function() {
    fmod.Object.call(this);

    /**
     * @protected
     * @type {string}
     */
    this.id = 'app';

    /**
     * @private
     * @type {fmod.stage.Stage}
     */
    this.stage_ = new fmod.stage.Stage(this.id);

    this.start(this.stage_);
};
fmod.inherit(fmod.application.Application, fmod.Object);

/**
 * @param {fmod.stage.Stage} stage The primary stage for this application,
 *     onto which the application scene can be set.
 */
fmod.application.Application.prototype.start = fmod.abstractMethod;
