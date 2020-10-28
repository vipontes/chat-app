let expect = require("expect");

var { generateMessage, generateLocationMessage } = require("./message");

describe("Generate Message", () => {
  it("should generate correct message object", () => {
    let from = "VFP",
      text = "Some randon text",
      message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});

describe("Generate Location Message", () => {
  it("should generate correct location message object", () => {
    let from = "VFP",
      lat = 25,
      lng = 39,
      url = `https://www.google.com/maps?q=${lat},${lng}`,
      message = generateLocationMessage(from, 25, 39);
    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, url });
  });
});
