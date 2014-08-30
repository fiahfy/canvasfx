//


/**
 * @fileoverview Application class from which applications extend.
 */


fmod.application = {};


/**
 * @param {HTMLElement} element Target DOM node.
 * @constructor
 * @extends {fmod.Object}
 */
fmod.application.Application = function(element) {
    fmod.Object.call(this);

    this.stage = new fmod.stage.Stage(element);
};
fmod.inherit(fmod.application.Application, fmod.Object);

/**
 * @public
 * @param {fmod.stage.Stage} stage The primary stage for this application,
 *     onto which the application scene can be set.
 */
fmod.application.Application.prototype.start = fmod.abstractMethod;
