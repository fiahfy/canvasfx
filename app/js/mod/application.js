//


/**
 * @fileoverview Application class from which applications extend.
 */


goog.provide('fiahfy.mod.application.Application');

goog.require('fiahfy.mod.Object');
goog.require('fiahfy.mod.stage.Stage');


/**
 * @param {HTMLElement} element Target DOM node.
 * @constructor
 * @extends {fiahfy.mod.Object}
 */
fiahfy.mod.application.Application = function(element) {
    fiahfy.mod.Object.call(this);

    this.stage = new fiahfy.mod.stage.Stage(element);
};
goog.inherits(fiahfy.mod.application.Application, fiahfy.mod.Object);

/**
 * @public
 * @param {fiahfy.mod.stage.Stage} stage The primary stage for this application,
 *     onto which the application scene can be set.
 */
fiahfy.mod.application.Application.prototype.start = goog.abstractMethod;
