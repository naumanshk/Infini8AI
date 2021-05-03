var mongoose           =require('mongoose');


var order_schema = new mongoose.Schema({

    

    products: {
        type: Array,
        
    },
    stores: {
        type: mongoose.Types.ObjectId,
        ref: 'stores'
    },

    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'consumers'
    },

    orderID:{
        type:String
    },
    userName:{
        type:String
    },
    payment:{
        type:Boolean
    },
    bill:{
        type:Number
    },
    shipping:{
        type:String
    },
    date:{
        type:String
    },
    delivery:{
        type:Boolean,
        default:false
    },
    quantity:{
        type:Number
    },
    checkout:{
        type:Boolean,
        default:false
    },
    // consumer: {
    //     // type: consumerSchema,
    //     type: String,

    //     required: true
    // },

    // retailer: {
    //     // type: retailerSchema,
    //     type: String,
    //     required: true
    // },
    // deliverer: {
    //    // type: delivererSchema,
    //     type: String,
    //     required: true
    // },
    // cart: {
    //    // type: shoppingCartSchema,
    //     type: String,
    //     required: true
    // },
    // status: {
    //     type: Boolean,
    //     required: true
    // },
    // orderPlaced: {
    //     type: Date,
    //     required: true
    // },
    // orderDelivererd: {
    //     type: Date,
    //     required: true
    // }


});





var order = mongoose.model('orders', order_schema);

module.exports = order;

