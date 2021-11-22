import formatTime from "../../../src/js/utils/formatTime";

describe("formatTime", () => {
  it("format", () => {
    expect(formatTime(0)).to.equal("0:00");
    expect(formatTime(1)).to.equal("0:01");
    expect(formatTime(10)).to.equal("0:10");
    expect(formatTime(59)).to.equal("0:59");
    expect(formatTime(60)).to.equal("1:00");
    expect(formatTime(61)).to.equal("1:01");
    expect(formatTime(599)).to.equal("9:59");
    expect(formatTime(600)).to.equal("10:00");
    expect(formatTime(601)).to.equal("10:01");
    expect(formatTime(3599)).to.equal("59:59");
    expect(formatTime(3600)).to.equal("1:00:00");
    expect(formatTime(3601)).to.equal("1:00:01");
    expect(formatTime(35999)).to.equal("9:59:59");
    expect(formatTime(36000)).to.equal("10:00:00");
    expect(formatTime(36001)).to.equal("10:00:01");
    expect(formatTime(48025)).to.equal("13:20:25");
    expect(formatTime(216000)).to.equal("60:00:00");
    expect(formatTime(360000)).to.equal("100:00:00");
  });

  it("handle exception argument", () => {
    expect(formatTime()).to.equal("");
    expect(formatTime(0.1)).to.equal("");
    expect(formatTime(" ")).to.equal("");
    expect(formatTime(":")).to.equal("");
    expect(formatTime("1")).to.equal("");
  });
});
