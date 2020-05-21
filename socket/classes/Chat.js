class Chat {
    constructor(roomTitle, namespace) {
        this.roomTitle = roomTitle;
        this.namespace = namespace;
        this.chatHistory = [];
    }
    addMessage(message) {
        this.chatHistory.push(message);
    }
    clearHistory() {
        this.chatHistory = [];
    }
}

module.exports = Chat;