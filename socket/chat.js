// const Meme = require('../models/Meme');
// const chat = require('./chat');

async function chat(io, socket) {

    console.log('Inside chat!!!!');
    io.emit('memes', { data: "allMemes" });
}


module.exports = chat;