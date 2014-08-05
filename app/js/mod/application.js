//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod.application.Application');

goog.require('fiahfy.mod.stage.Stage');


/**
 * @param {HTMLElement} element DOM node
 * @constructor
 */
fiahfy.mod.application.Application = function(element) {
    this.stage = new fiahfy.mod.stage.Stage(element);
};

/**
 * @public
 * @param {fiahfy.mod.stage.Stage} stage
 */
fiahfy.mod.application.Application.prototype.start = goog.abstractMethod;
