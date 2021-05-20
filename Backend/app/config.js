require('dotenv').config();
module.exports = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    apiKey: process.env.TWILIO_API_KEY_SID,
    apiSecret: process.env.TWILIO_API_KEY_SECRET,
    TWILIO_CHAT_SERVICE_SID:'ISbda01be7de804d7b90117bd8ae9d8c09',

  }
};