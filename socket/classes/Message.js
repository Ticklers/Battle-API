class Message {
    constructor(userName, avatar, text, mediaLink = null, userId, time) {
        this.userName = userName;
        this.avatar = avatar;
        this.text = text;
        this.mediaLink = mediaLink;
        this.userId = userId;
        this.time = time;
    }
}

module.exports = Message;