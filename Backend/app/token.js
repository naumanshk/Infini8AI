const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;
const { ChatGrant } = AccessToken;


const generateToken = config => {
  return new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret

  );
};

const videoToken = (identity, room, config) => {
  let videoGrant;
  if (typeof room !== 'undefined') {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }
  const token = generateToken(config);
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};



const chatToken = (identity ,room,config) => {
  console.log(config.twilio.TWILIO_CHAT_SERVICE_SID)
  
  let chatGrant;

    chatGrant = new ChatGrant({ serviceSid: config.twilio.TWILIO_CHAT_SERVICE_SID,pushCredentialSid: 'CR08640493eb398ae32e5f9af0c18662e4', });
  

  
  const token = generateToken(config);
  token.addGrant(chatGrant);
  token.identity = identity;
  console.log(chatGrant)
  return token;
};

module.exports = { videoToken,chatToken };