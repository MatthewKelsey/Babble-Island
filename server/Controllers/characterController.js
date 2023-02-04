const Character = require("../Models/CharacterSchema");

exports.getCharacter = async (req, res) => {
  try {
    const character = await Character.findOne({
      character: req.body.character,
    });

    res.status(201).send(character);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

exports.createCharacter = async (req, res) => {
  try {
    const newCharacter = await Character.create(req.body);

    res.status(200).send(newCharacter);
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};