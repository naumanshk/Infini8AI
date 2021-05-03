var mongoose = require('mongoose');

var shoppingCart_schema = new mongoose.Schema({


    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'consumers'
    },

    products: {
        type: mongoose.Types.ObjectId,
        ref: 'products'
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

var shoppingCart = mongoose.model('shoppingCarts', shoppingCart_schema);

module.exports = shoppingCart;

