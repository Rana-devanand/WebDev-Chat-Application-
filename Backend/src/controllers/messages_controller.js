const Messages_Services = require("../services/messages_services");

const messages_services = new Messages_Services();
const createMessage = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const response = await messages_services.createMessage(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getMessagesByConnectionId = async (req, res) => {
    try {
        console.log("req.params.roomId", req.params.roomId);
        const response = await messages_services.getMessagesByConnectionId(req.params.roomId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}       


module.exports = { 
    createMessage,
    getMessagesByConnectionId
 };