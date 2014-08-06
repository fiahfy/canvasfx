//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.application.Application');

goog.require('fiahfy.mod.Object');
goog.require('fiahfy.mod.stage.Stage');


/**
 * @param {HTMLElement} element DOM node
 * @constructor
 */
fiahfy.mod.application.Application = function(element) {
    fiahfy.mod.Object.call(this);

    this.stage = new fiahfy.mod.stage.Stage(element);
};
goog.inherits(fiahfy.mod.application.Application, fiahfy.mod.Object);

/**
 * @public
 * @param {fiahfy.mod.stage.Stage} stage
 */
fiahfy.mod.application.Application.prototype.start = goog.abstractMethod;
