import getSourceType from "./utils/getSourceType.js";

/**
 * MyVideo
 * @param {string} parent video player instance will be instanced on parent
 * @param {string[]} sources soucrce url array
 * @param {object} options key (video tag attribute name) : value
 */
export default function MyVideo(parent, sources, options) {
  const supportsVideo = !!document.createElement("video").canPlayType;

  if (!supportsVideo) {
    throw new Error("video is not supported!");
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

  // TODO: controller는 각각 생성자함수로 파일 분리, options 값에 따라 생성
  const videoContainer = document.createElement("figure");
  const video = document.createElement("video");
  const controlBar = document.createElement("ul");
  const playController = document.createElement("li");
  const stopController = document.createElement("li");
  const muteController = document.createElement("li");
  const volumnController = document.createElement("li");
  const progressController = document.createElement("li");
  const pictureInPictureController = document.createElement("li");
  const fullscreenController = document.createElement("li");

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

  // DOM에 기능부여

  // parent에 생성
  parent.appendChild(videoContainer);

  return videoContainer;
}
