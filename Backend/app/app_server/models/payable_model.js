var mongoose = require('mongoose');

var payable_schema = new mongoose.Schema({

    orderID: {
        type: String,
        

    },
    date: {
        type: String,
        required: true,
    },
    items: {
        type: String,
        

    },
    due: {
        type: Number,
       
    },
    storeID:{
        type:String
    }
    

});



var payable = mongoose.model('payables', payable_schema);

module.exports = payable;

