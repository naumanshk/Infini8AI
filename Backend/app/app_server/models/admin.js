var mongoose = require('mongoose');

var admin_schema = new mongoose.Schema({

   
    email: {
        type: String,
    },
    // forigenKey: this.state.schoolId,
    gendar: {
        type: String,
    },
    
  
    status: {
        type: Boolean,
        default:false
    },
    profileImg: {
        type: String,
    },
    userName:{
        type: String,
    },
    userType: {
        type: Number,
        default:0
    },
    verified:{
        type: Boolean,
        default:false
    }
  
    

});



var admin = mongoose.model('admin', admin_schema);

module.exports = admin;
