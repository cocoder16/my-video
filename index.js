import MyVideo from "./src/js/index.js";

const videoSample = document.querySelector(".video-sample-0");

MyVideo({
  parent: videoSample,
  sources: [
    "https://vjs.zencdn.net/v/oceans.mp4",
    "https://vjs.zencdn.net/v/oceans.webm",
    "https://vjs.zencdn.net/v/oceans.ogv",
  ],
  options: {
    // video tag attr
  },
});
