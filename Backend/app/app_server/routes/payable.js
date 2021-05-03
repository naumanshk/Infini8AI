var express = require('express');
var router = express.Router();


var payableController  =   require('../controller/payable_controller')
//all working , login not tested yet
router.get   ('/'             ,    payableController.view_all_payable);

router.get   ('/:id'        ,    payableController.view_payable    );

router.post  ('/add'          ,    payableController.add_payable     );

router.put   ('/update/:id'   ,    payableController.update_payable  );

router.delete('/delete/:id'   ,    payableController.delete_payable  );

router.post  ('/login'      ,      payableController.login           );



module.exports = router;
