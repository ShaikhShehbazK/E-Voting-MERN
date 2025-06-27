const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  party: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  votes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vote",
        require: true,
      },
      votedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  voteCount: {
    type: Number,
    default: 0,
  },
});

candidateSchema.pre("findByIdAndDelete", (req, res, next) => {
  console.log("here");
  console.log(this.image);
});

module.exports = mongoose.model("Candidate", candidateSchema);
