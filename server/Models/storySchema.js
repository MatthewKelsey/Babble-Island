const mongoose = require("./database");

const { Schema } = mongoose;

const storySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },

  level:{
    type: Number,
    required: false,
    default: 0
  }

});

const Story = mongoose.model("Stories", storySchema);

module.exports = Story;
