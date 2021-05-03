var mongoose = require('mongoose');

var quickBuy_schema = new mongoose.Schema({


    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'consumers'
    },

    products: {
        type: mongoose.Types.ObjectId,
        ref: 'products'
    },
    schedule:
    {type:String
    },
    quantity: {
    type: Number,
    // required: true,
},
    addedToCart:{
        type:Boolean,
        default:false
    }

});

var quickBuy = mongoose.model('quickBuys', quickBuy_schema);

module.exports = quickBuy;

