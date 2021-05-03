var express = require('express');
var router = express.Router();


var consumerController  =   require('../controller/consumer_controller')
//all working, login not tested yet
router.get   ('/'             ,    consumerController.view_all_consumer);

router.get   ('/:name'        ,    consumerController.view_consumer    );

router.post  ('/add'          ,    consumerController.add_consumer     );

router.put   ('/update/:id'   ,    consumerController.update_consumer  );

router.delete('/delete/:id'   ,    consumerController.delete_consumer  );

router.post  ('/login'      ,      consumerController.login           );



module.exports = router;
