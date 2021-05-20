var mongoose = require('mongoose');

var tasks_schema = new mongoose.Schema({


    members: [],
    groups: [],

    task:
    {type:String
    },

    date:{
        type:Date
    },
    pending:{
        type:Boolean,
        default:true
    },
   inprogress:{
       type:Boolean,
       default:false
   },
   completed:{
    type:Boolean,
    default:false
}



});

var tasks = mongoose.model('tasks', tasks_schema);

module.exports = tasks;

