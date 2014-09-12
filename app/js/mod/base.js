//


/**
 * @fileoverview xxx
 */


var fmod = fmod || {};


/**
 * @const
 * @type {string}
 */
fmod.VERSION = '1.0.0';

/**
 * @const
 * @type {string}
 */
fmod.BASE_FILE_NAME = 'base.js';

/**
 * @private
 * @type {Array}
 */
fmod.loadFiles_ = [];

/**
 * @param {Object} child
 * @param {Object} parent
 */
fmod.inherit = function(child, parent) {
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
fmod.supplement = function(value, defaultValue) {
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
fmod.inArray = function(value, array) {
    return array.some(function(element) {
        return (element === value);
    });
};

/**
 * @param {string} namespace
 */
fmod.importNameSpace = function(namespace) {
    var array = namespace.split('.');
    array.shift();

    if (!array.length) {
        return;
    }

    var path = fmod.basePath_();
    array.forEach(function(element) {
        path = path + '/' + element;
    });
    path += '.js';

    if (fmod.inArray(path, fmod.loadFiles_)) {
        return;
    }

    fmod.loadFiles_.push(path);
    document.write('<script src="' + path + '"></script>');
};

/**
 * @param {fmod.Application} application
 */
fmod.loadApplication = function(application) {
    new application();
};

/**
 * For abstract method
 */
fmod.abstractMethod = function() {};

/**
 * @private
 * @return {string}
 */
fmod.basePath_ = function() {
    var path = '';
    var scripts = window.document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++)
    {
        var script = scripts[i];
        var src = script.src;
        if (src.lastIndexOf('/' + fmod.BASE_FILE_NAME) ==
            src.length - ('/' + fmod.BASE_FILE_NAME).length) {
            path = src;
            break;
        }
    }

    return path.slice(0, path.length - ('/' + fmod.BASE_FILE_NAME).length);
};


/**
 * @constructor
 */
fmod.Object = function() {
};

/**
 * @return {Object} Cloned object.
 */
fmod.Object.prototype.clone = function() {
    var clone = {};
    for (var key in this)
    {
        clone[key] = this[key];
    }
    return clone;
};


fmod.importNameSpace('fmod.animation');
fmod.importNameSpace('fmod.application');
fmod.importNameSpace('fmod.event');
fmod.importNameSpace('fmod.geometry');
fmod.importNameSpace('fmod.math');
fmod.importNameSpace('fmod.scene');
fmod.importNameSpace('fmod.scene.input');
fmod.importNameSpace('fmod.scene.paint');
fmod.importNameSpace('fmod.scene.shape');
fmod.importNameSpace('fmod.stage');
fmod.importNameSpace('fmod.time');
