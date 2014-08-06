//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod');
goog.provide('fiahfy.mod.Object');


/**
 * @const
 * @public
 * @type {string}
 */
fiahfy.mod.VERSION = '1.0.0';


/**
 * @constructor
 */
fiahfy.mod.Object = function() {
    //
};

/**
 * @public
 * @return {Object}
 */
fiahfy.mod.Object.prototype.clone = function() {
  var clone = {};
  for (var key in this) {
    clone[key] = this[key];
  }
  return clone;
};
