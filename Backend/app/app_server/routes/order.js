var express = require('express');
var router = express.Router();


var orderController  =   require('../controller/order_controller')

router.get   ('/'             ,    orderController.view_all_order);


router.get   ('/today'             ,    orderController.todaySale);

router.get   ('/deliver'             ,    orderController.deliverOrder);



// router.get   ('/:name'        ,    orderController.view_order    );

router.post  ('/add'          ,    orderController.add_order     );

router.put   ('/update/:id'   ,    orderController.update_order  );

router.delete('/delete/:id'   ,    orderController.delete_order  );

router.get  ('/one'      ,      orderController.order           );
router.get  ('/getStores'      ,      orderController.orderRetailer           );
router.get  ('/getProducts'      ,      orderController.orderProducts           );

router.post  ('/v1/transfers'      ,      orderController.stripe           );

router.post  ('/v1/accounts'      ,      orderController.makeStripeUser           );

module.exports = router;
