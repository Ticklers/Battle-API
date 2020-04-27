const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "default avatar path here",
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  dateOfJoining: {
    type: Date,
    default: Date.now,
  },
  memes: [
    {
      meme: {
        type: Schema.Types.ObjectId,
        ref: 'memes'
      }
    }
  ],
  likes: [
    {
      meme: {
        type: String,
        ref: 'memes'
      }
    }
  ]
});

module.exports = User = mongoose.model("users", UserSchema);
