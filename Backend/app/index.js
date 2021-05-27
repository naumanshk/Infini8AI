const express = require('express')
var path = require('path');
var cookie_parser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const config = require('./config');
const { chatToken } = require('./token');
var admin = require('firebase-admin');
const app = express()

const port = 3000
var mongoose = require('mongoose');
var firebase = require('firebase');

require('dotenv').config()
create_db_connection()


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie_parser());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};

const accountSid = 'ACfb0bb4495f874d66050c452069b7d702';
const authToken = '379ec8d1e661629d1e8f592e994db097';
const client = require('twilio')(accountSid, authToken);

client.chat.services('ISbda01be7de804d7b90117bd8ae9d8c09')
  .update({
    'notifications.addedToChannel.enabled': true,
    'notifications.addedToChannel.sound': 'default',
    'notifications.addedToChannel.template': 'A New message in ${CHANNEL} from ${USER}: ${MESSAGE}'
  })
  .then(service => console.log(service));




var consumer_router = require('./routes/consumer');
var Groups_router = require('./routes/groups_router');
var tasks_router = require('./routes/tasks_router');
var meetings_router = require('./routes/meetings_router');






app.use('/employee', consumer_router);
app.use('/Groups', Groups_router);
app.use('/tasks', tasks_router);
app.use('/meetings', meetings_router);





app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/video/token', (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  console.log(process.env.TWILIO_ACCOUNT_SID)
  sendTokenResponse(token, res);

});
app.post('/video/token', (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

app.get('/token/:id', (req, res) => {
  console.log("request" + req)
  const id = req.params.id;
  console.log("query" + id)
  const room = req.query.room;
  console.log(config)
  const token = chatToken(id, 'naseem', config);
  sendTokenResponse(token, res);

})


function create_db_connection(uri) {
  console.log(process.env.MONGODB_URI,)
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: "true" });

  mongoose.connection.on("error", (err) => {

    console.log("err", err);

  });

  mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected");
  });

}

app.listen(process.env.PORT || 3002, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})