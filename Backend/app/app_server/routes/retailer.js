var express = require('express');
var router = express.Router();


var retailerController  =   require('../controller/retailer_controller')

router.get   ('/'             ,    retailerController.view_all_retailer);

router.get   ('/product/image'             ,    retailerController.getImage);

router.post  ('/v1/accounts'      ,      retailerController.makeStripeUser           );

router.get   ('/request'             ,    retailerController.notVerified);

router.put   ('/verified/:id'             ,    retailerController.verified);

router.get   ('/:name'        ,    retailerController.view_retailer    );

router.post  ('/add'          ,    retailerController.add_retailer     );

router.put   ('/update/:id'   ,    retailerController.update_retailer  );

router.delete('/delete/:id'   ,    retailerController.delete_retailer  );

router.delete('/stripe/delete'   ,    retailerController.delete_stripe  );

router.post  ('/login'      ,      retailerController.login           );



module.exports = router;
