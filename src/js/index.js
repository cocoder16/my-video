import getSourceType from "./utils/getSourceType.js";
import PlayPause from "./controls/PlayPause.js";

/**
 * MyVideo
 * @param {Element} parent video player will be instanced on parent
 * @param {object} configuration sources, attributes, options
 * @param {string[]} configuration.sources soucrce url array
 * @param {object} configuration.attributes key (video tag attribute name) : value
 * @param {object} configuration.options detail options https://github.com/cocoder16/my-video
 */
export default function MyVideo(parent, { sources = [], attributes = {}, options = {} } = {}) {
  const {
    useMaterialIcon = true,
    playButtonIcon = "play_arrow",
    pauseButtonIcon = "Pause",
    stopBtnIcon = "",
    muteBtnIcon = "",
    defaultVolume = 1,
    useLoadProgress = false,
  } = options;

  const supportsVideo = !!document.createElement("video").canPlayType;

  if (!supportsVideo) {
    throw new Error("video is not supported!");
  }

  if (!parent) {
    throw new Error("parent element not found");
  }

  // <figure class="video-container">
  //     <video
  //         controls loop muted autoplay
  //         width=560 height=315
  //         preload="metadata"
  //         poster="https://vjs.zencdn.net/v/oceans.png"
  //     >
  //         <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
  //         <source src="https://vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
  //         <source src="https://vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source>
  //     </video>
  //     <ul id="video-controls" class="controls">
  //         <li><button id="playpause" type="button">Play/Pause</button></li>
  //         <li><button id="stop" type="button">Stop</button></li>
  //         <li class="progress">
  //             <progress id="progress" value="0" min="0">
  //                 <span id="progress-bar"></span>
  //             </progress>
  //         </li>
  //         <li><button id="mute" type="button">Mute/Unmute</button></li>
  //         <li><button id="volinc" type="button">Vol+</button></li>
  //         <li><button id="voldec" type="button">Vol-</button></li>
  //         <li><button id="fs" type="button">Fullscreen</button></li>
  //         </ul>
  // </figure>

  const videoContainer = document.createElement("figure");
  const video = document.createElement("video");

  // DOM 생성
  videoContainer.appendChild(video);

  // source 생성
  if (sources) {
    sources.forEach(src => {
      const source = document.createElement("source");
      const splitSrc = src.split(".");
      const sourceType = getSourceType(splitSrc[splitSrc.length - 1]);
      source.setAttribute("src", src);
      source.setAttribute("type", sourceType);
      video.appendChild(source);
    });
  }

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
  const isControlBar = attributes && attributes.controls;

  if (isControlBar) {
    video.controls = false;

    // material icon cdn import
    const headTag = document.querySelector("head");
    const linkTag = document.createElement("link");
    linkTag.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    linkTag.rel = "stylesheet";
    headTag.appendChild(linkTag);

    // create controlBar
    const controlBar = document.createElement("ul");
    controlBar.className = "controls";

    const playPause = controlBar.appendChild(new PlayPause(useMaterialIcon, playButtonIcon, pauseButtonIcon));

    // TODO: controller는 각각 생성자함수로 파일 분리, options 값에 따라 생성
    // const stopController = document.createElement("li");
    // const muteController = document.createElement("li");
    // const volumnController = document.createElement("li");
    // const progressController = document.createElement("li");
    // const pictureInPictureController = document.createElement("li");
    // const fullscreenController = document.createElement("li");
    videoContainer.appendChild(controlBar);
  }

  // parent에 생성
  parent.appendChild(videoContainer);

  return videoContainer;
}
