import PlayPause from "./PlayPause.js";
import Stop from "./Stop.js";
import Speaker from "./Speaker.js";
import VolumeSlider from "./VolumeSlider.js";
import VideoProgress from "./VideoProgress.js";
import CurrentTime from "./CurrentTime.js";
import PictureInPicture from "./PictureInPicture.js";
import Fullscreen from "./Fullscreen.js";
/**
 * VideoManager
 * @param {boolean} isControlBar whether to use controls attr
 * @param {object} attributes key (video tag attribute name) : value
 * @param {object} options detail options https://github.com/cocoder16/my-video
 * @param {object} hotkey hotkey for controls
 * @returns {Element} video manager element
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
    stopButtonIcon = "stop",
    volumeOffButtonIcon = "volume_off",
    volumeLowOnButtonIcon = "volume_down",
    volumeHighOnButtonIcon = "volume_up",
    volumeUpIcon = "volume_up",
    volumeDownIcon = "volume_down",
    pictureInPictureButtonIcon = "picture_in_picture",
    fullscreenButtonIcon = "fullscreen",
    defaultVolume = video.muted ? 0 : 1,
    initialCurrentTime = 0,
    highLowBoundaryOfVolume = 0.5,
    useLoadVideoProgress = false,
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
  const playPause = new PlayPause(useMaterialIcon, playButtonIcon, pauseButtonIcon, video.autoplay);
  const stop = new Stop(useMaterialIcon, stopButtonIcon);
  const speaker = new Speaker(
    useMaterialIcon,
    volumeOffButtonIcon,
    volumeLowOnButtonIcon,
    volumeHighOnButtonIcon,
    defaultVolume,
    highLowBoundaryOfVolume
  );
  const volumeSlider = new VolumeSlider(defaultVolume);
  const videoProgress = new VideoProgress(video.duration, initialCurrentTime);
  const currentTime = new CurrentTime(initialCurrentTime);
  const pictureInPicture = new PictureInPicture(useMaterialIcon, pictureInPictureButtonIcon);
  const fullscreen = new Fullscreen(useMaterialIcon, fullscreenButtonIcon);

  controlContainer.className = "controls";
  controlContainer.appendChild(playPause);
  controlContainer.appendChild(stop);
  controlContainer.appendChild(speaker);
  controlContainer.appendChild(volumeSlider);
  controlContainer.appendChild(videoProgress);
  controlContainer.appendChild(currentTime);
  controlContainer.appendChild(pictureInPicture);
  controlContainer.appendChild(fullscreen);
  videoManager.appendChild(controlContainer);

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

  videoManager.stop = function stop() {
    video.pause();
    video.currentTime = 0;
    videoProgress.progress = 0;
  };

  videoManager.toggleMute = function toggleMute() {
    video.muted = !video.muted;
  };

  // event listener
  videoManager.video.addEventListener("click", videoManager.playOrPause);
  playPause.button.addEventListener("click", videoManager.playOrPause);
  stop.button.addEventListener("click", videoManager.stop);
  speaker.button.addEventListener("click", videoManager.toggleMute);

  // hotkey
  videoManager.addEventListener("keydown", function (event) {
    if (event.key === playPauseKey) {
      videoManager.playOrPause();
    }
  });

  videoManager.addEventListener("keydown", function (event) {
    if (event.key === stopKey) {
      videoManager.stop();
    }
  });

  videoManager.addEventListener("keydown", function (event) {
    if (event.key === muteKey) {
      videoManager.toggleMute();
    }
  });

  return videoManager;
}
