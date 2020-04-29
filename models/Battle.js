const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BattleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    random: {
        type: Boolean,
        default: true
    },
    invitationLink: {
        type: String
    },
    startDate: {
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: Date,
        default: Date.now()
    },
    teamOne: [
        {
            user: {
                userId : {
                    type: Schema.Types.ObjectId,
                    ref: 'users'
                },
                memes: [
                    {
                        meme: {
                        type: Schema.Types.ObjectId,
                        ref: 'memes'
                        }
                    }
                ]
            }
        }
    ],
    teamTwo: [
        {
            user: {
                userId : {
                    type: Schema.Types.ObjectId,
                    ref: 'users'
                },
                memes: [
                    {
                        meme: {
                        type: Schema.Types.ObjectId,
                        ref: 'memes'
                        }
                    }
                ]
            }
        }
    ],
    teamOneWins: {
        type: Boolean,
        default: true
    },
});

module.exports = Meme = mongoose.model("battles", BattleSchema);