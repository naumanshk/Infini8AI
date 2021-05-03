var express = require('express');
var router = express.Router();


var categoryController  =   require('../controller/category_controller')
//all working , login not tested yet
router.get   ('/'             ,    categoryController.view_all_category);

router.get   ('/:name'        ,    categoryController.view_category    );

router.post  ('/add'          ,    categoryController.add_category     );

router.put   ('/update/:id'   ,    categoryController.update_category  );

router.delete('/delete/:id'   ,    categoryController.delete_category  );

router.post  ('/login'      ,      categoryController.login           );



module.exports = router;
