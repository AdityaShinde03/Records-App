const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    clientName:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:String,
    },
    orders:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"order"
    },
    // createdByUser:
},{timestamps:true});

const Client = mongoose.model("Client",clientSchema);

module.exports = Client;