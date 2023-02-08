const request = require("supertest");
const Character = require("../Models/CharacterSchema");
const app = require("../app");

describe("Get Character", () => {
  test("Should return character", async () => {
    const character = { character: "John Doe" };
    await Character.create(character);

    const res = await request(app)
      .post("/getCharacter")
      .send({ character: "John Doe" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("character", character.character);
  });

  test("Should return error", async () => {
    const res = await request(app)
      .post("/getCharacter")
      .send({ character: "Jane Doe" });

    expect(res.statusCode).toBe(400);
  });
});

describe("Get All Characters", () => {
  test("Should return all characters", async () => {
    const characters = [      { character: "John Doe" },      { character: "Jane Doe" },    ];

    await Character.create(characters);

    const res = await request(app).get("/getAllCharacters");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty("character", characters[0].character);
    expect(res.body[1]).toHaveProperty("character", characters[1].character);
  });
});

describe("Create Character", () => {
  test("Should create character", async () => {
    const character = { character: "John Doe" };

    const res = await request(app)
      .post("/createCharacter")
      .send(character);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("character", character.character);
  });

  test("Should return error", async () => {
    const character = {};

    const res = await request(app)
      .post("/createCharacter")
      .send(character);

    expect(res.statusCode).toBe(401);
  });
});

describe("Update Character", () => {
  test("Should update character", async () => {
    const character = { character: "John Doe" };
    const newCharacter = await Character.create(character);

    const updates = { character: "Jane Doe" };

    const res = await request(app)
      .put("/updateCharacter")
      .send({ id: newCharacter._id, updates });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("character", updates.character);
  });

  test("Should return error", async () => {
    const updates = { character: "Jane Doe" };

    const res = await request(app)
      .put("/updateCharacter")
      .send({ id: "invalidId", updates });

    expect(res.statusCode).toBe(401);
  });
});
