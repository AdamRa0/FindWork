const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "A job needs a description"],
  },
  preferences: {
    availability: {
      type: String,
      required: [
        true,
        "A potential bidder needs to know how available they should be.",
      ],
    },
    experience: {
      type: String,
      enum: ["Beginner", "Intermediate", "Expert"],
      required: [true, "A job preference needs an experience level"],
    },
    languages: {
      type: [String],
      required: [
        true,
        "A potential bidder needs to know the language requirements.",
      ],
    },
  },
  jobPoster: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const jobModel = mongoose.model("Job", jobSchema);

module.exports = jobModel;
