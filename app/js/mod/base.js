//


/**
 * @fileoverview xxx
 */


var fmod = fmod || {};


/**
 * @const
 * @public
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
 * @public
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
fmod.load_ = function(namespace) {
    var array = namespace.split('.');
    array.pop();
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
    //
};

/**
 * @public
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

/**
 * @protected
 * @param {*} value Argument value.
 * @param {*=} defaultValue Default value if argument value is undefined.
 * @return {*}
 */
fmod.Object.prototype.supplement = function(value, defaultValue) {
    if (typeof value === 'undefined' && typeof defaultValue !== 'undefined') {
        return defaultValue;
    }
    return value;
};

fmod.load_('fmod.animation.Animation');
fmod.load_('fmod.application.Application');
fmod.load_('fmod.event.Event');
fmod.load_('fmod.geometry.Point');
fmod.load_('fmod.math.Math');
fmod.load_('fmod.scene.Scene');
fmod.load_('fmod.scene.input.Input');
fmod.load_('fmod.scene.paint.Paint');
fmod.load_('fmod.scene.shape.Shape');
fmod.load_('fmod.stage.Stage');
fmod.load_('fmod.time.Time');
