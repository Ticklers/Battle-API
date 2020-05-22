// const Meme = require('../models/Meme');
const chat = require('./chat');
// const { feed, newFeed } = require('./feeds');
const Message = require('./classes/Message');
let { namespaces, chatsData } = require('./data/namespaces');

async function nsSocketMain(io, nsSocket, namespace) {
    console.log(Object.keys(nsSocket.rooms));
    console.log(namespace);
    io.of(namespace.endpoint).clients((error, clients) => {
        console.log(`There are ${clients.length} in this ns`);
    });
    nsSocket.on('disconnect', () => {
        console.log(`${nsSocket.id}  get disconnected`);
    })
    // console.log(namespace.endpoint);
    console.log(`${nsSocket.id} has join ${namespace.endpoint}`);
    // Send back all chats list to the client
    nsSocket.emit('chatRoomsList', namespace.chatRooms);
    nsSocket.on('joinRoom', (JoinroomId) => {
        io.of(namespace.endpoint).to(JoinroomId).clients((error, clients) => {
            console.log(`There are ${clients.length} in this room without u`);
        });

        console.log(JoinroomId);
        if (Object.keys(nsSocket.rooms)[1]) {
            // console.log(nsSocket.rooms);
            const roomToLeave = Object.keys(nsSocket.rooms)[1];
            // console.log(roomToLeave);
            nsSocket.leave(roomToLeave);
        }
        console.log('Time interval given to leave and then join');
        nsSocket.join(JoinroomId);
        const nsChatRoom = namespace.chatRooms.find((room) => {
            return room.roomId === JoinroomId;
        });
        // console.log(nsChatRoom);
        const requiredchat = chatsData.find((chat) => {
            return chat.roomId === nsChatRoom.roomId;
        })
        // const chatToSend = chatsData[nsChatRoom.roomId];

        nsSocket.emit('chatData', requiredchat);
        // let newmessageToServer;
    });
    nsSocket.on('messageToServer', (messageToServer) => {
        newMessage = new Message(
            messageToServer.username,
            messageToServer.message,
            messageToServer.mediaLink,
            messageToServer.userId,
            messageToServer.time
        );
        const JoinroomId = Object.keys(nsSocket.rooms)[1];
        const requiredchat = chatsData.find((chat) => {
            return chat.roomId === JoinroomId;
        });
        requiredchat.addMessage(newMessage);
        // console.log(`message to server : ${messageToServer}`);
        // console.log(`message customized : ${newMessage}`);
        console.log(`MEssage vaala join room id ${JoinroomId}`);
        // we need to find the Room object for this room
        // const nsRoom = namespace.rooms.find((room) => {
        //     return room.roomId === JoinroomId;
        // });
        io.of(namespace.endpoint).clients((error, clients) => {
            console.log(`There are ${clients.length} in this ns`);
        });
        io.of(namespace.endpoint).to(JoinroomId).clients((error, clients) => {
            console.log(`There are ${clients.length} in this ${namespace.endpoint} room : ${JoinroomId}`);
        });
        io.of(namespace.endpoint).to(JoinroomId).emit('messageToClient', messageToServer);
    });

}



module.exports = nsSocketMain;