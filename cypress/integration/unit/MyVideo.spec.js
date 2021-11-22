/// <reference types="Cypress" />

import MyVideo from "../../../src/js/index";

describe("MyVideo unit test", () => {
  const defaultOptions = {
    useMaterialIcon: true,
    playButtonIcon: "play_arrow",
    pauseButtonIcon: "pause",
    stopButtonIcon: "stop",
    volumeOffButtonIcon: "volume_off",
    volumeLowOnButtonIcon: "volume_down",
    volumeHighOnButtonIcon: "volume_up",
    volumeUpIcon: "volume_up",
    volumeDownIcon: "volume_down",
    pictureInPictureButtonIcon: "picture_in_picture",
    fullscreenButtonIcon: "fullscreen",
    // defaultVolume: video.muted ? 0 : 1,
    initialCurrentTime: 0,
    highLowBoundaryOfVolume: 0.5,
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

  it("create control bar with default options", () => {
    const parentElement = document.createElement("div");
    MyVideo(parentElement, {
      attributes: { controls: true },
    });

    const controlBar = parentElement.querySelector("figure ul.controls");
    const volumeSlider = controlBar.querySelector(".volume-slider");
    const videoProgress = controlBar.querySelector(".video-progress");
    const currentTime = controlBar.querySelector(".current-time");
    const playPauseButtonIcon = controlBar.querySelector(".play-pause button span");
    const stopButtonIcon = controlBar.querySelector(".stop button span");
    const speakerButtonIcon = controlBar.querySelector(".speaker button span");
    const pictureInPictureButtonIcon = controlBar.querySelector(".picture-in-picture button span");
    const fullscreenButtonIcon = controlBar.querySelector(".fullscreen button span");

    expect(controlBar).to.not.equal(null);
    expect(volumeSlider).to.not.equal(null);
    expect(videoProgress).to.not.equal(null);
    expect(currentTime).to.not.equal(null);
    expect(playPauseButtonIcon).to.have.class("material-icons");
    expect(playPauseButtonIcon).to.contain(defaultOptions.playButtonIcon);
    expect(stopButtonIcon).to.have.class("material-icons");
    expect(stopButtonIcon).to.contain(defaultOptions.stopButtonIcon);
    expect(speakerButtonIcon).to.have.class("material-icons");
    expect(speakerButtonIcon).to.contain(defaultOptions.volumeHighOnButtonIcon);
    expect(pictureInPictureButtonIcon).to.have.class("material-icons");
    expect(pictureInPictureButtonIcon).to.contain(defaultOptions.pictureInPictureButtonIcon);
    expect(fullscreenButtonIcon).to.have.class("material-icons");
    expect(fullscreenButtonIcon).to.contain(defaultOptions.fullscreenButtonIcon);
  });

  it("play-pause by clicking video when default options", () => {
    const parentElement = document.createElement("div");
    MyVideo(parentElement, {
      attributes: { controls: true },
    });

    const video = parentElement.querySelector("figure.video-manager video");
    const playPauseButtonIcon = parentElement.querySelector("figure.video-manager ul.controls .play-pause button span");

    video.click();

    let isPlaying = !(video.paused || video.ended);
    expect(playPauseButtonIcon).to.contain(defaultOptions.pauseButtonIcon);
    expect(isPlaying).to.be.true;

    video.click();

    isPlaying = !(video.paused || video.ended);
    expect(playPauseButtonIcon).to.contain(defaultOptions.playButtonIcon);
    expect(isPlaying).to.be.false;
  });

  it("play-pause by clicking button when default options", () => {
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

    playPauseButton.click();

    isPlaying = !(video.paused || video.ended);
    expect(playPauseButtonIcon).to.contain(defaultOptions.playButtonIcon);
    expect(isPlaying).to.be.false;
  });

  it("play-pause by hotkey when default options", () => {
    const parentElement = document.createElement("div");
    MyVideo(parentElement, {
      attributes: { controls: true },
    });

    const videoManager = parentElement.querySelector("figure.video-manager");
    const video = videoManager.querySelector("video");
    const playPauseButtonIcon = videoManager.querySelector("ul.controls .play-pause button span");
    const playPauseHotKeyEvent = new KeyboardEvent("keydown", { key: defaultHotKey.playPauseKey });

    videoManager.dispatchEvent(playPauseHotKeyEvent);

    let isPlaying = !(video.paused || video.ended);
    expect(playPauseButtonIcon).to.contain(defaultOptions.pauseButtonIcon);
    expect(isPlaying).to.be.true;

    videoManager.dispatchEvent(playPauseHotKeyEvent);

    isPlaying = !(video.paused || video.ended);
    expect(playPauseButtonIcon).to.contain(defaultOptions.playButtonIcon);
    expect(isPlaying).to.be.false;
  });

  it("stop by clicking button when playing", () => {
    const parentElement = document.createElement("div");
    MyVideo(parentElement, {
      attributes: { controls: true },
    });

    const videoManager = parentElement.querySelector("figure.video-manager");
    const video = videoManager.querySelector("video");
    const stopButton = videoManager.querySelector("ul.controls .stop button");

    video.play();
    stopButton.click();

    let isStopped = video.paused || video.ended;
    expect(isStopped).to.be.true;
  });

  it("stop by hotkey when playing", () => {
    const parentElement = document.createElement("div");
    MyVideo(parentElement, {
      attributes: { controls: true },
    });

    const videoManager = parentElement.querySelector("figure.video-manager");
    const video = videoManager.querySelector("video");
    const stopHotKeyEvent = new KeyboardEvent("keydown", { key: defaultHotKey.stopKey });

    video.play();
    videoManager.dispatchEvent(stopHotKeyEvent);

    let isStopped = video.paused || video.ended;
    expect(isStopped).to.be.true;
  });

  it("mute-unmute by clicking button when default options", () => {
    const parentElement = document.createElement("div");
    MyVideo(parentElement, {
      attributes: { controls: true },
    });

    const videoManager = parentElement.querySelector("figure.video-manager");
    const video = videoManager.querySelector("video");
    const speakerButton = videoManager.querySelector("ul.controls .speaker button");

    speakerButton.click();

    let isMuted = video.muted;
    expect(isMuted).to.be.true;

    speakerButton.click();

    isMuted = video.muted;
    expect(isMuted).to.be.false;
  });

  it("mute-unmute by hotkey when default options", () => {
    const parentElement = document.createElement("div");
    MyVideo(parentElement, {
      attributes: { controls: true },
    });

    const videoManager = parentElement.querySelector("figure.video-manager");
    const video = videoManager.querySelector("video");
    const muteKeyEvent = new KeyboardEvent("keydown", { key: defaultHotKey.muteKey });

    videoManager.dispatchEvent(muteKeyEvent);

    let isMuted = video.muted;
    expect(isMuted).to.be.true;

    videoManager.dispatchEvent(muteKeyEvent);

    isMuted = video.muted;
    expect(isMuted).to.be.false;
  });
});
