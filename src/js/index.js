import VideoManager from "./elements/VideoManager.js";

import getSourceType from "./utils/getSourceType.js";

/**
 * MyVideo
 * @param {Element} parent video player will be instanced on parent
 * @param {object} configuration sources, attributes, options, hotkey
 * @param {string[]} configuration.sources soucrce url array
 * @param {object} configuration.attributes key (video tag attribute name) : value
 * @param {object} configuration.options detail options https://github.com/cocoder16/my-video
 * @param {object} configuration.hotkey hotkey for controls
 */
export default function MyVideo(parent, { sources = [], attributes = {}, options = {}, hotkey = {} } = {}) {
  const supportsVideo = !!document.createElement("video").canPlayType;
  const isControlBar = attributes && attributes.controls;

  if (!supportsVideo) {
    throw new Error("video is not supported!");
  }

  if (!parent) {
    throw new Error("parent element not found");
  }

  // DOM 생성
  const videoManager = new VideoManager(isControlBar, attributes, options, hotkey);

  // source 생성
  if (sources) {
    sources.forEach(src => {
      const source = document.createElement("source");
      const splitSrc = src.split(".");
      const sourceType = getSourceType(splitSrc[splitSrc.length - 1]);
      source.setAttribute("src", src);
      source.setAttribute("type", sourceType);
      videoManager.video.appendChild(source);
    });
  }

  // parent에 생성
  parent.appendChild(videoManager);

  return videoManager;
}
