var mongoose = require('mongoose');

var vehicle_schema = new mongoose.Schema({

    id: {
        type: String,
        required: true,
        unique: true
    },
    model: {
        type: String,
        required: true
    },
    manufucturer: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true
    },

});


var vehicle = mongoose.model('vehicles', vehicle_schema);

module.exports = vehicle;

