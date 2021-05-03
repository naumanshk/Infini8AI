var mongoose = require('mongoose');

var request_schema = new mongoose.Schema({

  
    type: {
        type: String,
        
    },
    retailer: {
        type: mongoose.Types.ObjectId,
        ref: 'retailers'
    },
    stores: {
        type: mongoose.Types.ObjectId,
        ref: 'stores'
    },
 
});



var request = mongoose.model('requests', request_schema);

module.exports = request;

