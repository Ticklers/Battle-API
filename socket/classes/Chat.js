class Chat {
    constructor(online, namespace, roomId) {
        this.online = online;
        this.namespace = namespace;
        this.roomId = roomId;
        this.messages = [];
    }
    addMessage(message) {
        this.messages.push(message);
    }
    clearHistory() {
        this.messages = [];
    }
}

module.exports = Chat;