import MyVideo from "./src/js/index.js";

const videoSample = document.querySelector(".video-sample-0");

MyVideo(videoSample, {
  sources: [
    "https://vjs.zencdn.net/v/oceans.mp4",
    "https://vjs.zencdn.net/v/oceans.webm",
    "https://vjs.zencdn.net/v/oceans.ogv",
  ],
  attributes: {
    controls: true,
    loop: false,
    muted: true,
    autoplay: true,
    width: 560,
    height: 315,
    poster: "https://vjs.zencdn.net/v/oceans.png",
  },
  // options: {
  //   useMaterialIcon: false, // default true
  //   playButtonIcon: "", // icon 부류 default는 Material icon, 1) material font 값이나, 2) 리소스 경로값
  //   PauseBtnIcon: "",
  //   stopBtnIcon: "",
  //   muteBtnIcon: "",
  //   defaultVolume: 0.5, // default 1
  //   useLoadProgress: true, // default false
  // },
});
