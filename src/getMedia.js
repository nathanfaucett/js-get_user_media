var environment = require("@nathanfaucett/environment"),
    isFunction = require("@nathanfaucett/is_function");


var navigator = environment.window.navigator || {},
    getMedia;


if (navigator.mediaDevices && isFunction(navigator.mediaDevices.getUserMedia)) {
    getMedia = function getMedia(constraints, callback) {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function onSuccess(value) {
                callback(undefined, value);
            })["catch"](function onError(error) {
                callback(error);
            });
    };
} else {
    getMedia = function getMedia(constraints, callback) {
        callback(new Error("getMedia(constraints, callback) is not implemented in this environment"));
    };
}


module.exports = getMedia;