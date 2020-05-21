const Meme = require('../models/Meme');
const chat = require('./chat');
const { feed, newFeed } = require('./feeds');
let { namespaces, chatsData } = require('./data/namespaces');

async function socketMain(io, socket) {
    socket.on('getFeed', () => {
        feed(io, socket);
        // console.log('get feed triggered');
    });
    socket.on('newFeed', (post) => {
        newFeed(io, socket, post);
        // console.log('new feed triggered!!!!!!!!!!!!!');
    });

    // loop through each namespace and listen for a connection
    namespaces.forEach((namespace) => {
        //server listening on specified endpoint for event = connection
        io.of(namespace.endpoint).on('connection', (nsSocket) => {
            // console.log(namespace.endpoint);
            console.log(`${nsSocket.id} has join ${namespace.endpoint}`);
            // Send back all chats list to the client
            nsSocket.emit('chatRoomsList', namespace.chatRooms);
            nsSocket.on('joinRoom', (roomToJoin) => {
                console.log(roomToJoin);
                if (Object.keys(nsSocket.rooms)[1]) {
                    console.log(nsSocket.rooms);
                    const roomToLeave = Object.keys(nsSocket.rooms)[1];
                    console.log(roomToLeave);
                    nsSocket.leave(roomToLeave);
                }
                nsSocket.join(roomToJoin);
                const nsChatRoom = namespace.chatRooms.find((room) => {
                    return room.roomTitle === roomToJoin;
                });
                // console.log(nsChatRoom);
                const chatToSend = chatsData[nsChatRoom.roomId];

                nsSocket.emit('chatData', chatToSend);
            });
        })
    })


}



module.exports = socketMain;