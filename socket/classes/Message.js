class Message {
    constructor(username, message, mediaLink = null, userId, time, messageSenderEnum) {
        this.message = message;
        this.userId = userId;
        this.username = username;
        this.mediaLink = mediaLink;
        this.messageSenderEnum = messageSenderEnum;
        this.time = time;
    }
}

module.exports = Message;