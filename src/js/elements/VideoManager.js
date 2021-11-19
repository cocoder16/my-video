import PlayPause from "./PlayPause.js";

/**
 * VideoManager
 * @param {boolean} isControlBar whether to use controls attr
 * @param {object} attributes key (video tag attribute name) : value
 * @param {object} options detail options https://github.com/cocoder16/my-video
 * @param {object} hotkey hotkey for controls
 */
export default function VideoManager(isControlBar, attributes, options, hotkey) {
  const videoManager = document.createElement("figure");
  const video = document.createElement("video");
  videoManager.className = "video-manager";
  videoManager.video = video;
  videoManager.setAttribute("tabindex", 0);
  videoManager.appendChild(video);

  // attr 부여
  if (attributes) {
    Object.keys(attributes).forEach(attr => {
      const attributeValue = attributes[attr];
      const isBoolean = typeof attributeValue === "boolean";

      if (isBoolean) {
        video[attr] = attributeValue;
      } else {
        video.setAttribute(attr, attributeValue);
      }
    });
  }

  // control bar
  if (!isControlBar) {
    return videoManager;
  }

  const {
    useMaterialIcon = true,
    playButtonIcon = "play_arrow",
    pauseButtonIcon = "pause",
    stopButtonIcon = "",
    muteButtonIcon = "",
    pictureInPictureButtonIcon = "",
    fullscreenButtonIcon = "",
    defaultVolume = 1,
    useLoadProgress = false,
    skipStep = 10,
  } = options;

  const {
    playPauseKey = " ",
    stopKey = "s",
    muteKey = "m",
    volumeUpKey = "ArrowUp",
    volumeDownKey = "ArrowDown",
    toPrevStepKey = "ArrowLeft",
    toNextStepKey = "ArrowRight",
    pictureInPictureKey = "p",
    fullscreenKey = "f",
  } = hotkey;

  video.controls = false;

  // material icon cdn import
  if (useMaterialIcon) {
    const headTag = document.querySelector("head");
    const linkTag = document.createElement("link");
    linkTag.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    linkTag.rel = "stylesheet";
    headTag.appendChild(linkTag);
  }

  // create DOM
  const controlContainer = document.createElement("ul");
  const playPause = new PlayPause(video, useMaterialIcon, playButtonIcon, pauseButtonIcon);

  controlContainer.className = "controls";
  controlContainer.appendChild(playPause);
  videoManager.appendChild(controlContainer);

  // // TODO: controller는 각각 생성자함수로 파일 분리, options 값에 따라 생성
  // // const stopController = document.createElement("li");
  // // const muteController = document.createElement("li");
  // // const volumnController = document.createElement("li");
  // // const progressController = document.createElement("li");
  // // const pictureInPictureController = document.createElement("li");
  // // const fullscreenController = document.createElement("li");
  // videoContainer.appendChild(controlBar);

  // event handler method
  videoManager.playOrPause = function playOrPause() {
    if (video.paused || video.ended) {
      video.play();
      playPause.icon.textContent = pauseButtonIcon;
    } else {
      video.pause();
      playPause.icon.textContent = playButtonIcon;
    }
  };

  // event listener
  playPause.button.addEventListener("click", videoManager.playOrPause);

  // hotkey
  videoManager.addEventListener("keydown", function (event) {
    if (event.key === playPauseKey) {
      videoManager.playOrPause();
    }
  });

  return videoManager;
}
