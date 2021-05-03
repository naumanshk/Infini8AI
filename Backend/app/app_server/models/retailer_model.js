var mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var retailer_schema = new mongoose.Schema({
   
    // cnic: {
    //     type: String,
    //     required: true,
    //     unique: true

    // },
    stores: {
        type: mongoose.Types.ObjectId,
        ref: 'stores'
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    // password: {
    //     type: String,
    //     required: true,
    // },
    // city: {
    //     type: String,
    //     required: true,

    // },
    // address: {
    //     type: String,
    //     required: true,
    // },
    number: {
        type: String,
        required: true,

    },
    loggedInStatus: {
        type: Boolean,
        // required: true,
    },
    verified: {
        type: Boolean,
        default: false,

    },
    stripe_id:{
      type:String
    },
    hash: String,
    salt: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

retailer_schema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  };
  
  retailer_schema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
  };
  
  retailer_schema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
  }
  
  retailer_schema.methods.toAuthJSON = function() {
    return {
      _id: this._id,
      email: this.email,
      token: this.generateJWT(),
      store:this.stores,
    };
  };

var retailer = mongoose.model('retailers', retailer_schema);

module.exports = retailer;
