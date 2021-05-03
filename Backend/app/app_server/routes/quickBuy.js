var express = require('express');
var router = express.Router();


var quickBuyController  =   require('../controller/quickBuy_controller')

router.get   ('/'             ,    quickBuyController.view_all_quickBuy);


router.get   ('/qty'             ,    quickBuyController.viewQty);

router.get   ('/list'        ,    quickBuyController.view_quickBuy    );

router.post  ('/add'          ,    quickBuyController.add_quickBuy     );

router.put   ('/update/:id'   ,    quickBuyController.update_quickBuy  );

router.delete('/delete/:id'   ,    quickBuyController.delete_quickBuy  );

router.delete('/deleteCartItem/:id'   ,    quickBuyController.delete_quickBuyItem  );

router.post  ('/login'      ,      quickBuyController.login           );



module.exports = router;
