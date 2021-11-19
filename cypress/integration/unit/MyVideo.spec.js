/// <reference types="Cypress" />

import MyVideo from "../../../src/js/index";

describe("MyVideo unit test", () => {
  const defaultOptions = {
    useMaterialIcon: true,
    playButtonIcon: "play_arrow",
    pauseButtonIcon: "pause",
    stopButtonIcon: "",
    muteButtonIcon: "",
    defaultVolume: 1,
    useLoadProgress: false,
    skipStep: 10,
  };
  const defaultHotKey = {
    playPauseKey: " ",
    stopKey: "s",
    muteKey: "m",
    volumeUpKey: "ArrowUp",
    volumeDownKey: "ArrowDown",
    toPrevStepKey: "ArrowLeft",
    toNextStepKey: "ArrowRight",
    pictureInPictureKey: "p",
    fullscreenKey: "f",
  };

  it("create empty source video", () => {
    const parentElement = document.createElement("div");
    const myVideo = MyVideo(parentElement);

    expect(parentElement).to.html(`<figure class="video-manager" tabindex="0"><video></video></figure>`);
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
    expect(playPauseButtonIcon).to.contain(defaultOptions.playButtonIcon);
  });

  it("play-pause button click", () => {
    const parentElement = document.createElement("div");
    MyVideo(parentElement, {
      attributes: { controls: true },
    });

    const video = parentElement.querySelector("figure.video-manager video");
    const playPauseButton = parentElement.querySelector("figure ul.controls .play-pause button");
    const playPauseButtonIcon = playPauseButton.querySelector("span");

    playPauseButton.click();
    let isPlaying = !(video.paused || video.ended);

    expect(playPauseButtonIcon).to.contain(defaultOptions.pauseButtonIcon);
    expect(isPlaying).to.be.true;

    cy.wait(10).then(() => {
      playPauseButton.click();
      isPlaying = !(video.paused || video.ended);

      expect(playPauseButtonIcon).to.contain(defaultOptions.playButtonIcon);
      expect(isPlaying).to.be.false;
    });
  });

  it("play-pause hotkey", () => {
    const parentElement = document.createElement("div");
    MyVideo(parentElement, {
      attributes: { controls: true },
    });

    const videoManager = parentElement.querySelector("figure.video-manager");
    const video = videoManager.querySelector("video");
    const playPauseButton = videoManager.querySelector("ul.controls .play-pause button");
    const playPauseButtonIcon = playPauseButton.querySelector("span");
    const playPauseHotKeyEvent = new KeyboardEvent("keydown", { key: defaultHotKey.playPauseKey });

    videoManager.dispatchEvent(playPauseHotKeyEvent);
    let isPlaying = !(video.paused || video.ended);

    expect(playPauseButtonIcon).to.contain(defaultOptions.pauseButtonIcon);
    expect(isPlaying).to.be.true;

    cy.wait(10).then(() => {
      videoManager.dispatchEvent(playPauseHotKeyEvent);
      isPlaying = !(video.paused || video.ended);

      expect(playPauseButtonIcon).to.contain(defaultOptions.playButtonIcon);
      expect(isPlaying).to.be.false;
    });
  });

  // TODO: 다른 키들도 디폴트 옵션 테스트
  // TODO: 커스텀 옵션, 핫키 테스트
});
