var express = require('express');
var router = express.Router();


var productController  =   require('../controller/product_controller')

router.get   ('/'             ,    productController.view_all_product);

router.get   ('/inventory'             ,    productController.inventory);

router.get   ('/getPros/:id'             ,    productController.getLocation);
router.get   ('/getProsCat'             ,    productController.getProsCat);

router.get   ('/outOfStock'             ,    productController.outOfStock);


router.get   ('/search/:name'             ,    productController.search);

router.get   ('/:id'        ,    productController.view_product    );

router.get   ('/category/:id'        ,    productController.view_productbyCategory    );

router.get   ('/storeProducts/:id'   ,    productController.view_storeProducts  );



router.post  ('/add'          ,    productController.add_product     );

router.put   ('/update/:id'   ,    productController.update_product  );

router.put   ('/updateQty/:id'   ,    productController.updateQty  );

router.delete('/delete/:id'   ,    productController.delete_product  );

router.delete('/deleteStore/:id'   ,    productController.delete_store  );

router.post  ('/login'      ,      productController.login           );



module.exports = router;
