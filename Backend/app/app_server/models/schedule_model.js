var mongoose = require('mongoose');

var schedule_schema = new mongoose.Schema({


    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'consumers'
    },

 
    schedule:
    {type:String
    },

    date:{
        type:Date
    },
   



});

var schedule = mongoose.model('schedules', schedule_schema);

module.exports = schedule;

