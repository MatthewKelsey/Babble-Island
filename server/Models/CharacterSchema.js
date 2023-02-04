const mongoose = require("./database");

const { Schema } = mongoose;

const characterSchema = new Schema({
  character: {
    type: String,
    required: true,
  },
  initial: {
    type: String,
    required: true,
  },
  good: {
    type: Array,
    required: true,
  },

  bad: {
    type: Array,
    required:true 
  },
  
});

const Character = mongoose.model("Characters", characterSchema);


module.exports = Character;



