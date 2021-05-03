var express = require('express');
var router = express.Router();


var storeController  =   require('../controller/store_controller');
const store_controller = require('../controller/store_controller');

router.get   ('/'             ,    storeController.view_all_store);

router.get   ('/location'        ,    storeController.getLocation    );

// router.get   ('/:name'        ,    storeController.view_store    );

router.get('/category', store_controller.getCategory);

router.post  ('/add'          ,    storeController.add_store     );

router.put   ('/update/:id'   ,    storeController.update_store  );

router.delete('/delete/:id'   ,    storeController.delete_store  );

router.post  ('/login'      ,      storeController.login           );



module.exports = router;
