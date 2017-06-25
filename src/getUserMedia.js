var environment = require("@nathanfaucett/environment"),
    isNative = require("@nathanfaucett/is_native");


var navigator = environment.window.navigator || {},
    navigatorGetUserMedia = (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
    ),
    navigatorMediaDevicesGetUserMedia = navigator.mediaDevices && (
        navigator.mediaDevices.getUserMedia
    ),
    getUserMedia;


if (isNative(navigatorMediaDevicesGetUserMedia)) {
    getUserMedia = function getUserMedia(constraints, callback) {
        navigatorMediaDevicesGetUserMedia.call(navigator.mediaDevices, constraints)
            .then(function onSuccess(data) {
                callback(undefined, data);
            })["catch"](function onError(error) {
                callback(error);
            });
    };
} else if (isNative(navigatorGetUserMedia)) {
    getUserMedia = function getUserMedia(constraints, callback) {
        navigatorGetUserMedia.call(
            navigator,
            constraints,
            function onSuccess(data) {
                callback(undefined, data);
            },
            function onError(error) {
                callback(error);
            }
        );
    };
} else {
    getUserMedia = function getUserMedia(constraints, callback) {
        callback(new Error("getUserMedia is not implemented in this browser"));
    };
}


module.exports = getUserMedia;