const connection_id = require("../models/connection_id");

class Connection_id_Repository {

    async createConnectionId(data){
        try {
            const response = await connection_id.create(data);
            return response;
        } catch (error) {
            console.error(error);
            throw { error };
        }
    }
    // get connection id by from_room_id and to_object_id
    async getConnectionIdByFromRoomIdAndToObjectId(from_room_id, to_room_id){
        try {
            const response = await connection_id.findOne({ from_room_id, to_room_id });
            return response;
        } catch (error) {
            console.error(error);
            throw { error };
        }
    }
}

module.exports = Connection_id_Repository;