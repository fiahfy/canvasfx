//


/**
 * @fileoverview xxx
 */


goog.provide('fiahfy.mod');
goog.provide('fiahfy.mod.Object');

goog.require('fiahfy.mod.application.Application');


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
 * @return {Object} Cloned object.
 */
fiahfy.mod.Object.prototype.clone = function() {
  var clone = {};
  for (var key in this) {
    clone[key] = this[key];
  }
  return clone;
};

/**
 * @protected
 * @param {*} value Argument value.
 * @param {*=} defaultValue Default value if argument value is undefined.
 * @return {*}
 */
fiahfy.mod.Object.prototype.supplement = function(value, defaultValue) {
    if (typeof value === 'undefined' && typeof defaultValue !== 'undefined') {
        return defaultValue;
    }
    return value;
};
