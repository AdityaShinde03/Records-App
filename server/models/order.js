const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderDate: {
        type: Date,
        // required: true,
        default:Date.now
    },
    partyName: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Client model
        ref: 'Client', // Refers to the Client model
        required: true
    },
    typesOfSpring: {
        type: String,
        required: true
    },
    wireDia: {
        type: Number,
        required: true
    },
    outerDia: {
        type: Number,
        required: true
    },
    numberOfTurns: {
        type: Number,
        required: true
    },
    length: {
        type: String, // Assuming length can have non-numeric values like '14 inch'
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    dispatchedDate: {
        type: Date
    },
    transportName: {
        type: String
    },
    remark: {
        type: String
    }
},{timestamps:true});
const Order = mongoose.model("Order",orderSchema);
module.exports = Order;