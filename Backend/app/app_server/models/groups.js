var mongoose = require('mongoose');

var Groups_schema = new mongoose.Schema({


    members: [],

    name:
    {type:String
    },

    date:{
        type:Date
    },
   



});

var Groups = mongoose.model('Groupss', Groups_schema);

module.exports = Groups;

