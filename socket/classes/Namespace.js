class Namespace {
    constructor(id, endpoint) {
        this.id = id;
        this.endpoint = endpoint;
        this.chatRooms = [];
    }

    addRoom(roomObj) {
        this.chatRooms.push(roomObj);
    }

}

module.exports = Namespace;