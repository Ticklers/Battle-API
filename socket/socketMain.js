// const Meme = require('../models/Meme');
// const chat = require('./chat');
const { feed, newFeed } = require('./feeds');
const Message = require('./classes/Message');
// let { namespaces, chatsData } = require('./data/namespaces');

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
    // namespaces.forEach((namespace) => {
    //     //server listening on specified endpoint for event = connection
    //     // console.log(namespace);
    //     // console.log('!!!!!!!!!');
    //     io.of(namespace.endpoint).on('connection', (nsSocket) => {
    //         console.log(Object.keys(nsSocket.rooms));
    //         io.of(namespace.endpoint).clients((error, clients) => {
    //             console.log(`There are ${clients.length} in this ns`);
    //         });
    //         nsSocket.on('disconnect', () => {
    //             console.log(`${nsSocket.id}  get disconnected`);
    //         })
    //         // console.log(namespace.endpoint);
    //         console.log(`${nsSocket.id} has join ${namespace.endpoint}`);
    //         // Send back all chats list to the client
    //         nsSocket.emit('chatRoomsList', namespace.chatRooms);
    //         nsSocket.on('joinRoom', (JoinroomId) => {
    //             io.of(namespace.endpoint).to(JoinroomId).clients((error, clients) => {
    //                 console.log(`There are ${clients.length} in this room`);
    //             });

    //             console.log(JoinroomId);
    //             if (Object.keys(nsSocket.rooms)[1]) {
    //                 // console.log(nsSocket.rooms);
    //                 const roomToLeave = Object.keys(nsSocket.rooms)[1];
    //                 // console.log(roomToLeave);
    //                 nsSocket.leave(roomToLeave);
    //             }
    //             nsSocket.join(JoinroomId);
    //             const nsChatRoom = namespace.chatRooms.find((room) => {
    //                 return room.roomId === JoinroomId;
    //             });
    //             // console.log(nsChatRoom);
    //             const requiredchat = chatsData.find((chat) => {
    //                 return chat.roomId === nsChatRoom.roomId;
    //             })
    //             // const chatToSend = chatsData[nsChatRoom.roomId];

    //             nsSocket.emit('chatData', requiredchat);
    //             // let newmessageToServer;
    //             nsSocket.on('messageToServer', (messageToServer) => {
    //                 newMessage = new Message(
    //                     messageToServer.username,
    //                     messageToServer.message,
    //                     messageToServer.mediaLink,
    //                     messageToServer.userId,
    //                     messageToServer.time
    //                 );
    //                 // console.log(`message to server : ${messageToServer}`);
    //                 // console.log(`message customized : ${newMessage}`);
    //                 io.of(namespace.endpoint).to(JoinroomId).emit('messageToClient', messageToServer);
    //             })
    //         });
    //     })
    // })


}



module.exports = socketMain;