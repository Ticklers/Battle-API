const Meme = require('../models/Meme');
// const chat = require('./chat');

async function feed(io, socket) {

    console.log('Inside feed!!!!');
    var allMemes = await getAllMemes();
    io.emit('memes', { data: allMemes });
}
async function newFeed(io, socket, post) {
    console.log(post);
    console.log('Inside new feed emit');
    socket.broadcast.emit('newFeed', post);
}

function getAllMemes() {
    return new Promise((resolve, reject) => {
        Meme.find().sort({ date: -1 })
            .then(memes => {
                const response = {
                    count: memes.length,
                    memes
                };
                resolve(response);
            });
    });
}
module.exports = { feed, newFeed };