var express = require('express');
var router = express.Router();


var requestController  =   require('../controller/request_controller')

router.get   ('/'             ,    requestController.view_all_request);

router.get   ('/:name'        ,    requestController.view_request    );

router.post  ('/add'          ,    requestController.add_request     );

router.put   ('/update/:id'   ,    requestController.update_request  );

router.delete('/delete/:id'   ,    requestController.delete_request  );

router.post  ('/login'      ,      requestController.login           );



module.exports = router;
