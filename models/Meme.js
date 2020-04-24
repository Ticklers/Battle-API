const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
  },
  media: {
    tpe: String,
  },
  upvotes: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    date: {
      type: Date,
    },
  },
  downvotes: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  comments: {
    comment: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  isBattle: {
    type: Boolean,
    default: false,
  },
  isRoast: {
    type: Boolean,
    default: false,
  },
  onProfile: {
    type: Boolean,
    default: true,
  },
});

module.exports = Meme = mongoose.model("memes", MemeSchema);
