const request = require("supertest");
const app = require("../app");
const Character = require("../Models/CharacterSchema");

describe("GET /character/:character", () => {
  beforeEach(async () => {
    await Character.deleteMany({});
  });

  it("should return a character with the specified name", async () => {
    const character = new Character({ character: "Character 1" });
    await character.save();

    const res = await request(app).get("/character/Character 1");

    expect(res.statusCode).toBe(201);
    expect(res.body.character).toBe("Character 1");
  });

  it("should return a 400 status code if the character is not found", async () => {
    const res = await request(app).get("/character/Character 2");

    expect(res.statusCode).toBe(400);
  });
});

describe("GET /characters", () => {
  beforeEach(async () => {
    await Character.deleteMany({});
  });

  it("should return a list of all characters", async () => {
    const character1 = new Character({ character: "Character 1" });
    const character2 = new Character({ character: "Character 2" });
    await character1.save();
    await character2.save();

    const res = await request(app).get("/characters");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].character).toBe("Character 1");
    expect(res.body[1].character).toBe("Character 2");
  });
});

describe("POST /character", () => {
  beforeEach(async () => {
    await Character.deleteMany({});
  });

  it("should create a new character", async () => {
    const res = await request(app)
      .post("/character")
      .send({ character: "Character 1" });

    expect(res.statusCode).toBe(200);
    expect(res.body.character).toBe("Character 1");
  });

  it("should return a 401 status code if there is an error creating the character", async () => {
    const createCharacter = Character.create;
    Character.create = jest.fn().mockImplementationOnce(() => {
      throw new Error("Test Error");
    });

    const res = await request(app)
      .post("/character")
      .send({ character: "Character 1" });

    expect(res.statusCode).toBe(401);
    Character.create = createCharacter;
  });
});



   
