const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    message: { type: String, required: true },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const message = mongoose.model("message", messageSchema);
module.exports = message;

