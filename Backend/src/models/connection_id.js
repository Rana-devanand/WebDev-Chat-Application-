const mongoose = require("mongoose");

const connection_id_schema = new mongoose.Schema({
    from_room_id : {
        type : String,
        required : true,
    },
    to_room_id : {
        type : String,
        required : true,
    },
    connection_id : {
        type : String,
        required : true,
    }
})

const connection_id = mongoose.model("connection_id", connection_id_schema);

module.exports = connection_id;
