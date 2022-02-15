const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  linkGitHub: {
    type: String,
  },

  grade: {
    type: String,
  },
});

module.exports = mongoose.model("Project", projectSchema);
