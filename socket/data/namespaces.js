// Bring in the room class
const Namespace = require('../classes/Namespace');
const ChatRoom = require('../classes/ChatRoom');
const Chat = require('../classes/Chat');
const Message = require('../classes/Message');

// Set up the namespaces
let namespaces = [];
let chatsData = [];
let chatNs = new Namespace(0, '/chat');
let battleNs = new Namespace(1, '/battle');


// Make the main room and add it to rooms. it will ALWAYS be 0
chatNs.addRoom(new ChatRoom('wiehdsjue', 'Ishan', 'chat', 'https://firebasestorage.googleapis.com/v0/b/cracknet-app.appspot.com/o/images%2Fprofile_pic.jpg?alt=media&token=c03d6b53-9286-4958-9e42-3262d6ad45c3', 'Hey there this is last message', '11:00', false, 12, 'seen'));
chatNs.addRoom(new ChatRoom('wiehdheue', 'Rachit', 'chat', 'https://firebasestorage.googleapis.com/v0/b/cracknet-app.appspot.com/o/images%2Fprofile_pic.jpg?alt=media&token=c03d6b53-9286-4958-9e42-3262d6ad45c3', 'Hey there this is last message', '10:00', false, 11, 'unseen'));
chatNs.addRoom(new ChatRoom('wlwhdsjue', 'Naveen', 'chat', 'https://firebasestorage.googleapis.com/v0/b/cracknet-app.appspot.com/o/images%2Fprofile_pic.jpg?alt=media&token=c03d6b53-9286-4958-9e42-3262d6ad45c3', 'Hey there this is last message', '9:00', true, 10, 'none'));
chatNs.addRoom(new ChatRoom('wieyzjjue', 'Anoop', 'chat', 'https://firebasestorage.googleapis.com/v0/b/cracknet-app.appspot.com/o/images%2Fprofile_pic.jpg?alt=media&token=c03d6b53-9286-4958-9e42-3262d6ad45c3', 'Hey there this is last message', '8:00', true, 9, 'received'));
battleNs.addRoom(new ChatRoom('wiehdsjiz', 'Manas', 'battle', 'https://firebasestorage.googleapis.com/v0/b/cracknet-app.appspot.com/o/images%2Fprofile_pic.jpg?alt=media&token=c03d6b53-9286-4958-9e42-3262d6ad45c3', 'Hey there this is last message', '7:00', false, 7, 'seen'));

namespaces.push(chatNs, battleNs);

let ishanChat = new Chat(true, 'chat', 'wiehdsjue');
let rachitChat = new Chat(true, 'chat', 'wiehdheue');
let naveenChat = new Chat(true, 'chat', 'wlwhdsjue');
let anoopChat = new Chat(true, 'chat', 'wieyzjjue');

ishanChat.addMessage(
    new Message('Hi Rishabh ! Ishan here.',
        'friend', 'Ishan', null, 'friend', '13:12'
    )
);
ishanChat.addMessage(
    new Message('Yes! I am fine',
        'user', 'Ishan', null, 'user', '13:15'
    )
);
rachitChat.addMessage(
    new Message('Hi Rishabh ! Rachit here.',
        'friend', 'Rachit', null, 'friend', '12:12'
    )
);
chatsData.push(ishanChat, rachitChat, naveenChat, anoopChat);

module.exports = { namespaces, chatsData };