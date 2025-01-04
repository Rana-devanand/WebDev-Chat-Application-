const Connection_id_Services = require("../services/Connection_id_services");

const connection_id_services = new Connection_id_Services();

const createConnectionId = async (req, res) => {
    try {
        // console.log("req.body",req.body);
        const response = await connection_id_services.createConnectionId(req.body);
        res.status(200).json({
            success : true,
            message : "Connection id created successfully",
            data : response
        });
    } catch (error) {
            res.status(500).json({
            success : false,
            message : "Error in creating connection id",
            error : error.message
        });
    }
}

const getAllConnectionId = async (req, res) => {
    try {
        // console.log("req.params",req.params);
        const response = await connection_id_services.getConnectionIdByFromRoomIdAndToObjectId(req.params.from_room_id, req.params.connect_user_room_id);
        res.status(200).json({
            success : true,
            message : "Connection id fetched successfully",
            data : response
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error in fetching connection id",
            error : error.message
        });
    }
}

module.exports = { 
    createConnectionId,
    getAllConnectionId,
 };

