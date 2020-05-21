// Bring in the room class
const Namespace = require('../classes/Namespace');
const ChatRoom = require('../classes/ChatRoom');
const Chat = require('../classes/Chat');

// Set up the namespaces
let namespaces = [];
let chatsData = [];
let chatNs = new Namespace(0, '/chat');
let battleNs = new Namespace(0, '/battle');


// Make the main room and add it to rooms. it will ALWAYS be 0
chatNs.addRoom(new ChatRoom(0, 'Ishan', 'chat'));
chatNs.addRoom(new ChatRoom(1, 'Rachit', 'chat'));
chatNs.addRoom(new ChatRoom(2, 'Naveen', 'chat'));
chatNs.addRoom(new ChatRoom(3, 'Anoop', 'chat'));
battleNs.addRoom(new ChatRoom(0, 'Manas', 'battle'));

namespaces.push(chatNs, battleNs);

let ishanChat = new Chat('Ishan', 'chat');
let rachitChat = new Chat('Rachit', 'chat');
let naveenChat = new Chat('Ishan', 'chat');
let anoopChat = new Chat('Anoop', 'chat');

ishanChat.addMessage(
    { text: "Hello ishan room its me rishabh" }
);
ishanChat.addMessage(
    { text: "second message by rishabh" }
);
rachitChat.addMessage(
    { text: "Hello rachit room its me rishabh" }
);
chatsData.push(ishanChat, rachitChat, naveenChat, anoopChat);

module.exports = { namespaces, chatsData };