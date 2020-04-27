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
  caption: {
    type: String
  },
  media: {
    type: String
  },
  likes: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      date: {
        type: Date,
      },
    }
  ],
  comments: {
    comment: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    date: {
      type: Date,
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
