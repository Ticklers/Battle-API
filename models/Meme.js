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
    type: Schema.Types.ObjectId,
    ref: "users",
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
});

module.exports = Meme = mongoose.model('memes', MemeSchema);
