var fullScreenController = (function () {
    var isFull = {
        IE: false,
        other: false
    };

    var changeFullscreen = function (videoPlayer) {
        if (browser.name !== "IE") {
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement){
                if (videoPlayer.videoframe.requestFullscreen) {
                    videoPlayer.videoframe.requestFullscreen();
                } else if (videoPlayer.videoframe.mozRequestFullScreen) {
                    videoPlayer.videoframe.mozRequestFullScreen();
                } else if (videoPlayer.videoframe.webkitRequestFullscreen) {
                    videoPlayer.videoframe.webkitRequestFullscreen();
                }
                isFull.other = true;
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
                isFull.other = false;
            }
        } else {
            if (!isFull.IE) {
                videoPlayer.videoframe.msRequestFullscreen();
                isFull.IE = true;
            } else {
                document.msExitFullscreen();
                isFull.IE = false;
            }
        }
        console.log(isFull);
    };
    
    return { 
        isFull: isFull,
        changeFullscreen: changeFullscreen
    }
})();