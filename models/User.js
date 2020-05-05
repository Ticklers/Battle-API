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
    default: "https://i.pinimg.com/236x/a4/af/12/a4af1288eab8714320fa8453f72d79fd--yahoo-image-search.jpg",
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
  ],
  followers: [
    {
      follower: {
        type: String,
        ref: 'users'
      }
    }
  ],
  followings: [
    {
      following: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  feed: [
    {
      meme: {
        type: Schema.Types.ObjectId,
        ref: 'memes'
      }
    }
  ]
});

module.exports = User = mongoose.model("users", UserSchema);
