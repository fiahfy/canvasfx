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
 * @type {string}
 */
canvasfx.basePath_ = '';

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
 * @param {*} value
 * @param {*=} defaultValue
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
 * @param {Function} application
 */
canvasfx.loadApplication = function(application) {
    new application();
};

/**
 */
canvasfx.abstractMethod = function() {};

/**
 * @private
 */
canvasfx.setBasePath_ = function() {
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

    canvasfx.basePath_ =
        path.slice(0, path.length - ('/' + canvasfx.BASE_FILE_NAME).length);
};

/**
 * @private
 * @param {string} namespace
 */
canvasfx.importNameSpace_ = function(namespace) {
    var array = namespace.split('.');
    array.shift();

    if (!array.length) {
        return;
    }

    var path = canvasfx.basePath_;
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
 * @constructor
 */
canvasfx.Object = function() {
};

/**
 * @return {Object}
 */
canvasfx.Object.prototype.clone = function() {
    var clone = {};
    Object.keys(this).forEach(function(key) {
        clone[key] = this[key];
    }, this);
    return clone;
};


canvasfx.setBasePath_();
canvasfx.importNameSpace_('canvasfx.animation');
canvasfx.importNameSpace_('canvasfx.application');
canvasfx.importNameSpace_('canvasfx.event');
canvasfx.importNameSpace_('canvasfx.geometry');
canvasfx.importNameSpace_('canvasfx.math');
canvasfx.importNameSpace_('canvasfx.scene');
canvasfx.importNameSpace_('canvasfx.scene.input');
canvasfx.importNameSpace_('canvasfx.scene.paint');
canvasfx.importNameSpace_('canvasfx.scene.shape');
canvasfx.importNameSpace_('canvasfx.stage');
canvasfx.importNameSpace_('canvasfx.util');
