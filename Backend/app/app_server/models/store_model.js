var mongoose = require('mongoose');

var store_schema = new mongoose.Schema({

    products: {
        type: [{
            pid: {
                type: mongoose.Types.ObjectId,
                ref: 'products'
            }
        }]
    },

    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    // lat:{
    //     type: Number,
    //     required: true
    // },
    // lng:{
    //     type: Number,
    //     required: true
    // },
    location : {
        // Always store coordinates longitude (East/West), latitude (North/South) order.
        coordinates : {
          type : [Number],
          index : '2dsphere'
        }
      }


});



var store = mongoose.model('stores', store_schema);

module.exports = store;

