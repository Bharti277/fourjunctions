const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  yearOfRelease: {
    type: Number,
    required: true,
  },
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producer",
    required: "false",
  },
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor",
      required: false,
    },
  ],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
