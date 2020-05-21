class ChatRoom {
    constructor(roomId, username, namespace, avatar, lastMessage, time, unseenMessages, unseenMessagesCount, messageSeenEnum) {
        this.roomId = roomId;
        this.username = username;
        this.namespace = namespace;
        this.avatar = avatar;
        this.lastMessage = lastMessage;
        this.time = time;
        this.unseenMessages = unseenMessages;
        this.unseenMessagesCount = unseenMessagesCount;
        this.messageSeenEnum = messageSeenEnum;
        // this.messages = [];
    }
    // addMessage(message) {
    //     this.messages.push(message);
    // }
    // clearHistory() {
    //     this.messages = [];
    // }
}

module.exports = ChatRoom;