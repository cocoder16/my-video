/// <reference types="Cypress" />

import MyVideo from "../../../src/js/index";

describe("MyVideo unit test", () => {
  it("create empty source video", () => {
    const parentElement = document.createElement("div");
    const myVideo = MyVideo(parentElement);

    expect(parentElement).to.html("<figure><video></video></figure>");
    expect(myVideo).to.html("<video></video>");
  });

  it("create video with sources", () => {
    cy.fixture("sources").then(({ sources }) => {
      const parentElement = document.createElement("div");
      const myVideo = MyVideo(parentElement, { sources });

      expect(myVideo).to.html(
        `<video><source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4"><source src="https://vjs.zencdn.net/v/oceans.webm" type="video/webm"><source src="https://vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></video>`
      );
    });
  });

  it("create video with attributes", () => {
    cy.fixture("poster").then(({ poster }) => {
      const parentElement = document.createElement("div");
      const myVideo = MyVideo(parentElement, {
        attributes: { loop: false, autoplay: true, poster },
      });

      expect(myVideo).to.html(`<video autoplay="" poster="https://vjs.zencdn.net/v/oceans.png"></video>`);
    });
  });
  // options: {
  //   playBtnIconSrc: "", // icon 부류 default는 Material icon
  //   PauseBtnIconSrc: "",
  //   stopBtnIconSrc: "",
  //   muteBtnIconSrc: "",
  //   defaultVolume: 0.5, // default 1
  //   useLoadProgress: true, // default false
  // },

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
  it("default options with control bar", () => {
    const parentElement = document.createElement("div");
    MyVideo(parentElement, {
      attributes: { controls: true },
    });

    const controlBar = parentElement.querySelector("figure ul.controls");
    const playPause = controlBar.querySelector(".play-pause");
    const playPauseButtonIcon = playPause.querySelector("button span");

    expect(controlBar).to.not.equal(null);
    expect(playPauseButtonIcon).to.have.class("material-icons");
    expect(playPauseButtonIcon).to.contain("play_arrow");
  });

  it("play-pause button click", () => {
    const parentElement = document.createElement("div");
    MyVideo(parentElement, {
      attributes: { controls: true },
    });

    const playPauseButtonIcon = document.querySelector("figure .play-pause button");
  });
});
