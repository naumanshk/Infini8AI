
var mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
var consumer_schema = new mongoose.Schema({

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
    default:1
},
verified:{
    type: Boolean,
    default:false
}


});




var consumer = mongoose.model('consumers', consumer_schema);

module.exports = consumer;

