var mongoose = require('mongoose');

var category_schema = new mongoose.Schema({

   
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
      

    },
    // image: {
    //     type: String,
    //     required: true,
    // }
    

});



var category = mongoose.model('categorys', category_schema);

module.exports = category;

