var environment = require("@nathanfaucett/environment");


if (environment.browser) {
    require("webrtc-adapter");
}


var mediaDevices = exports;


mediaDevices.getDevices = require("./getDevices");
mediaDevices.getMedia = require("./getMedia");