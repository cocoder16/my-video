var fullScreenController = (function () {

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
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        } else {
            if (!videoPlayer.state.isFull) {
                videoPlayer.videoframe.msRequestFullscreen();
            } else {
                document.msExitFullscreen();
            }
        }
    };
    
    return { 
        changeFullscreen: changeFullscreen
    }
})();