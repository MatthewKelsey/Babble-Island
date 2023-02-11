const request = require("supertest");
const app = require("../index.js");
const Story = require("../Models/storySchema");

describe("GET /stories", () => {
  beforeEach(async () => {
    
  });

  it("should return a list of stories", async () => {
    const story1 = new Story({ title: "Story 1" });
    const story2 = new Story({ title: "Story 2" });
    await story1.save();
    await story2.save();

    const res = await request(app).get("/stories");

    expect(res.statusCode).toBe(201);
    expect(res.body.length).toBe(2);
    expect(res.body[0].title).toBe("Story 1");
    expect(res.body[1].title).toBe("Story 2");
  });

  it("should return a 400 status code if there is an error", async () => {
    const story1 = new Story({ title: "Story 1" });
    await story1.save();

    const deleteStory = Story.deleteMany;
    Story.deleteMany = jest.fn().mockImplementationOnce(() => {
      throw new Error("Test Error");
    });

    const res = await request(app).get("/stories");

    expect(res.statusCode).toBe(400);
    Story.deleteMany = deleteStory;
  });
});
