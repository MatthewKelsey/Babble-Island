
const Story = require("../Models/storySchema");

exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find();

    res.status(201).send(stories);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

