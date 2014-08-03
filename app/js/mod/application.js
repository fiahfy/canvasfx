//


/**
 * @fileoverview xxx
 */


goog.provide('com.blogspot.fiahfy.mod.application.Application');

goog.require('com.blogspot.fiahfy.mod.stage.Stage');


/**
 * @param {Element} element DOM node
 * @constructor
 */
com.blogspot.fiahfy.mod.application.Application = function(element) {
    this.stage = new com.blogspot.fiahfy.mod.stage.Stage(element);
};

/**
 * @public
 * @param {com.blogspot.fiahfy.mod.stage.Stage} stage
 */
com.blogspot.fiahfy.mod.application.Application.prototype.start = function(stage) {};
