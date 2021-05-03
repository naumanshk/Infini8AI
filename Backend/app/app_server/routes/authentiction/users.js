const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const session= require('express-session');
const Users = require('../../models/retailer_model');





//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!req.body.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!req.body.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
//mongoose model 
  const finalUser = new Users(req.body);

  finalUser.setPassword(req.body.password);

  return finalUser.save()
    .then(() => res.json({ message:"successfully signed up",user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)



router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  console.log(req.body.email)

  if(!req.body.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!req.body.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {

    if(err) {
      
      return res.status(500).json({message:"Unable to Login"});
    }

    if(passportUser) {
      
      const user = passportUser;
      user.token = passportUser.generateJWT();
      session.StoreID=user.stores;
     console.log(session.StoreID);

      return res
      .status(200)
      
      .json({ message:"successfully signed in", user });
     
    }

    return status(400).info;
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;