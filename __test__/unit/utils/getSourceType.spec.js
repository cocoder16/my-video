import getSourceType from "../../../js/utils/getSourceType";

describe("getSourceType", () => {
    test("convert", () => {
        expect(getSourceType("mp4")).toBe("video/mp4");
        expect(getSourceType("webm")).toBe("video/webm");
        expect(getSourceType("mov")).toBe("video/quicktime");
        expect(getSourceType("ogm")).toBe("video/ogg");
        expect(getSourceType("ogv")).toBe("video/ogg");
        expect(getSourceType("ogg")).toBe("video/ogg");
    });
});