import getSourceType from "../../../js/utils/getSourceType";

describe("getSourceType", () => {
  it("convert", () => {
    expect(getSourceType("mp4")).to.equal("video/mp4");
    expect(getSourceType("webm")).to.equal("video/webm");
    expect(getSourceType("mov")).to.equal("video/quicktime");
    expect(getSourceType("ogm")).to.equal("video/ogg");
    expect(getSourceType("ogv")).to.equal("video/ogg");
    expect(getSourceType("ogg")).to.equal("video/ogg");
  });
});
