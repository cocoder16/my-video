/// <reference types="Cypress" />

import MyVideo from "../../../js/index";

describe("MyVideo unit test", () => {
  it("create empty source videoContainer", () => {
    const parentNode = document.createElement("div");
    const myVideo = MyVideo(parentNode);

    console.log(myVideo);
    expect(parentNode).to.html("<figure><video></video></figure>");
    expect(myVideo).to.html("<video></video>");
  });
});
