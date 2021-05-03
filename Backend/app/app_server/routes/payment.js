var express = require('express');
var router = express.Router();


var paymentController  =   require('../controller/payment_controller')

router.get   ('/'             ,    paymentController.view_all_payment);

// router.post  ('/details'          ,    paymentController.payment_details     );

// router.get   ('/:name'        ,    paymentController.view_payment    ); //peding

router.post  ('/checkout'          ,    paymentController.add_payment     );

router.post  ('/v1/tokens'          ,    paymentController.tokenize     );

router.post  ('/details'      ,      paymentController.nauman ); 


router.put   ('/update/:id'   ,    paymentController.update_payment  );

router.delete('/delete/:id'   ,    paymentController.delete_payment  );

    



module.exports = router;
