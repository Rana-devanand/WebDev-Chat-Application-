const Messages_Repository = require("../Repository/messages");

class Messages_Services {
    constructor(){
        this.messages_repository = new Messages_Repository();
    }

    async createMessage(data){
        try {
            const response = await this.messages_repository.createMessage(data);
            return response;
        } catch (error) {
            console.error(error);
            throw { error };
        }
    }

    async getMessagesByConnectionId(data){
        try {
            const response = await this.messages_repository.getMessagesByConnectionId(data);
            return response;
        } catch (error) {
            console.error(error);
            throw { error };
        }
    }
}

module.exports = Messages_Services;