/// <reference types="Cypress" />

import MyVideo from "../../../src/js/index";

describe("MyVideo unit test", () => {
  it("create empty source video", () => {
    const parentNode = document.createElement("div");
    const myVideo = MyVideo({ parent: parentNode });

    expect(parentNode).to.html("<figure><video></video></figure>");
    expect(myVideo).to.html("<video></video>");
  });

  it("create video with sources", () => {
    cy.fixture("sources").then(({ sources }) => {
      const parentNode = document.createElement("div");
      const myVideo = MyVideo({ parent: parentNode, sources });

      expect(myVideo).to.html(
        `<video><source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4"><source src="https://vjs.zencdn.net/v/oceans.webm" type="video/webm"><source src="https://vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></video>`
      );
    });
  });
});
