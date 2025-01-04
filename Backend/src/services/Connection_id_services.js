const Connection_id_Repository = require("../Repository/Connection_id_Repository");

class Connection_id_Services {
    constructor(){
        this.connection_id_repository = new Connection_id_Repository();
    }

    async createConnectionId(data){
        try {
            const response = await this.connection_id_repository.createConnectionId(data);
            return response;
        } catch (error) {
            console.error(error);
            throw { error };
        }
    }
    async getConnectionIdByFromRoomIdAndToObjectId(from_room_id, to_room_id){
        try {
            const response = await this.connection_id_repository.getConnectionIdByFromRoomIdAndToObjectId(from_room_id, to_room_id);
            return response;
        } catch (error) {
            console.error(error);
            throw { error };
        }
    }
}

module.exports = Connection_id_Services;