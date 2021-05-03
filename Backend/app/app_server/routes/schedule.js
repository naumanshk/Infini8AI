var express = require('express');
var router = express.Router();


var scheduleController  =   require('../controller/schedule_controller')

router.get   ('/'             ,    scheduleController.view_all_schedule);


router.get   ('/qty'             ,    scheduleController.viewQty);

router.get   ('/:id'        ,    scheduleController.view_schedule    );

router.post  ('/add'          ,    scheduleController.add_schedule     );

router.put   ('/update/:id'   ,    scheduleController.update_schedule  );

router.delete('/delete/:id'   ,    scheduleController.delete_schedule  );

router.delete('/deleteCartItem/:id'   ,    scheduleController.delete_scheduleItem  );

router.post  ('/login'      ,      scheduleController.login           );



module.exports = router;
