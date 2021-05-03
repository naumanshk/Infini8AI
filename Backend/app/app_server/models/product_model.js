var mongoose = require('mongoose');

var product_schema = new mongoose.Schema({


    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
          // required:true
    },
    size: {
        type: String,
        required: true,
    },

    brand: {
        type: String,
       // required: true,
    },
    product_per_carton: {
        type: String,
        required: true,
    },
    number_of_carton: {
        type: Number,
        required: true,
    },
    quantity:{
        type: Number,
        
    },
    Seller_price: {
        type: String,
        required: true,
    },
    Retail_price: {
        type: String,
        required: true,
    },

    details: {
        type: String,
        required: true
    },
    barcode: {
        type: String,
        //required: true
    },
    cart:{
        type: Boolean,
        default: false
    },
    stores: {
        type: mongoose.Types.ObjectId,
        ref: 'stores'
    },
    fileName:{
        type:String
    }



});


var product = mongoose.model('products', product_schema);

module.exports = product;

