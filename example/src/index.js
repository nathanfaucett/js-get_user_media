var getUserMedia = require("../..");


var video = document.getElementById("video");


getUserMedia({
    video: true,
    audio: true
}, function onGetUserMedia(error, localMediaStream) {
    if (error) {
        console.error(error);
    } else {
        video.src = window.URL.createObjectURL(localMediaStream);
        video.onloadedmetadata = function onLoadedMetaData() {};
    }
});
