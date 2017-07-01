var environment = require("@nathanfaucett/environment"),
    isFunction = require("@nathanfaucett/is_function");


var navigator = environment.window.navigator || {},
    getDevices;


if (navigator.mediaDevices && isFunction(navigator.mediaDevices.enumerateDevices)) {
    getDevices = function getDevices(callback) {
        navigator.mediaDevices.enumerateDevices()
            .then(function onSuccess(value) {
                callback(undefined, value);
            })["catch"](function onError(error) {
                callback(error);
            });
    };
} else {
    getDevices = function getDevices(constraints, callback) {
        callback(new Error("getDevices(callback) is not implemented in this environment"));
    };
}


module.exports = getDevices;