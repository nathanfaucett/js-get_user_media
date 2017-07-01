var isUndefined = require("@nathanfaucett/is_undefined"),
    arrayForEach = require("@nathanfaucett/array-for_each"),
    eventListener = require("@nathanfaucett/event_listener"),
    mediaDevices = require("../..");


require("webrtc-adapter");


var videoOptions = [],
    audioOptions = [],

    videoSelect = document.getElementById("video_select"),
    audioSelect = document.getElementById("audio_select"),

    videoDevice = null,
    audioDevice = null,
    stream = null,

    video = document.getElementById("video");


eventListener.on(videoSelect, "change", function() {
    videoDevice = videoOptions[videoSelect.selectedIndex];
    getMedia();
});
eventListener.on(audioSelect, "change", function() {
    audioDevice = audioOptions[audioSelect.selectedIndex];
    getMedia();
});


mediaDevices.getDevices(function onGetDevices(error, devices) {
    if (error) {
        console.error(error);
    } else {
        arrayForEach(devices, function(device) {
            switch (device.kind) {
                case "videoinput":
                    videoOptions.push(device);
                    break;
                case "audioinput":
                    audioOptions.push(device);
                    break;
            }
        });

        videoSelect.innerHTML = "";
        arrayForEach(videoOptions, function(device) {
            videoSelect.innerHTML += "<option value=\""+ device.deviceId +"\">"+ device.label || "unknown" +"</option>";
        });

        audioSelect.innerHTML = "";
        arrayForEach(audioOptions, function(device) {
            audioSelect.innerHTML += "<option value=\""+ device.deviceId +"\">"+ device.label || "unknown" +"</option>";
        });

        videoDevice = videoOptions[0];
        audioDevice = audioOptions[0];

        getMedia();
    }
});

function getMedia() {
    if (stream) {
        arrayForEach(stream.getTracks(), function(track) {
            track.stop();
        });
    }
    mediaDevices.getMedia({
        video: {
            optional: [{
                sourceId: videoDevice.deviceId
            }]
        },
        audio: {
            optional: [{
                sourceId: audioDevice.deviceId
            }]
        }
    }, function onGetUserMedia(error, localMediaStream) {
        if (error) {
            console.error(error);
        } else {
            stream = localMediaStream;

            if (isUndefined(video.srcObject)) {
                video.src = URL.createObjectURL(stream);
            } else {
                video.srcObject = stream;
            }
        }
    });
}
