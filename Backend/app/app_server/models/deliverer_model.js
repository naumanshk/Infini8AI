var mongoose = require('mongoose');

var deliverer_schema = new mongoose.Schema({


    liscenceNumber: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        required:false,
    },
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,

    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,

    },
    loggedInStatus: {
        type: Boolean,
        required:false
    },
    verified: {
        type: Boolean,
        required:false  
    },
    imageUrl: {
        type: String,
        required:false  
    },
    latitude: {
        type: String,
        required:false  
    },
    longitude: {
        type: String,
        required:false  
    },
});

var deliverer = mongoose.model('deliverers', deliverer_schema);

module.exports = deliverer;

