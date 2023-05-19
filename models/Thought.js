const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const comment = new Schema(
  {
    commentText: {
      type: String,
      required: true,
    },
    commentCreatedBy: {
      type: String,
      required: true,
    },
    commentLikes: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
    },
    thoughtCreatedBy: {
      type: String,
      required: true,
    },
    thoughtComments: [comment],
  },
  { timestamps: true }
);

exports.Thought = mongoose.model("thought", thoughtSchema);
