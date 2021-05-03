var express = require('express');
var router = express.Router();

var adminController  =   require('../controller/admin')
//all working , login not tested yet


router.post  ('/add'          ,    adminController.add_admin    );

router.post  ('/login'      ,      adminController.login           );



module.exports = router;