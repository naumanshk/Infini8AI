const express = require('express');
const router = express.Router();



// router.use('/admin',adminCtrl);

router.use('/users', require('./users.js'));
router.use('/customer', require('./customer.js'));
module.exports = router;