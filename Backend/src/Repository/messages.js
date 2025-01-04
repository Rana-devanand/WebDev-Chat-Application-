const message = require("../models/messages");

class Messages_Repository {
    async createMessage(data){
        try {
            const response = await message.create(data);
            return response;
        } catch (error) {
            console.error(error);
            throw { error };
        }
    }

    async getMessagesByConnectionId(roomId){
        try {
            const response = await message.find({ roomId: roomId });
            return response;
        } catch (error) {
            console.error(error);
            throw { error };
        }
    }
}

module.exports = Messages_Repository;
