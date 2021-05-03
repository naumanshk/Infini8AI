var mongoose = require('mongoose');

var payment_schema = new mongoose.Schema({

    orderID: {
        type: String,
       
    },
    date: {
        type: String,
        
    },
     amount: {
        type: Number,
       
    }
 
});




var payment = mongoose.model('payments', payment_schema);

module.exports = payment;

