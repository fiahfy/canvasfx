//


/**
 * @fileoverview xxx
 */


var canvasfx = canvasfx || {};


/**
 * @const
 * @type {string}
 */
canvasfx.VERSION = '1.0.0';

/**
 * @const
 * @type {string}
 */
canvasfx.BASE_FILE_NAME = 'base.js';

/**
 * @private
 * @type {Array}
 */
canvasfx.loadFiles_ = [];

/**
 * @param {Object} child
 * @param {Object} parent
 */
canvasfx.inherit = function(child, parent) {
    /** @constructor */
    function t() {}
    t.prototype = parent.prototype;
    child.prototype = new t();
    /** @override */
    child.prototype.constructor = child;
};

/**
 * @param {*} value Argument value.
 * @param {*=} defaultValue Default value if argument value is undefined.
 * @return {*}
 */
canvasfx.supplement = function(value, defaultValue) {
    if (typeof value === 'undefined' && typeof defaultValue !== 'undefined') {
        return defaultValue;
    }
    return value;
};

/**
 * @param {*} value
 * @param {Array} array
 * @return {boolean}
 */
canvasfx.inArray = function(value, array) {
    return array.some(function(element) {
        return (element === value);
    });
};

/**
 * @param {string} namespace
 */
canvasfx.importNameSpace = function(namespace) {
    var array = namespace.split('.');
    array.shift();

    if (!array.length) {
        return;
    }

    var path = canvasfx.basePath_();
    array.forEach(function(element) {
        path = path + '/' + element;
    });
    path += '.js';

    if (canvasfx.inArray(path, canvasfx.loadFiles_)) {
        return;
    }

    canvasfx.loadFiles_.push(path);
    document.write('<script src="' + path + '"></script>');
};

/**
 * @param {Function} application
 */
canvasfx.loadApplication = function(application) {
    new application();
};

/**
 * For abstract method
 */
canvasfx.abstractMethod = function() {};

/**
 * @private
 * @return {string}
 */
canvasfx.basePath_ = function() {
    var path = '';
    var scripts = window.document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++)
    {
        var script = scripts[i];
        var src = script.src;
        if (src.lastIndexOf('/' + canvasfx.BASE_FILE_NAME) ==
            src.length - ('/' + canvasfx.BASE_FILE_NAME).length) {
            path = src;
            break;
        }
    }

    return path.slice(0, path.length - ('/' + canvasfx.BASE_FILE_NAME).length);
};


/**
 * @constructor
 */
canvasfx.Object = function() {
};

/**
 * @return {Object} Cloned object.
 */
canvasfx.Object.prototype.clone = function() {
    var clone = {};
    Object.keys(this).forEach(function(key) {
        clone[key] = this[key];
    }, this);
    return clone;
};


canvasfx.importNameSpace('canvasfx.animation');
canvasfx.importNameSpace('canvasfx.application');
canvasfx.importNameSpace('canvasfx.event');
canvasfx.importNameSpace('canvasfx.geometry');
canvasfx.importNameSpace('canvasfx.math');
canvasfx.importNameSpace('canvasfx.scene');
canvasfx.importNameSpace('canvasfx.scene.input');
canvasfx.importNameSpace('canvasfx.scene.paint');
canvasfx.importNameSpace('canvasfx.scene.shape');
canvasfx.importNameSpace('canvasfx.stage');
canvasfx.importNameSpace('canvasfx.time');
